export default function DashboardWireframePage() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', background: '#191919', minHeight: '100vh', color: '#aaa', display: 'flex' }}>

            {/* ── LEFT SIDEBAR ── */}
            <aside style={{ width: 256, flexShrink: 0, background: '#111', borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0 }}>

                {/* Brand */}
                <div style={{ padding: '16px', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <WireBox w={24} h={24} label="▲" accent style={{ borderRadius: 6, fontSize: 10, flexShrink: 0 }} />
                    <WireBox w={100} h={22} label="UXPilot" />
                    <WireBox w={20} h={20} label="∨" style={{ marginLeft: 'auto', fontSize: 10 }} />
                </div>

                {/* Nav */}
                <div style={{ padding: '8px' }}>
                    <WireBox w={'100%' as any} h={34} label="🏠  Home (active)" accent style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={34} label="📋  Audits  ›" style={{ marginBottom: 4 }} />
                </div>

                {/* Recent audit list */}
                <div style={{ padding: '0 8px', flex: 1, overflow: 'hidden' }}>
                    <WireBox w={'100%' as any} h={22} label="example.com" style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={22} label="google.com" style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={22} label="stripe.com" style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={22} label="vercel.com" style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={22} label="github.com" style={{ marginBottom: 4 }} />
                    <WireBox w={120} h={18} label="View all history →" accent style={{ marginTop: 8 }} />
                </div>

                {/* Bottom */}
                <div style={{ borderTop: '1px solid #2a2a2a', padding: '8px' }}>
                    <WireBox w={'100%' as any} h={32} label="⬆  Upgrade to Pro" style={{ marginBottom: 4 }} />
                    <WireBox w={'100%' as any} h={32} label="⚙  Settings" style={{ marginBottom: 8 }} />
                    {/* User row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', border: '1px solid #2a2a2a', borderRadius: 8 }}>
                        <Circle color="#3DFFC355" />
                        <WireBox w={'100%' as any} h={18} label="user@email.com" style={{ flex: 1 }} />
                    </div>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main style={{ flex: 1, marginLeft: 256, background: '#191919', display: 'flex', flexDirection: 'column' }}>

                {/* Mobile top bar (shown as indicator) */}
                <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <WireBox w={80} h={22} label="≡  mobile bar" style={{ fontSize: 10 }} />
                    <WireBox w={100} h={22} label="UXPilot logo" style={{ marginLeft: 8 }} />
                    <WireBox w={28} h={28} label="👤" style={{ marginLeft: 'auto', borderRadius: 14 }} />
                </div>

                {/* HEADER */}
                <div style={{ padding: '40px 40px 24px', borderBottom: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <WireBox w={280} h={48} label="H1: Welcome back, [Name]" style={{ fontSize: 14 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Circle />
                        <WireBox w={50} h={22} label="New" accent />
                        <WireBox w={200} h={22} label="AI-powered UX scoring is live" />
                    </div>
                </div>

                {/* AUDIT SEARCH BAR */}
                <div style={{ padding: '24px 40px', borderBottom: '1px solid #2a2a2a' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <WireBox w={'100%' as any} h={56} label="[ URL input — https://example.com ]" style={{ flex: 1, fontSize: 13 }} />
                        <WireBox w={140} h={56} label="[ Run Audit ]" accent />
                    </div>
                </div>

                {/* JUMP BACK IN */}
                <div style={{ padding: '32px 40px', flex: 1 }}>
                    <WireBox w={140} h={22} label="Jump back in" style={{ marginBottom: 16 }} />

                    {/* Audit cards */}
                    {[
                        { url: 'example.com', date: 'Audit · Mar 1', score: '84', scoreColor: '#3DFFC3' },
                        { url: 'google.com', date: 'Audit · Feb 28', score: '72', scoreColor: '#3DFFC3' },
                        { url: 'stripe.com', date: 'Audit · Feb 27', score: '58', scoreColor: '#fb923c' },
                        { url: 'vercel.com', date: 'Audit · Feb 25', score: '43', scoreColor: '#fb923c' },
                        { url: 'github.com', date: 'Audit · Feb 22', score: '31', scoreColor: '#f87171' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', border: '1px solid #2a2a2a', borderRadius: 12, background: '#111', marginBottom: 8 }}>
                            <WireBox w={36} h={36} label="📄" style={{ borderRadius: 8, flexShrink: 0, fontSize: 14 }} />
                            <div style={{ flex: 1 }}>
                                <WireBox w={200} h={18} label={item.url} style={{ marginBottom: 6 }} />
                                <WireBox w={140} h={14} label={item.date} />
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: item.scoreColor, fontFamily: 'monospace' }}>{item.score}</div>
                        </div>
                    ))}
                </div>

                {/* LATEST RESULT (collapsed section) */}
                <div style={{ padding: '0 40px 40px' }}>
                    <WireBox w={140} h={22} label="Latest Result" style={{ marginBottom: 12 }} />
                    <div style={{ border: '1px solid #2a2a2a', borderRadius: 16, background: '#111', padding: 24, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WireBox w={340} h={100} label="[ Audit results / score breakdown / recommendations ]" />
                    </div>
                </div>

            </main>

            {/* Legend */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '8px', background: '#0d0d0d', fontSize: 11, color: '#444', borderTop: '1px solid #222' }}>
                WIREFRAME · /wireframe/dashboard · for screenshot only · delete after use
            </div>
        </div>
    )
}

function WireBox({
    w, h, label = '', accent = false, style = {}
}: {
    w: number | string; h: number; label?: string; accent?: boolean; style?: React.CSSProperties
}) {
    return (
        <div style={{
            width: w,
            height: h,
            border: `1px solid ${accent ? '#3DFFC355' : '#2a2a2a'}`,
            background: accent ? '#3DFFC310' : '#1a1a1a',
            color: accent ? '#3DFFC3' : '#555',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 500,
            textAlign: 'center',
            padding: '0 8px',
            boxSizing: 'border-box' as const,
            ...style,
        }}>
            {label}
        </div>
    )
}

function Circle({ color = '#3DFFC355' }: { color?: string }) {
    return <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
}
