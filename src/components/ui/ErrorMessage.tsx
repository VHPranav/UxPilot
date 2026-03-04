import { AlertCircle, XCircle } from "lucide-react"

interface ErrorMessageProps {
    title?: string
    message: string
    onRetry?: () => void
}

export function ErrorMessage({ title = "Something went wrong", message, onRetry }: ErrorMessageProps) {
    return (
        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-500 max-w-md mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}
