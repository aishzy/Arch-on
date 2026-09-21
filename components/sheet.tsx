import type { Project } from '@/lib/projects';

type SheetProps = { project: Pick<Project, 'visual' | 'tone' | 'title'>; large?: boolean };

export default function Sheet({ project, large = false }: SheetProps) {
  const { visual, tone, title } = project;
  return (
    <svg className={`sheet sheet-${tone} ${large ? 'sheet-large' : ''}`} viewBox="0 0 800 520" role="img" aria-label={`${title} architectural drawing`}>
      <rect className="sheet-bg" width="800" height="520" />
      <g className="sheet-lines">
        {visual === 'tower' && <><rect x="276" y="52" width="182" height="380" /><path d="M306 52V432M336 52V432M366 52V432M396 52V432M426 52V432" />{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M276 ${82 + i * 28}H458`} />)}<path className="heavy" d="M152 432H624M218 432V480M570 432V480" /></>}
        {visual === 'slope' && <><path className="heavy" d="M48 410L760 178" /><path d="M102 392L198 360V274L294 244V186L400 154V96L520 62" />{[0, 1, 2, 3].map((i) => <rect key={i} x={112 + i * 92} y={288 - i * 46} width="112" height="82" />)}<path className="dash" d="M78 438H748" /></>}
        {visual === 'hall' && <>{Array.from({ length: 8 }, (_, i) => { const x = 74 + i * 86; const w = 616 - i * 68; return <path key={i} d={`M${x} 430V${185 + i * 18}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${185 + i * 18}V430`} />; })}<path className="heavy" d="M42 432H756" /></>}
        {visual === 'courtyard' && <>{Array.from({ length: 5 }, (_, i) => <rect key={i} x={90 + i * 116} y={110 + (i % 2) * 68} width="82" height="250" />)}<rect className="accent-fill" x="286" y="190" width="228" height="132" /><path className="dash" d="M64 402H736" /></>}
        {visual === 'river' && <><path className="accent-fill" d="M0 315C124 268 176 362 302 310S496 254 800 304V520H0Z" /><path d="M0 110H800M0 170H800M0 230H800" />{Array.from({ length: 18 }, (_, i) => <rect key={i} x={50 + (i % 6) * 120} y={i < 6 ? 56 : 350} width="82" height="54" />)}<path className="heavy" d="M0 310C124 263 176 357 302 305S496 249 800 299" /></>}
        {visual === 'canopy' && <>{Array.from({ length: 17 }, (_, i) => <path key={i} d={`M${40 + i * 45} 56C${100 + i * 24} 170 ${650 - i * 22} 300 ${760 - i * 42} 470`} />)}{Array.from({ length: 8 }, (_, i) => <path key={i} className="dash" d={`M42 ${100 + i * 48}C260 ${40 + i * 38} 500 ${510 - i * 35} 758 ${150 + i * 38}`} />)}</>}
      </g>
      <text className="sheet-label" x="40" y="480">A-{visual === 'tower' ? '01' : '07'} / {title}</text>
      <text className="sheet-scale" x="760" y="480" textAnchor="end">1:200</text>
    </svg>
  );
}
