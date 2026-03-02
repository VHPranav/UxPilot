'use client'

import { useState } from 'react'

interface AuditFormProps {
    onAuditComplete: (audit: any) => void
}

export default function AuditForm({ onAuditComplete }: AuditFormProps) {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/audit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to perform audit')
            }

            onAuditComplete(data)
            setUrl('')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="url" className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Enter Website URL</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 group">
                            <input
                                id="url"
                                name="url"
                                type="url"
                                placeholder="https://example.com"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-[#121212] rounded-2xl border border-white/10 px-6 py-4 text-white placeholder-zinc-600 focus:border-[#2A2A2A]/50 focus:ring-2 focus:ring-[#2A2A2A]/10 outline-none transition-all disabled:opacity-50 text-lg shadow-inner"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-[#2A2A2A]/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-2xl bg-[#323232] px-8 py-4 font-black text-white cursor-pointer hover:bg-[#424242] active:scale-[0.98] transition-all  disabled:bg-zinc-700 disabled:text-zinc-500 flex items-center justify-center min-w-[160px] text-lg uppercase tracking-tight"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </span>
                            ) : "Run Audit"}
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="text-sm text-red-400 font-bold bg-red-500/10 p-4 rounded-2xl border border-red-500/20 animate-in shake-in duration-300">
                        {error}
                    </div>
                )}
                <div className="flex items-center gap-2 text-zinc-500 text-md">
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                    <p>Suggested: https://google.com</p>
                </div>
            </form>
        </div>
    )
}
