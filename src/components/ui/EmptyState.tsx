import { FileSearch, Plus } from "lucide-react"

interface EmptyStateProps {
    onCtaClick?: () => void
}

export function EmptyState({ onCtaClick }: EmptyStateProps) {
    return (
        <div className="py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/[0.05] rounded-[2.5rem] bg-white/[0.01] px-6">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                <FileSearch className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">No audits yet</h3>
            <p className="text-zinc-500 text-lg max-w-sm mb-8 font-medium">
                Paste a URL in the search bar above to generate your first AI-powered UX audit.
            </p>
            <button
                onClick={() => {
                    document.getElementById('url')?.focus()
                    onCtaClick?.()
                }}
                className="flex items-center gap-2 rounded-2xl bg-[#323232] px-8 py-4 font-black text-white hover:bg-[#424242] active:scale-[0.98] transition-all text-lg uppercase tracking-tight shadow-xl"
            >
                <Plus className="w-5 h-5" />
                Run your first audit
            </button>
        </div>
    )
}
