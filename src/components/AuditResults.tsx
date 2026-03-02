'use client'

import { AlertCircle, CheckCircle2, Info, Layout, MousePointer2, ShieldCheck, Type, Accessibility } from 'lucide-react'

interface Issue {
    category: "CTA" | "Typography" | "Layout" | "Trust" | "Accessibility"
    problem: string
    suggestion: string
    severity: "low" | "medium" | "high"
}

interface AuditReport {
    score: number
    summary: string
    issues: Issue[]
}

interface AuditResultsProps {
    audit: {
        url: string
        score: number
        report: AuditReport
    } | null
}

const categoryIcons = {
    CTA: MousePointer2,
    Typography: Type,
    Layout: Layout,
    Trust: ShieldCheck,
    Accessibility: Accessibility
}

const severityColors = {
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    medium: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    high: "bg-red-500/10 text-red-400 border-red-500/20"
}

export default function AuditResults({ audit }: AuditResultsProps) {
    if (!audit) return null

    const report = audit.report

    return (
        <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header / Score Section */}
            <div className="bg-[#1F1F1F] backdrop-blur-md rounded-[2.5rem] border border-white/5 p-10 md:p-14 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="relative flex items-center justify-center w-48 h-48 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(61,255,195,0.2)]">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={552.9}
                                strokeDashoffset={552.9 - (552.9 * audit.score) / 100}
                                className={`${audit.score > 70 ? 'text-[#3DFFC3]' : audit.score > 40 ? 'text-orange-400' : 'text-red-400'} transition-all duration-1000 ease-out`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white">{audit.score}</span>
                            <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">Score</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                            Detailed Analysis Complete
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black font-medium text-white tracking-[-0.02em] leading-tight">
                            UX Audit for <span className="text-[#3DFFC3] underline decoration-4 underline-offset-8 decoration-[#3DFFC3]/20">{audit.url.replace('https://', '')}</span>
                        </h2>
                        <p className="mt-6 text-zinc-400 text-lg leading-relaxed font-medium">
                            "{report.summary}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Findings Section */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3DFFC3]/10 text-[#3DFFC3]">
                            <AlertCircle className="w-5 h-5" />
                        </span>
                        Key Findings
                    </h3>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">
                        {report.issues.length} Issues Detected
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {report.issues.map((issue, index) => {
                        const Icon = categoryIcons[issue.category] || Info
                        return (
                            <div key={index} className="bg-[#161616] p-8 rounded-[2rem] border border-white/5 hover:border-[#3DFFC3]/30 transition-all shadow-xl flex flex-col gap-6 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3DFFC3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3 text-zinc-200 uppercase text-xs font-black tracking-widest">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#3DFFC3]/30 transition-colors">
                                            <Icon className="w-5 h-5 text-[#3DFFC3]" />
                                        </div>
                                        {issue.category}
                                    </div>
                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${severityColors[issue.severity]}`}>
                                        {issue.severity} priority
                                    </span>
                                </div>

                                <p className="text-white text-lg font-regular tracking-normal">{issue.problem}</p>

                                <div className="bg-[#202020] p-6 rounded-2xl border border-white/5 mt-auto">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3DFFC3]" />
                                        </div>
                                        <span className="text-xs font-black text-[#3DFFC3] uppercase tracking-widest">Solution</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">{issue.suggestion}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
