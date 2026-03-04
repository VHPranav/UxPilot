'use client'

import { motion } from 'framer-motion'
import PricingCard from '@/components/ui/PricingCard'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: "Starter",
        price: "₹0",
        description: "Perfect for exploring UXPilot's core features.",
        features: [
            "3 UX Audits per month",
            "Basic UX Score",
            "Core accessibility check",
            "Standard analysis speed",
            "PDF Export"
        ],
        buttonText: "Start Free",
    },
    {
        name: "Pro",
        price: "₹499",
        description: "For professionals who need comprehensive audits and tracking.",
        features: [
            "50 UX Audits per month",
            "Detailed Score Breakdown",
            "Optimization Checklist",
            "Audit History & Trends",
            "Priority AI processing",
            "Advanced insights"
        ],
        buttonText: "Upgrade to Pro",
        isPro: true
    },
    {
        name: "Custom",
        price: "Custom",
        description: "Enterprise-grade features for high-volume teams.",
        features: [
            "Unlimited Audits",
            "Team Collaboration",
            "White-label reports",
            "API Authentication",
            "Dedicated Support",
            "Custom integrations"
        ],
        buttonText: "Contact Sales",
        isCustom: true
    }
]

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden selection:bg-[#3DFFC3]/30">
            {/* ── BACKGROUND ACCENTS ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3DFFC3]/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-24">

                {/* ── BACK BUTTON ── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to dashboard</span>
                    </Link>
                </motion.div>

                {/* ── HEADER ── */}
                <div className="text-center mb-20">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black font-medium mb-6 tracking-tight"
                    >
                        Scale your <span className="text-[#3DFFC3]">Product UI</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Choose the perfect plan to optimize your user experience with AI-powered insights and actionable feedback.
                    </motion.p>
                </div>

                {/* ── PRICING GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <PricingCard key={i} {...plan} index={i} />
                    ))}
                </div>

                {/* ── FAQ TEASER ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-16 border-t border-white/5 text-center"
                >
                    <p className="text-zinc-500 text-sm mb-4">Have questions about our plans?</p>
                    <Link
                        href="mailto:support@uxpilot.ai"
                        className="text-white hover:text-[#3DFFC3] font-bold border-b border-white/20 hover:border-[#3DFFC3] transition-all"
                    >
                        Review our FAQ or Contact Support →
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
