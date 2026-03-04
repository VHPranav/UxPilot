import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-white/5", className)}
            {...props}
        />
    )
}

export function AuditSkeleton() {
    return (
        <div className="mt-12 space-y-12 animate-in fade-in duration-500">
            <div className="bg-[#1F1F1F] rounded-[2.5rem] border border-white/5 p-10 md:p-14">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <Skeleton className="w-48 h-48 rounded-full" />
                    <div className="flex-1 space-y-4 w-full">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-[#161616] p-8 rounded-[2rem] border border-white/5 space-y-6">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
