'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type HexagonBackgroundProps = React.ComponentProps<'div'> & {
    hexagonSize?: number;
    hexagonMargin?: number;
};

function seededRandom(seed: number) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

function getHexOpacity(index: number): number {
    const r = seededRandom(index);
    if (r < 0.12) return 0.08;
    if (r < 0.35) return 0.04;
    return 0;
}

function HexagonBackground({
    className,
    children,
    hexagonSize = 75,
    hexagonMargin = 3,
    ...props
}: HexagonBackgroundProps) {
    const hexW = hexagonSize;
    const hexH = hexagonSize * 1.1;
    const rowSpacing = hexagonSize * 0.8;
    const baseMarginTop = -36 - 0.275 * (hexagonSize - 100);
    const marginTop = baseMarginTop + hexagonMargin;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
    const [gridDimensions, setGridDimensions] = React.useState({ rows: 0, columns: 0 });

    const updateGrid = React.useCallback(() => {
        const rows = Math.ceil(window.innerHeight / rowSpacing) + 2;
        const columns = Math.ceil(window.innerWidth / hexW) + 2;
        setGridDimensions({ rows, columns });
    }, [rowSpacing, hexW]);

    React.useEffect(() => {
        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, [updateGrid]);

    // Track mouse position over the container to detect which hex is hovered
    const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Approximate which hex the cursor is over
        const col = Math.floor(x / (hexW + hexagonMargin));
        const row = Math.floor(y / rowSpacing);
        setHoveredIdx(row * 200 + col);
    }, [hexW, hexagonMargin, rowSpacing]);

    const handleMouseLeave = () => setHoveredIdx(null);

    return (
        <div
            ref={containerRef}
            data-slot="hexagon-background"
            className={cn('relative size-full overflow-hidden', className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <style>{`:root { --hex-m: ${hexagonMargin}px; }`}</style>

            {/* Hex grid — z-0, behind everything */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => {
                    const isEven = (rowIndex + 1) % 2 === 0;
                    const ml = (isEven ? hexagonMargin / 2 : -(hexW / 2)) - 10;
                    return (
                        <div
                            key={`row-${rowIndex}`}
                            style={{ marginTop, marginLeft: ml }}
                            className="inline-flex"
                        >
                            {Array.from({ length: gridDimensions.columns }).map((_, colIndex) => {
                                const idx = rowIndex * 200 + colIndex;
                                const isHovered = hoveredIdx === idx;
                                const base = getHexOpacity(idx);
                                return (
                                    <div
                                        key={idx}
                                        style={{
                                            width: hexW,
                                            height: hexH,
                                            marginLeft: hexagonMargin,
                                            opacity: isHovered ? 1 : base,
                                            position: 'relative',
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                            background: isHovered ? '#555555' : '#ffffff',
                                            flexShrink: 0,
                                            transition: 'opacity 120ms ease, background 120ms ease',
                                        }}
                                    >
                                        {/* Inner cutout */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: hexagonMargin,
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                            background: isHovered ? '#252525' : '#191919',
                                            transition: 'background 120ms ease',
                                        }} />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Content — z-10, always on top, text never obscured */}
            <div className="relative z-10 size-full">
                {children}
            </div>
        </div>
    );
}

export { HexagonBackground, type HexagonBackgroundProps };
