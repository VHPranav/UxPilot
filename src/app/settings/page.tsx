import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import SettingsClient from '@/components/SettingsClient'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        redirect('/')
    }

    let dbUser: any = null
    try {
        dbUser = await (prisma as any).user.findUnique({
            where: { id: userId }
        })
    } catch (e) {
        console.error('Settings DB error:', e)
    }

    const plan = dbUser?.plan || 'free'
    const email = user.emailAddresses[0]?.emailAddress || ''

    const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: email,
        plan: plan
    }

    return <SettingsClient user={userData} />
}
