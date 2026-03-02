import { NextResponse } from 'next/server'
import crypto from 'crypto'
import prisma from '@/lib/db'

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = req.headers.get('x-razorpay-signature')

        if (!signature) {
            return NextResponse.json({ error: 'No signature' }, { status: 400 })
        }

        // 1. Verify Webhook Signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest('hex')

        if (expectedSignature !== signature) {
            console.error('Invalid Razorpay signature')
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
        }

        const event = JSON.parse(body)
        const { payload } = event
        const subscription = payload.subscription.entity
        const userId = subscription.notes.userId

        // 2. Handle Events
        switch (event.event) {
            case 'subscription.activated':
            case 'subscription.charged':
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        plan: 'pro',
                        subscriptionId: subscription.id,
                        subscriptionStatus: 'active'
                    }
                })
                break

            case 'subscription.cancelled':
            case 'subscription.halted':
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        plan: 'free',
                        subscriptionStatus: 'cancelled'
                    }
                })
                break
        }

        return NextResponse.json({ received: true })

    } catch (error: any) {
        console.error('Webhook Error:', error)
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
    }
}
