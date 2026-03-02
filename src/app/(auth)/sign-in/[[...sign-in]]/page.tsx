import { SignIn } from "@clerk/nextjs";
import { HexagonBackground } from "@/components/HexagonBackground";

export default function Page() {
    return (
        <HexagonBackground className="min-h-screen bg-[#191919]" hexagonSize={80} hexagonMargin={3}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <SignIn />
            </div>
        </HexagonBackground>
    );
}
