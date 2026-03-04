'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, User, CreditCard, LogOut, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'

interface SettingsClientProps {
    user: {
        firstName: string | null
        lastName: string | null
        email: string
        plan: string
    }
}

export default function SettingsClient({ user }: SettingsClientProps) {
    return (
        <div className="min-h-screen bg-[#111111] text-white selection:bg-[#3DFFC3]/30">
            {/* ── BACKGROUND ACCENTS ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3DFFC3]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

                {/* ── HEADER ── */}
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back to dashboard</span>
                        </Link>
                        <h1 className="text-4xl font-black font-medium tracking-tight">Account Settings</h1>
                        <p className="text-zinc-500">Manage your profile and subscription preferences.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">

                    {/* ── PROFILE SECTION ── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 rounded-[2rem] bg-[#1a1a1a] border border-white/[0.05] relative overflow-hidden group"
                    >
                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[#3DFFC3]">
                                    <User className="w-8 h-8" />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            Profile Information
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</span>
                                                <p className="text-lg font-medium text-white">{user.firstName} {user.lastName}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</span>
                                                <p className="text-lg font-medium text-white flex items-center gap-2">
                                                    {user.email}
                                                    <ShieldCheck className="w-4 h-4 text-[#3DFFC3]" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ── SUBSCRIPTION SECTION ── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2rem] bg-[#1a1a1a] border border-white/[0.05] relative overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#3DFFC3]/5 flex items-center justify-center border border-[#3DFFC3]/10 text-[#3DFFC3]">
                                    <CreditCard className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold">Subscription Plan</h2>
                                    <div className="flex items-center gap-2">
                                        <p className="text-zinc-500">You are currently on the</p>
                                        <span className={`px-3 py-0.5 rounded-full text-[12px] font-bold uppercase tracking-wider ${user.plan === 'pro'
                                            ? 'bg-[#3DFFC3] text-black'
                                            : 'bg-white/10 text-white'
                                            }`}>
                                            {user.plan} Plan
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {user.plan === 'free' ? (
                                <Link
                                    href="/pricing"
                                    className="px-6 py-3 rounded-xl bg-[#3DFFC3] text-black font-bold hover:shadow-[0_0_20px_rgba(61,255,195,0.3)] transition-all text-center"
                                >
                                    Upgrade to Pro
                                </Link>
                            ) : (
                                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                                    Manage Billing
                                </button>
                            )}
                        </div>
                    </motion.section>

                    {/* ── ACTIONS SECTION ── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-[2rem] bg-red-500/[0.03] border border-red-500/10"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-red-400">Sign Out</h2>
                                <p className="text-zinc-500">Securely sign out of your UXPilot account.</p>
                            </div>

                            <SignOutButton>
                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all border border-red-500/20">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>
                    </motion.section>

                </div>
            </div>
        </div>
    )
}
