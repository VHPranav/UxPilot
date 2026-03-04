'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import CheckoutButton from '../CheckoutButton'
import Link from 'next/link'

interface PricingCardProps {
    name: string
    price: string
    description: string
    features: string[]
    buttonText: string
    isPro?: boolean
    isCustom?: boolean
    index: number
}

export default function PricingCard({
    name,
    price,
    description,
    features,
    buttonText,
    isPro,
    isCustom,
    index
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 group
                ${isPro
                    ? 'bg-[#1a1a1a] border-[#3DFFC3]/30 shadow-[0_0_40px_-15px_rgba(61,255,195,0.2)]'
                    : 'bg-[#141414] border-white/[0.05] hover:border-white/10'
                }`}
        >
            {isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#3DFFC3] rounded-full text-[12px] font-bold text-black uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${isPro ? 'text-[#3DFFC3]' : 'text-white'}`}>
                    {name}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{price}</span>
                {!isCustom && price !== '₹0' && (
                    <span className="text-zinc-500 text-sm font-medium">/month</span>
                )}
            </div>

            <div className="space-y-4 mb-10 flex-1">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 
                            ${isPro ? 'bg-[#3DFFC3]/10 text-[#3DFFC3]' : 'bg-white/5 text-zinc-500'}`}
                        >
                            <Check className="w-3 h-3" strokeWidth={3} />
                        </div>
                        <span className="text-zinc-400 text-[15px] leading-tight">{feature}</span>
                    </div>
                ))}
            </div>

            {isCustom ? (
                <Link
                    href="mailto:support@uxpilot.ai"
                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-colors"
                >
                    {buttonText}
                </Link>
            ) : isPro ? (
                <CheckoutButton className="w-full py-4 px-6 rounded-2xl bg-[#3DFFC3] text-black font-bold hover:shadow-[0_0_20px_rgba(61,255,195,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                    {buttonText}
                </CheckoutButton>
            ) : (
                <Link
                    href="/dashboard"
                    className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-colors"
                >
                    {buttonText}
                </Link>
            )}
        </motion.div>
    )
}
