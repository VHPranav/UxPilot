'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
    className?: string
    children: React.ReactNode
    planId?: string
}

export default function CheckoutButton({ className, children, planId }: CheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/checkout', { 
                method: 'POST',
                body: JSON.stringify({ planId })
            })
            const data = await res.json()
            
            if (data.error) throw new Error(data.error)
            
            if (!(window as any).Razorpay) {
                throw new Error('Razorpay SDK not loaded. Please try again.')
            }

            const razorpay = new (window as any).Razorpay({
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: 'UXPilot Pro',
                description: 'Upgrade to Pro Plan',
                handler: () => {
                    toast.success('Upgrade Successful! Welcome to Pro.')
                    window.location.reload()
                },
                theme: { color: '#3DFFC3' },
                modal: {
                    ondismiss: () => {
                        setIsLoading(false)
                    }
                }
            })
            razorpay.open()
        } catch (err: any) {
            toast.error(err.message || 'Payment failed')
            setIsLoading(false)
        }
    }

    return (
        <>
            <script src="https://checkout.razorpay.com/v1/checkout.js" async />
            <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className={className}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        </>
    )
}
