import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { HexagonBackground } from '@/components/HexagonBackground'

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="bg-[#191919] min-h-screen">

      {/* ── HERO SECTION with Hexagon BG ── */}
      <HexagonBackground className="relative" hexagonSize={80} hexagonMargin={3}>

        {/* Gradient overlay: transparent at top → dark at bottom */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(to top, #191919 0%, #191919 8%, transparent 40%)' }}
        />

        {/* ── TOP NAV ── */}
        <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3DFFC3] to-indigo-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L5 4L8 8L10 5.5L12 10H2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="text-white font-bold text-[15px] tracking-tight">UXPilot</span>
          </Link>

          <div className="flex items-center gap-1">
            <Link href="#pricing" className="hidden sm:block px-4 py-2 text-[13px] text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Pricing</Link>
            <Link href="#docs" className="hidden sm:block px-4 py-2 text-[13px] text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Documentation</Link>
            <Link href="#" className="hidden sm:block px-4 py-2 text-[13px] text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">Case Studies</Link>
            <Link
              href={userId ? '/dashboard' : '/sign-in'}
              className="ml-2 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-[13px] font-medium hover:bg-white/15 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
                <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{userId ? 'Dashboard' : 'Get started'}</span>
            </Link>
          </div>
        </nav>

        {/* ── HERO TEXT ── */}
        <div className="relative z-10 flex flex-col items-center text-center pt-12 sm:pt-16 pb-8 sm:pb-10 px-4">
          <div className="mb-5 flex items-center gap-2 text-[13px] text-zinc-400 flex-wrap justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DFFC3] animate-pulse" />
            <span className="font-semibold text-white">New</span>
            <span className="text-zinc-500">AI-powered UX auditing is here.</span>
            <span className="hidden sm:inline text-zinc-600 text-[12px]">Our most intelligent analysis to date.</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] mb-4 sm:mb-5">
            UXPilot
          </h1>
          <p className="text-[15px] sm:text-[17px] text-zinc-400 max-w-sm sm:max-w-md leading-relaxed">
            The fastest path from URL to UX insights, powered by AI.
          </p>
        </div>

        {/* ── APP SHOWCASE CARD ── */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pb-28">
          <div className="w-full rounded-2xl border border-white/[0.08] bg-[#111111] overflow-hidden" style={{ minHeight: '420px' }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1" />
              <div className="w-32 h-4 rounded-full bg-white/5" />
              <div className="flex-1" />
            </div>
            <div className="relative p-8 flex items-center justify-center" style={{ minHeight: '360px' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <p className="text-3xl font-black text-white leading-tight text-center">Analyze any<br />website instantly</p>
              </div>
              <div className="absolute top-8 left-10 w-40 h-28 rounded-xl bg-[#1a1a1a] border border-white/[0.07] shadow-xl" />
              <div className="absolute top-6 left-40 w-24 h-16 rounded-xl bg-[#1a1a1a] border border-white/[0.07] shadow-xl" />
              <div className="absolute top-16 right-12 w-36 h-24 rounded-xl bg-[#1a1a1a] border border-white/[0.07] shadow-xl" />
              <div className="absolute top-4 right-48 w-20 h-14 rounded-xl bg-[#1a1a1a] border border-white/[0.07] shadow-xl" />
              <div className="absolute bottom-10 left-16 w-28 h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-xl" />
              <div className="absolute bottom-8 right-16 w-40 h-28 rounded-xl bg-[#3DFFC3]/5 border border-[#3DFFC3]/10 shadow-xl" />
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-20 rounded-xl bg-[#1a1a1a] border border-white/[0.07] shadow-xl" />
            </div>
          </div>
        </div>

      </HexagonBackground>

      {/* ── FEATURE SECTIONS ── */}
      <div className="bg-[#191919]">

        {/* Feature 1 */}
        <FeatureSection
          eyebrow="AI-powered analysis"
          title={<>Instant UX audits<br />with just a URL</>}
          description="Paste any website URL and get a comprehensive UX analysis in seconds. Our AI evaluates accessibility, performance, design consistency, and user experience across your entire page."
          ctaLabel="Run your first audit"
          ctaHref={userId ? '/dashboard' : '/sign-up'}
          flip={false}
        />

        {/* Feature 2 */}
        <FeatureSection
          eyebrow="Next-generation intelligence"
          title={<>Your very own<br />UX scoring engine</>}
          description="Get a weighted UX score from 0–100 with a detailed breakdown. Identify issues by category — navigation, readability, visual hierarchy, responsiveness — and know exactly what to fix."
          ctaLabel="See a sample report"
          ctaHref={userId ? '/dashboard' : '/sign-up'}
          flip={true}
        />

        {/* Feature 3 */}
        <FeatureSection
          eyebrow="Seamless history tracking"
          title={<>Track improvements<br />over time</>}
          description="Every audit is saved to your account. Compare scores across runs, share reports with your team, and prove the ROI of your design changes with a full audit trail."
          ctaLabel="Start tracking"
          ctaHref={userId ? '/dashboard' : '/sign-up'}
          flip={false}
        />

        {/* ── CTA SECTION ── */}
        <section className="text-center py-24 md:py-32 px-4 border-t border-white/[0.06]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            UXPilot
          </h2>
          <p className="text-[16px] text-zinc-400 mb-10">
            Start exploring and building better user experiences today.
          </p>
          <Link
            href={userId ? '/dashboard' : '/sign-up'}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-black font-bold text-[14px] hover:bg-zinc-100 transition-all shadow-lg"
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {userId ? 'Go to Dashboard' : 'Sign up and get started'}
          </Link>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/[0.06] px-4 sm:px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Terms</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[13px] font-semibold text-[#3DFFC3] mb-1">UXPilot</p>
              <Link href={userId ? '/dashboard' : '/sign-in'} className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Dashboard</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Documentation</Link>
              <Link href="#pricing" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Pricing</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[13px] font-semibold text-[#3DFFC3] mb-1">Resources</p>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Case Studies</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Blog</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Changelog</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[13px] font-semibold text-[#3DFFC3] mb-1">Product</p>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">UX Audit Tool</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Score Breakdown</Link>
              <Link href="#" className="block text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">Audit History</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

function FeatureSection({
  eyebrow, title, description, ctaLabel, ctaHref, flip
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
  ctaLabel: string
  ctaHref: string
  flip: boolean
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20 md:py-28">
      <div className={`flex flex-col ${flip ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>

        {/* Text side */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#3DFFC3]  tracking-widest mb-4">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] text-white leading-[1.1] mb-5">
            {title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-zinc-400 leading-relaxed mb-8 max-w-md">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-white border border-white/10 bg-white/5 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60">
              <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9M8 2h4m0 0v4m0-4L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {ctaLabel}
          </Link>
        </div>

        {/* Image placeholder side */}
        <div className="flex-1 w-full">
          <div className="w-full rounded-2xl border border-white/[0.07] bg-[#111111] overflow-hidden shadow-2xl" style={{ minHeight: '280px' }}>
            {/* Mock browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <div className="flex-1 mx-4 h-4 rounded-full bg-white/[0.04]" />
            </div>
            {/* Placeholder content */}
            <div className="p-6 space-y-3" style={{ minHeight: '240px' }}>
              <div className="h-4 rounded-full bg-white/[0.05] w-3/4" />
              <div className="h-4 rounded-full bg-white/[0.04] w-full" />
              <div className="h-4 rounded-full bg-white/[0.04] w-5/6" />
              <div className="mt-6 h-20 rounded-xl bg-white/[0.03] border border-white/[0.05]" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="h-14 rounded-lg bg-[#3DFFC3]/5 border border-[#3DFFC3]/10" />
                <div className="h-14 rounded-lg bg-indigo-500/5 border border-indigo-500/10" />
                <div className="h-14 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
