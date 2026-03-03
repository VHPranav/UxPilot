import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0]
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"
import * as cheerio from 'cheerio'
import { z } from 'zod'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

const auditSchema = z.object({
    score: z.number().min(0).max(100),
    summary: z.string(),
    issues: z.array(z.object({
        category: z.enum(["CTA", "Typography", "Layout", "Trust", "Accessibility"]),
        problem: z.string(),
        suggestion: z.string(),
        severity: z.enum(["low", "medium", "high"])
    }))
})

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        const clerkUser = await currentUser()

        if (!userId || !clerkUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 1. Sync User & Check Usage
        const email = clerkUser.emailAddresses[0]?.emailAddress
        const now = new Date()
        const month = now.getMonth() + 1 // 1-12
        const year = now.getFullYear()

        // 2. Parse input
        let url: string | null = null
        const contentType = req.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            const body = await req.json()
            url = body.url
        } else {
            const formData = await req.formData()
            url = formData.get('url') as string
        }

        if (!url || !url.startsWith('http')) {
            return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 })
        }

        // 3. Usage & Plan Logic (Transaction)
        const isAdmin = process.env.ADMIN_EMAIL === email

        const user = await prisma.user.upsert({
            where: { id: userId },
            update: { email },
            create: { id: userId, email, plan: 'free' }
        })

        if (user.plan === 'free' && !isAdmin) {
            const usage = await prisma.usageTracking.findUnique({
                where: {
                    userId_month_year: { userId, month, year }
                }
            })

            if (usage && usage.auditCount >= 1) {
                return NextResponse.json({
                    error: 'Monthly audit limit reached for Free plan (1 audit/month). Upgrade to Pro for unlimited audits.'
                }, { status: 403 })
            }
        }

        // 4. Fetch Website Content
        const response = await fetch(url)
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch website content' }, { status: 500 })
        }
        const html = await response.text()
        const $ = cheerio.load(html)
        $('script, style, noscript, iframe, svg').remove()
        const textContent = $('body').text().slice(0, 4000).replace(/\s+/g, ' ').trim()

        // 5. Gemini AI Integration (Expensive part outside transaction)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        })

        const prompt = `You are a senior UX auditor. Analyze the following website text and provide a structured audit in the following JSON format:
        {
          "score": number (0-100),
          "summary": "overall summary",
          "issues": [{"category": "CTA" | "Typography" | "Layout" | "Trust" | "Accessibility", "problem": "...", "suggestion": "...", "severity": "low" | "medium" | "high"}]
        }
        Website URL: ${url}\nContent:\n${textContent}`

        const result = await model.generateContent(prompt)
        const validatedReport = auditSchema.parse(JSON.parse(result.response.text()))

        // 6. Save Audit & Increment Usage (Atomic Transaction)
        const finalAudit = await prisma.$transaction(async (tx: TransactionClient) => {
            // Re-check quota inside transaction to prevent last-millisecond race conditions
            if (user.plan === 'free' && !isAdmin) {
                const usageCheck = await tx.usageTracking.findUnique({
                    where: { userId_month_year: { userId, month, year } }
                })
                if (usageCheck && usageCheck.auditCount >= 1) {
                    throw new Error('QUOTA_EXCEEDED')
                }
            }

            // Create Audit
            const audit = await tx.audit.create({
                data: {
                    userId,
                    url: url!,
                    score: validatedReport.score,
                    report: validatedReport as any,
                }
            })

            // Increment Usage
            await tx.usageTracking.upsert({
                where: { userId_month_year: { userId, month, year } },
                update: { auditCount: { increment: 1 } },
                create: { userId, month, year, auditCount: 1 }
            })

            return audit
        })

        return NextResponse.json(finalAudit)

    } catch (error: any) {
        if (error.message === 'QUOTA_EXCEEDED') {
            return NextResponse.json({ error: 'Monthly audit limit reached. Upgrade to Pro.' }, { status: 403 })
        }
        console.error('Audit Error:', error)
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
    }
}

