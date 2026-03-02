import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import prisma from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check Razorpay key availability before creating the instance
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: 'Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file.' },
                { status: 503 }
            )
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 1. Ensure user exists in our DB
        const dbUser = await prisma.user.upsert({
            where: { id: userId },
            update: { email: user.emailAddresses[0].emailAddress },
            create: {
                id: userId,
                email: user.emailAddresses[0].emailAddress,
                plan: 'free'
            }
        })

        if (dbUser.plan === 'pro') {
            return NextResponse.json({ error: 'Already on Pro plan' }, { status: 400 })
        }

        // 2. Create Razorpay Subscription
        // Note: You should create a plan in your Razorpay dashboard first
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID || 'plan_PQh8C2mYx2M9S7', // Default placeholder
            customer_notify: 1,
            total_count: 12, // 1 year of monthly billing
            addons: [],
            notes: {
                userId: userId
            }
        })

        // 3. Save subscriptionId to user (Optional, usually wait for webhook)
        // But helpful for the frontend to know which subscription to pay for
        return NextResponse.json({
            subscriptionId: subscription.id,
            keyId: process.env.RAZORPAY_KEY_ID
        })

    } catch (error: any) {
        console.error('Checkout Error:', error)
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
    }
}
