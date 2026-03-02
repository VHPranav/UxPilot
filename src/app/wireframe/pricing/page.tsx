export default function PricingWireframePage() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', background: '#191919', minHeight: '100vh', color: '#aaa' }}>

            {/* NAV */}
            <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <WireBox w={120} h={28} label="[ Logo / Brand ]" />
                <div style={{ display: 'flex', gap: 10 }}>
                    <WireBox w={70} h={28} label="Pricing" accent />
                    <WireBox w={110} h={28} label="Documentation" />
                    <WireBox w={90} h={28} label="Case Studies" />
                    <WireBox w={120} h={28} label="[ Get Started ]" accent />
                </div>
            </div>

            {/* HEADER */}
            <div style={{ textAlign: 'center', padding: '72px 40px 48px' }}>
                <WireBox w={80} h={22} label="Eyebrow" accent style={{ margin: '0 auto 20px' }} />
                <WireBox w={400} h={64} label="H1: Simple, transparent pricing" style={{ margin: '0 auto 16px', fontSize: 18 }} />
                <WireBox w={440} h={36} label="Subtitle: Choose the plan that fits your workflow." style={{ margin: '0 auto 32px' }} />

                {/* Monthly / Yearly toggle */}
                <div style={{ display: 'inline-flex', border: '1px solid #333', borderRadius: 8, overflow: 'hidden' }}>
                    <WireBox w={100} h={34} label="Monthly" accent style={{ borderRadius: 0, border: 'none' }} />
                    <WireBox w={100} h={34} label="Yearly" style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #333' }} />
                </div>
            </div>

            {/* PRICING CARDS */}
            <div style={{ display: 'flex', gap: 24, maxWidth: 1000, margin: '0 auto', padding: '0 40px 80px', alignItems: 'stretch' }}>

                {/* FREE */}
                <PricingCard
                    label="Free"
                    price="₹0"
                    period="forever"
                    desc="Perfect for trying out UXPilot with a single audit."
                    features={['1 audit per account', 'Basic UX score', 'URL-only analysis', 'PDF export']}
                    cta="Get started free"
                    highlight={false}
                />

                {/* PRO — ₹999 */}
                <PricingCard
                    label="Pro"
                    price="₹999"
                    period="/ month"
                    desc="For individuals and freelancers who run regular audits."
                    features={['50 audits per month', 'Full UX breakdown', 'Score history & trends', 'Priority analysis', 'Email reports']}
                    cta="Upgrade to Pro"
                    highlight={true}
                    badge="Most Popular"
                />

                {/* TEAM — ₹2999 */}
                <PricingCard
                    label="Team"
                    price="₹2,999"
                    period="/ month"
                    desc="For agencies and teams managing multiple projects."
                    features={['Unlimited audits', 'Team collaboration', 'Custom branding', 'API access', 'Dedicated support', 'White-label reports']}
                    cta="Contact Sales"
                    highlight={false}
                />
            </div>

            {/* COMPARISON TABLE */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 80px' }}>
                <WireBox w={220} h={28} label="Feature Comparison Table" style={{ margin: '0 auto 24px' }} />
                <div style={{ border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#111', borderBottom: '1px solid #2a2a2a' }}>
                        <WireBox w='100%' h={40} label="Feature" style={{ borderRadius: 0, border: 'none', justifyContent: 'flex-start', paddingLeft: 20 }} />
                        <WireBox w='100%' h={40} label="Free" style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #2a2a2a' }} />
                        <WireBox w='100%' h={40} label="Pro" accent style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #2a2a2a' }} />
                        <WireBox w='100%' h={40} label="Team" style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #2a2a2a' }} />
                    </div>
                    {['Audits per month', 'UX Score', 'History & Trends', 'PDF / Email Reports', 'API Access', 'Team Members', 'Priority Support'].map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #1e1e1e' }}>
                            <WireBox w='100%' h={36} label={row} style={{ borderRadius: 0, border: 'none', justifyContent: 'flex-start', paddingLeft: 20 }} />
                            <WireBox w='100%' h={36} label={i === 0 ? '1' : i > 2 ? '✗' : '✓'} style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #1e1e1e', color: i > 2 ? '#444' : '#666' }} />
                            <WireBox w='100%' h={36} label={i === 0 ? '50' : i > 4 ? '✗' : '✓'} accent style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #1e1e1e' }} />
                            <WireBox w='100%' h={36} label="✓" style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid #1e1e1e', color: '#3DFFC3' }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ teaser */}
            <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 40px 80px', textAlign: 'center' }}>
                <WireBox w={160} h={28} label="FAQ Section" style={{ margin: '0 auto 20px' }} />
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #2a2a2a', borderRadius: 8, marginBottom: 8 }}>
                        <WireBox w={380} h={20} label={`Question ${i} — e.g. Can I cancel anytime?`} />
                        <WireBox w={24} h={20} label="+" />
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div style={{ textAlign: 'center', padding: '12px', background: '#0d0d0d', fontSize: 11, color: '#444', borderTop: '1px solid #222' }}>
                WIREFRAME · /wireframe/pricing · for screenshot only · delete after use
            </div>
        </div>
    )
}

function PricingCard({ label, price, period, desc, features, cta, highlight, badge }: {
    label: string; price: string; period: string; desc: string;
    features: string[]; cta: string; highlight: boolean; badge?: string;
}) {
    return (
        <div style={{
            flex: 1,
            border: `1px solid ${highlight ? '#3DFFC355' : '#2a2a2a'}`,
            borderRadius: 16,
            background: highlight ? '#111' : '#141414',
            padding: 28,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
        }}>
            {badge && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#3DFFC3', color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20 }}>
                    {badge}
                </div>
            )}

            {/* Plan label */}
            <WireBox w={80} h={24} label={label} accent={highlight} />

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: highlight ? '#3DFFC3' : '#666', lineHeight: 1 }}>{price}</span>
                <span style={{ fontSize: 13, color: '#444', paddingBottom: 4 }}>{period}</span>
            </div>

            {/* Description */}
            <WireBox w={'100%' as any} h={40} label={desc} />

            {/* Divider */}
            <div style={{ borderTop: '1px solid #2a2a2a' }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: `1px solid ${highlight ? '#3DFFC3' : '#444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: highlight ? '#3DFFC3' : '#444', flexShrink: 0 }}>✓</div>
                        <WireBox w={'100%' as any} h={16} label={f} style={{ textAlign: 'left', justifyContent: 'flex-start', paddingLeft: 8 }} />
                    </div>
                ))}
            </div>

            {/* CTA */}
            <WireBox w={'100%' as any} h={44} label={`[ ${cta} ]`} accent={highlight} style={{ marginTop: 8 }} />
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
            width: w, height: h,
            border: `1px solid ${accent ? '#3DFFC355' : '#2a2a2a'}`,
            background: accent ? '#3DFFC310' : '#1a1a1a',
            color: accent ? '#3DFFC3' : '#555',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 500, textAlign: 'center',
            padding: '0 8px', boxSizing: 'border-box' as const,
            ...style,
        }}>
            {label}
        </div>
    )
}
