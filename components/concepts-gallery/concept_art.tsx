'use client';

import type { Concept } from '@/lib/concepts';

type ConceptArtProps = { concept: Concept; large?: boolean };

/**
 * Isolated drawings for the scroll-velocity concepts gallery.
 * Each concept gets a distinct linear composition driven by its own parameters.
 * These deliberately do NOT reuse the project `Sheet` component.
 */
export default function ConceptArt({ concept, large = false }: ConceptArtProps) {
  return (
    <svg
      className={`cvg-art cvg-art-${concept.variant} ${large ? 'cvg-art-large' : ''}`}
      viewBox="0 0 800 520"
      role="img"
      aria-label={`${concept.title}, concept study`}
    >
      <rect className="cvg-art-bg" width="800" height="520" />
      {render(concept)}
      <rect className="cvg-art-frame" x="16" y="16" width="768" height="488" />
    </svg>
  );
}

type P = { params: Record<string, number> };

function render(concept: Concept) {
  const { variant, params } = concept;
  switch (variant) {
    case 'brise': return <Brise params={params} />;
    case 'garden': return <Garden params={params} />;
    case 'terraces': return <Terraces params={params} />;
    case 'river': return <River params={params} />;
    case 'vault': return <Vault params={params} />;
    case 'wind': return <Wind params={params} />;
    default: return null;
  }
}

/** Cast-concrete shading screen: sun + tautened grid of fins. */
function Brise({ params }: P) {
  const cols = Math.round(params.cols);
  const rows = Math.round(params.rows);
  const sun = params.sun;
  return (
    <g>
      <circle className="cvg-accent" cx={120} cy={84} r={sun} />
      <path className="cvg-accent cvg-dash" d={`M${120 - sun} 84H${120 + sun}M120 ${84 - sun}V${84 + sun}`} />
      <g className="cvg-thin">
        {Array.from({ length: rows }, (_, r) => <line key={r} x1={48} y1={150 + r * 32} x2={752} y2={150 + r * 32} />)}
      </g>
      {Array.from({ length: cols }, (_, c) => (
        <line key={c} className={c % 3 === 1 ? 'cvg-med' : 'cvg-thin'} x1={74 + c * 50} y1={118 + (c % 3) * 9} x2={74 + c * 50} y2={466} />
      ))}
      <path className="cvg-heavy" d="M36 470H764" />
      <text className="cvg-note" x="44" y="492">SECTION 1:200 / SUN AT 3 PM</text>
    </g>
  );
}

/** Vertical greenery: hanging cabins as ascending garden discs. */
function Garden({ params }: P) {
  const cabins = Math.round(params.cabins);
  const sway = params.sway;
  return (
    <g>
      <line className="cvg-heavy" x1={400} y1={64} x2={400} y2={456} />
      {Array.from({ length: cabins }, (_, i) => {
        const y = 120 + i * 56;
        const r = 92 + (i % 2) * 14;
        const x = 400 + (i % 2 === 0 ? -sway / 2 : sway / 2);
        return (
          <g key={i}>
            <circle className="cvg-med" cx={x} cy={y} r={r} />
            <path className="cvg-thin" d={`M${x - r} ${y}A${r} ${r} 0 0 1 ${x + r} ${y}`} />
            <line className="cvg-med" x1={400} y1={y - 22} x2={x} y2={y - r + 6} />
          </g>
        );
      })}
      <path className="cvg-accent cvg-dash" d="M300 440C360 300 440 330 500 250S560 180 640 120" />
      <path className="cvg-soft" d="M80 470C180 420 300 460 420 400S540 360 720 380L720 470H80" />
    </g>
  );
}
/** Terraced hillside section read as a staircase of garden roofs. */
function Terraces({ params }: P) {
  const levels = Math.round(params.levels);
  const stride = params.stride;
  return (
    <g>
      {Array.from({ length: levels }, (_, i) => {
        const x = 60 + i * stride;
        const yTop = 440 - i * 88;
        const xNext = 60 + (i + 1) * stride;
        return (
          <g key={i}>
            <rect className="cvg-med" x={x} y={yTop} width={stride} height={440 - yTop} />
            <path className="cvg-heavy" d={`M${x} ${yTop}H${xNext}L${xNext} ${yTop - 88}`} />
            <line className="cvg-thin cvg-dash" x1={x + 12} y1={yTop} x2={x + 12} y2={448} />
          </g>
        );
      })}
      <path className="cvg-soft" d="M20 452L780 452M20 496H780" />
      <text className="cvg-note" x="44" y="500">STEP SECTION / EAST LIGHT</text>
    </g>
  );
}

/** Riverine edge: folding promenade that steps down through flood margins. */
function River({ params }: P) {
  const strands = Math.round(params.strands);
  const bays = Math.round(params.bays);
  return (
    <g>
      <path className="cvg-soft" d="M0 320C96 268 170 356 300 300S470 236 680 300 800 290V500H0Z" />
      {Array.from({ length: strands }, (_, i) => (
        <path key={i} className={i % 2 === 0 ? 'cvg-med' : 'cvg-thin'} d={`M${40 + i * 20} ${322 + i * 22}C${200 + i * 40} ${230 + i * 14} ${420 - i * 10} ${330 + i * 10}S${700 - i * 30} ${268 + i * 8}`} />
      ))}
      {Array.from({ length: bays }, (_, b) => (
        <rect key={b} className={b % 2 === 0 ? 'cvg-med' : 'cvg-accent cvg-accent-fill'} x={70 + b * 118} y={b % 2 === 0 ? 322 : 150} width={84} height={118} />
      ))}
      <path className="cvg-heavy" d="M0 320C96 268 170 356 300 300S470 236 680 300" />
      <text className="cvg-note" x="44" y="500">TERRACE STEPS / FLOOD MARGIN 6.5m</text>
    </g>
  );
}

/** Thin-shell vault: a family of tightening arcs from support to keystone. */
function Vault({ params }: P) {
  const arches = Math.round(params.arches);
  const crown = params.crown;
  return (
    <g>
      <rect className="cvg-thin cvg-dash" x={150} y={200} width={500} height={240} />
      {Array.from({ length: arches }, (_, i) => {
        const lift = 30 + i * 22;
        return <path key={i} className={i % 2 === 0 ? 'cvg-med' : 'cvg-thin'} d={`M150 ${crown - lift}A220 ${200 + i * 6} 0 0 1 650 ${crown - lift}`} />;
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 190 + i * 70;
        const r = 34 - i * 3;
        return <path key={i} className="cvg-thin" d={`M${x} ${crown}A${r} ${r} 0 0 1 ${x + 40} ${crown}`} />;
      })}
      <path className="cvg-heavy" d="M120 520H680" />
      <line className="cvg-med" x1={150} y1={200} x2={150} y2={440} />
      <line className="cvg-med" x1={650} y1={200} x2={650} y2={440} />
      <text className="cvg-note" x="44" y="498">ONE-BRICK SHELL / CURVATURE ONLY</text>
    </g>
  );
}

/** Wind courtyard: a venturi funnel pulling air through shaded rooms. */
function Wind({ params }: P) {
  const fins = Math.round(params.fins);
  const draft = params.draft;
  return (
    <g>
      <path className="cvg-accent cvg-accent-fill" d={`M60 80L60 440L${120 + draft * 2} 260L${140 + draft * 4} 330Z`} />
      <path className="cvg-soft" d="M400 120C520 180 640 260 760 320V460H400V120" />
      {Array.from({ length: fins }, (_, i) => (
        <line key={i} className={i % 3 === 0 ? 'cvg-med' : 'cvg-thin'} x1={400 + i * 34} y1={120 + i * 6} x2={400 + i * 34} y2={150 + i * 30} />
      ))}
      {[1, 2, 3].map((r) => (
        <path key={r} className="cvg-heavy cvg-arrow" d={`M${400 - r * 64} ${380 - r * 42}C${360 - r * 20} ${330 - r * 20} ${300 - r * 10} ${300 - r * 10}`} />
      ))}
      <circle className="cvg-accent" cx={382} cy={150} r={26} />
      <text className="cvg-note" x="44" y="500">EVENING BREEZE / VENTURI 1:200</text>
    </g>
  );
}