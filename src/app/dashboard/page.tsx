import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { UserButton } from '@clerk/nextjs'
import DashboardClient from '@/components/DashboardClient'
import Link from 'next/link'

export default async function DashboardPage() {
    const { userId } = await auth()
    const user = await currentUser()

    let audits: any[] = []
    let dbUser: any = null
    if (userId) {
        try {
            dbUser = await (prisma as any).user.findUnique({ where: { id: userId } })
            audits = await prisma.audit.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' }
            })
        } catch (e) {
            console.error('Dashboard DB error:', e)
        }
    }

    const plan = dbUser?.plan || 'free'
    const email = user?.emailAddresses[0]?.emailAddress || ''
    const firstName = user?.firstName || email.split('@')[0]
    const recentAudits = audits.slice(0, 5)

    return (
        <DashboardClient
            initialAudits={audits}
            userId={userId}
            userFirstName={firstName}
            userEmail={email}
            initialPlan={plan}
            recentAudits={recentAudits}
            totalAuditCount={audits.length}
        />
    )
}
