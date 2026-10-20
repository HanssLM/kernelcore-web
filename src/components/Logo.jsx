import React, { useId } from 'react';

/**
 * KernelCore — identidad de marca
 * Concepto: "El Núcleo Kernel". Un hexágono tecnológico (core) que contiene
 * una "K" formada por trazas de circuito, con nodos que evocan la
 * infraestructura de red (racks, switches, topologías).
 *
 * Geometría 100% con primitivas SVG: <polygon>, <line> y <circle>.
 * viewBox 0 0 64 64 — el centro del hexágono y de la "K" está en (32, 32).
 */

const HEX_POINTS = '32,4 56.25,18 56.25,46 32,60 7.75,46 7.75,18';
const HEX_NODES = [
  [32, 4],
  [56.25, 18],
  [56.25, 46],
  [32, 60],
  [7.75, 46],
  [7.75, 18],
];

const FONT_STACK = "'Outfit', 'Plus Jakarta Sans', sans-serif";

/** Símbolo aislado. */
export function LogoMark({ size = 40, className = '', title = 'KernelCore', glow = true }) {
  const rawId = useId();
  const uid = `kc${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const grad = `${uid}-grad`;
  const kGrad = `${uid}-k`;
  const core = `${uid}-core`;
  const blur = `${uid}-glow`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={grad} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" />
          <stop offset="0.45" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>

        <linearGradient id={kGrad} x1="25.3" y1="21" x2="38.3" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFFAFE" />
          <stop offset="0.45" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>

        <radialGradient
          id={core}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(29 32) rotate(90) scale(21)"
        >
          <stop stopColor="#22D3EE" stopOpacity="0.42" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>

        <filter
          id={blur}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.1" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Halo del núcleo */}
      <polygon points={HEX_POINTS} fill={`url(#${core})`} />

      {/* Geometría principal con glow */}
      <g filter={glow ? `url(#${blur})` : undefined}>
        <polygon
          points={HEX_POINTS}
          stroke={`url(#${grad})`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line
          x1="25.3" y1="21" x2="25.3" y2="43"
          stroke={`url(#${kGrad})`} strokeWidth="4.5" strokeLinecap="round"
        />
        <line
          x1="25.3" y1="32" x2="38.3" y2="21"
          stroke={`url(#${kGrad})`} strokeWidth="4.5" strokeLinecap="round"
        />
        <line
          x1="25.3" y1="32" x2="38.3" y2="43"
          stroke={`url(#${kGrad})`} strokeWidth="4.5" strokeLinecap="round"
        />
      </g>

      {/* Nodos de la "K" */}
      <circle cx="38.3" cy="21" r="2.6" fill="#E0FBFF" />
      <circle cx="38.3" cy="43" r="2.6" fill="#E0FBFF" />

      {/* Nodos del hexágono (infraestructura de red) */}
      <g fill="#67E8F9" opacity="0.9">
        {HEX_NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />
        ))}
      </g>
    </svg>
  );
}

/** Bloque de texto: KERNELCORE (+ lema opcional). */
export function LogoWordmark({ size = 40, showTagline = true, className = '' }) {
  const s = size / 40;
  const wordSize = 15 * s;
  const tagSize = 9.5 * s;

  return (
    <div className={`leading-none ${className}`}>
      <div className="flex items-center">
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 700,
            fontSize: `${wordSize}px`,
            letterSpacing: `${0.06 * wordSize}px`,
            color: '#F8FAFC',
            whiteSpace: 'nowrap',
          }}
        >
          KERNELCORE
        </span>
      </div>

      {showTagline && (
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 400,
            fontSize: `${tagSize}px`,
            letterSpacing: '0.02em',
            color: '#94A3B8',
            whiteSpace: 'nowrap',
          }}
        >
          Serveis &amp; Sistemes Informàtics
        </span>
      )}
    </div>
  );
}

/**
 * Logo de KernelCore.
 * variant: 'horizontal' | 'stacked' | 'mark'
 */
export default function Logo({
  variant = 'horizontal',
  size = 40,
  showTagline = true,
  className = '',
  markClassName = '',
  title = 'KernelCore',
}) {
  if (variant === 'mark') {
    return <LogoMark size={size} className={`${className} ${markClassName}`.trim()} title={title} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`.trim()}>
        <LogoMark size={size} title={title} />
        <LogoWordmark size={size * 0.8} showTagline={showTagline} className="mt-2" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`.trim()} style={{ gap: size * 0.3 }}>
      <LogoMark size={size} title={title} className={markClassName} />
      <LogoWordmark size={size} showTagline={showTagline} />
    </div>
  );
}
