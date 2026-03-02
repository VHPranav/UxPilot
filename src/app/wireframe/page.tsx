export default function WireframePage() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', background: '#191919', minHeight: '100vh', color: '#aaa' }}>

            {/* NAV */}
            <div style={{ background: '#111', borderBottom: '1px solid #333', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <WireBox w={120} h={28} label="[ Logo / Brand ]" />
                <div style={{ display: 'flex', gap: 10 }}>
                    <WireBox w={70} h={28} label="Pricing" />
                    <WireBox w={110} h={28} label="Documentation" />
                    <WireBox w={120} h={28} label="[ Get Started ]" accent />
                </div>
            </div>

            {/* HERO with hex bg indicator */}
            <div style={{ background: '#141414', padding: '80px 40px 60px', textAlign: 'center', borderBottom: '1px solid #333', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '6px 14px', border: '1px solid #333', borderRadius: 20 }}>
                        <Circle />
                        <span style={{ color: '#3DFFC3', fontSize: 12, fontWeight: 700 }}>New</span>
                        <span style={{ color: '#666', fontSize: 12 }}>AI-powered UX auditing is here.</span>
                    </div>
                    <WireBox w={340} h={80} label="H1: UXPilot" style={{ margin: '0 auto 24px', fontSize: 22 }} />
                    <WireBox w={440} h={40} label="Subtitle: The fastest path from URL to UX insights, powered by AI." style={{ margin: '0 auto' }} />
                </div>
            </div>

            {/* APP SHOWCASE CARD */}
            <div style={{ padding: '40px', maxWidth: 960, margin: '0 auto' }}>
                <div style={{ border: '1px solid #333', borderRadius: 16, background: '#111', overflow: 'hidden' }}>
                    {/* Browser bar */}
                    <div style={{ borderBottom: '1px solid #2a2a2a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, background: '#111' }}>
                        <Circle small color="#663333" />
                        <Circle small color="#665533" />
                        <Circle small color="#336633" />
                        <WireBox w={180} h={16} style={{ marginLeft: 'auto', marginRight: 'auto' }} label="URL bar placeholder" />
                    </div>
                    {/* Showcase content */}
                    <div style={{ position: 'relative', height: 360, background: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WireBox w={260} h={64} label="H: Analyze any website instantly" style={{ zIndex: 2, fontSize: 14 }} />
                        <WireBox w={160} h={100} label="Card" style={{ position: 'absolute', top: 32, left: 40 }} />
                        <WireBox w={100} h={66} label="Card" style={{ position: 'absolute', top: 24, left: 220 }} />
                        <WireBox w={140} h={90} label="Card" style={{ position: 'absolute', top: 60, right: 48 }} />
                        <WireBox w={80} h={56} label="Card" style={{ position: 'absolute', top: 16, right: 220 }} />
                        <WireBox w={110} h={76} label="Card" style={{ position: 'absolute', bottom: 40, left: 64 }} />
                        <WireBox w={160} h={100} label="Card" style={{ position: 'absolute', bottom: 32, right: 64 }} />
                        <WireBox w={100} h={80} label="Card" style={{ position: 'absolute', bottom: 64, left: '50%', transform: 'translateX(-50%)' }} />
                    </div>
                </div>
            </div>

            {/* FEATURE SECTIONS */}
            {[
                { flip: false, eyebrow: 'AI-powered analysis', title: 'Instant UX audits with just a URL', desc: 'Description text: 2-3 lines explaining the feature and its benefit to the user.' },
                { flip: true, eyebrow: 'Next-generation ', title: 'Your very own UX scoring engine', desc: 'Description text: 2-3 lines explaining the feature and its benefit to the user.' },
                { flip: false, eyebrow: 'Seamless history tracking', title: 'Track improvements over time', desc: 'Description text: 2-3 lines explaining the feature and its benefit to the user.' },
            ].map((f, i) => (
                <div key={i} style={{ maxWidth: 960, margin: '0 auto', padding: '56px 40px', borderBottom: '1px solid #2a2a2a' }}>
                    <div style={{ display: 'flex', flexDirection: f.flip ? 'row-reverse' : 'row', gap: 48, alignItems: 'center' }}>
                        {/* Text */}
                        <div style={{ flex: 1 }}>
                            <WireBox w={160} h={20} label={`Eyebrow: ${f.eyebrow}`} accent style={{ marginBottom: 16 }} />
                            <WireBox w={'100%' as any} h={56} label={`H2: ${f.title}`} style={{ marginBottom: 16 }} />
                            <WireBox w={'100%' as any} h={56} label={f.desc} style={{ marginBottom: 24 }} />
                            <WireBox w={140} h={38} label="[ CTA Button ]" accent />
                        </div>
                        {/* Image placeholder */}
                        <div style={{ flex: 1 }}>
                            <div style={{ border: '1px solid #333', borderRadius: 12, background: '#111', overflow: 'hidden' }}>
                                <div style={{ borderBottom: '1px solid #2a2a2a', padding: '8px 12px', display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <Circle small color="#663333" /><Circle small color="#665533" /><Circle small color="#336633" />
                                    <WireBox w={120} h={14} style={{ marginLeft: 'auto', marginRight: 'auto' }} label="" />
                                </div>
                                <div style={{ padding: 20, background: '#141414', minHeight: 220 }}>
                                    <WireBox w={'80%' as any} h={12} style={{ marginBottom: 10 }} label="" />
                                    <WireBox w={'100%' as any} h={12} style={{ marginBottom: 10 }} label="" />
                                    <WireBox w={'90%' as any} h={12} style={{ marginBottom: 20 }} label="" />
                                    <WireBox w={'100%' as any} h={80} label="[Content Block]" style={{ marginBottom: 16 }} />
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <WireBox w={'33%' as any} h={44} label="" />
                                        <WireBox w={'33%' as any} h={44} label="" />
                                        <WireBox w={'33%' as any} h={44} label="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* CTA SECTION */}
            <div style={{ textAlign: 'center', padding: '80px 40px', borderTop: '1px solid #333', background: '#141414' }}>
                <WireBox w={260} h={80} label="H2: UXPilot" style={{ margin: '0 auto 20px', fontSize: 22 }} />
                <WireBox w={400} h={40} label="Start exploring and building better user experiences today." style={{ margin: '0 auto 28px' }} />
                <WireBox w={220} h={48} label="[ Sign up and get started ]" accent style={{ margin: '0 auto' }} />
            </div>

            {/* FOOTER */}
            <div style={{ background: '#111', borderTop: '1px solid #333', padding: '40px' }}>
                <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
                    {[
                        { col: 'Legal', items: ['Terms', 'Privacy'] },
                        { col: 'UXPilot', items: ['Dashboard', 'Documentation', 'Pricing'] },
                        { col: 'Resources', items: ['Case Studies', 'Blog', 'Changelog'] },
                        { col: 'Product', items: ['UX Audit Tool', 'Score Breakdown', 'Audit History'] },
                    ].map((c, i) => (
                        <div key={i}>
                            <WireBox w={'100%' as any} h={22} label={c.col} accent style={{ marginBottom: 14 }} />
                            {c.items.map((item, j) => (
                                <WireBox key={j} w={'80%' as any} h={16} label={item} style={{ marginBottom: 10 }} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div style={{ textAlign: 'center', padding: '12px', background: '#0d0d0d', fontSize: 11, color: '#444', borderTop: '1px solid #222' }}>
                WIREFRAME · /wireframe · for screenshot only · delete after use
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
            border: `1px solid ${accent ? '#3DFFC355' : '#333'}`,
            background: accent ? '#3DFFC310' : '#1e1e1e',
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

function Circle({ small = false, color = '#3DFFC355' }: { small?: boolean; color?: string }) {
    const s = small ? 10 : 7
    return <div style={{ width: s, height: s, borderRadius: '50%', background: color, flexShrink: 0 }} />
}
