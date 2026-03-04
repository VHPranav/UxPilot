'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import AuditForm from './AuditForm'
import AuditResults from './AuditResults'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { EmptyState } from './ui/EmptyState'
import { AuditSkeleton } from './ui/Skeleton'

interface DashboardClientProps {
    initialAudits: any[]
    recentAudits: any[]
    totalAuditCount: number
    userId: string | null
    userFirstName?: string | null
    userEmail?: string | null
    initialPlan: string
}

export default function DashboardClient({
    initialAudits,
    recentAudits,
    userId,
    userFirstName,
    userEmail,
    initialPlan,
    totalAuditCount,
}: DashboardClientProps) {
    const [latestAudit, setLatestAudit] = useState<any | null>(null)
    const [auditHistory, setAuditHistory] = useState(initialAudits)
    const [isUpgrading, setIsUpgrading] = useState(false)
    const [isAuditRunning, setIsAuditRunning] = useState(false)
    const [userPlan] = useState(initialPlan)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleAuditComplete = (audit: any) => {
        setLatestAudit(audit)
        if (userId) {
            setAuditHistory([audit, ...auditHistory])
        }
    }

    const handleUpgrade = async () => {
        setIsUpgrading(true)
        try {
            const res = await fetch('/api/checkout', { method: 'POST' })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            const razorpay = new (window as any).Razorpay({
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: 'UXPilot Pro',
                handler: () => {
                    toast.success('Upgrade Successful! Welcome to Pro.')
                    window.location.reload()
                },
                theme: { color: '#3DFFC3' }
            })
            razorpay.open()
        } catch (err: any) {
            toast.error(err.message || 'Payment failed')
        } finally {
            setIsUpgrading(false)
        }
    }

    const SidebarContent = () => (
        <>
            {/* Brand */}
            <div className="px-4 py-4 flex items-center gap-2.5 border-b border-white/[0.07]">
                <span className="text-[18px] font-medium text-white tracking-tight">UXPilot</span>
                {/* Close button on mobile */}
                <button
                    className="ml-auto md:hidden text-zinc-500 hover:text-white"
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Nav */}
            <nav className="px-2 pt-2 pb-1">
                <NavLink icon={<HomeIcon />} label="Home" href="/dashboard" active onClick={() => setSidebarOpen(false)} />
                <div className="flex items-center justify-between px-2 py-2 rounded-lg text-zinc-400 hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2.5 text-[18px]">
                        <AuditIcon />
                        <span>Audits</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </nav>

            {/* Recent audits list */}
            <div className="px-2 flex-1 overflow-y-auto">
                <div className="space-y-0.5 mt-0.5">
                    {recentAudits.map((a: any) => (
                        <div
                            key={a.id}
                            className="px-2 py-1.5 rounded-md text-[16px] text-zinc-500 hover:text-zinc-300 hover:bg-white/5 cursor-pointer truncate transition-colors"
                            title={a.url}
                            onClick={() => { setLatestAudit(a); setSidebarOpen(false) }}
                        >
                            {a.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </div>
                    ))}
                    {totalAuditCount > 5 && (
                        <div className="px-2 py-1.5 text-[12px] text-[#3DFFC3]/70 hover:text-[#3DFFC3] cursor-pointer">
                            View all history →
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/[0.07] px-2 py-2 space-y-0.5">
                <NavLink icon={<KeyIcon />} label="Upgrade to Pro" href="/pricing" onClick={() => setSidebarOpen(false)} />
                <NavLink icon={<SettingsIcon />} label="Settings" href="/settings" onClick={() => setSidebarOpen(false)} />
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-[14px] text-zinc-500 truncate">{userEmail}</span>
                </div>
            </div>
        </>
    )

    return (
        <div className="flex min-h-screen bg-[#111111] text-white">
            <script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden md:flex w-64 shrink-0 flex-col fixed inset-y-0 left-0 bg-[#121212] border-r border-white/[0.07] z-40">
                <SidebarContent />
            </aside>

            {/* ── MOBILE SIDEBAR OVERLAY ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <aside
                        className="absolute inset-y-0 left-0 w-72 flex flex-col bg-[#121212] border-r border-white/[0.07]"
                        onClick={e => e.stopPropagation()}
                    >
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 md:ml-64 min-h-screen bg-[#191919] flex flex-col">

                {/* Mobile top bar */}
                <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#111111]">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-zinc-400 hover:text-white transition-colors p-1"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#3DFFC3] to-indigo-500 flex items-center justify-center">
                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none">
                                <path d="M2 10L5 4L8 8L10 5.5L12 10H2Z" fill="white" />
                            </svg>
                        </div>
                        <span className="text-[14px] font-bold text-white">UXPilot</span>
                    </div>
                </div>

                {/* ── HEADER ── */}
                <header className="px-4 md:px-10 pt-6 md:pt-10 pb-5 md:pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-white/[0.06]">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-medium text-white tracking-[-0.06em]">
                            Welcome back, {userFirstName}
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">Ready to optimize your user experience?</p>
                    </div>
                    <div className="flex items-center gap-2 text-[16px] text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3DFFC3] animate-pulse shrink-0" />
                        <span className="font-semibold text-white text-[16px]">Live</span>
                        <span className="text-zinc-500 hidden sm:inline">AI-powered UX scoring</span>
                    </div>
                </header>

                {/* ── AUDIT BAR ── */}
                <div className="px-4 md:px-10 py-5 md:py-6 border-b border-white/[0.06] bg-[#1a1a1a]">
                    <AuditForm
                        onAuditComplete={handleAuditComplete}
                        onLoadingChange={setIsAuditRunning}
                    />
                </div>

                {/* ── CONTENT AREA ── */}
                <div className="px-4 md:px-10 py-6 md:py-10 flex-1 flex flex-col gap-10">

                    <AnimatePresence mode="wait">
                        {isAuditRunning ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                <p className="text-[16px] font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    Analyzing Layout & Conversion...
                                </p>
                                <AuditSkeleton />
                            </motion.div>
                        ) : latestAudit ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <p className="text-[16px] font-semibold text-zinc-400 mb-4">Latest Result</p>
                                <AuditResults audit={latestAudit} />
                            </motion.div>
                        ) : auditHistory.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <EmptyState />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-[16px] font-semibold text-zinc-400 uppercase tracking-widest text-xs">Jump back in</p>
                                    <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{auditHistory.length} Total Audits</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {auditHistory.slice(0, 9).map((audit: any, index: number) => (
                                        <motion.div
                                            key={audit.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => {
                                                setLatestAudit(audit)
                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                            }}
                                            className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-[#111111] border border-white/[0.04] hover:border-[#3DFFC3]/20 hover:bg-[#1a1a1a] cursor-pointer transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#3DFFC3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#3DFFC3]/10 transition-colors">
                                                <svg className="w-5 h-5 text-zinc-500 group-hover:text-[#3DFFC3] transition-colors" fill="none" viewBox="0 0 16 16">
                                                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
                                                    <path d="M5 8h6M5 5.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[17px] font-bold text-white truncate group-hover:text-[#3DFFC3] transition-colors">
                                                    {audit.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                                </p>
                                                <p className="text-[13px] text-zinc-500 font-medium">
                                                    {new Date(audit.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className={`text-2xl font-black shrink-0 ${audit.score > 70 ? 'text-[#3DFFC3]' : audit.score > 40 ? 'text-orange-400' : 'text-red-400'}`}>
                                                {audit.score}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

function NavLink({ icon, label, href, active, onClick }: { icon: React.ReactNode; label: string; href: string; active?: boolean; onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-[18px] transition-colors ${active
                ? 'bg-white/10 text-white font-medium'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
        >
            {icon}
            {label}
        </Link>
    )
}

function HomeIcon() { return <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16"><path d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> }
function AuditIcon() { return <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> }
function KeyIcon() { return <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16"><circle cx="6" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8.8 6.8L13 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M11.5 4l1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> }
function SettingsIcon() { return <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> }
