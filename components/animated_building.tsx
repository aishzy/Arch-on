'use client';

import { motion } from 'framer-motion';

const lineTransition = (delay: number) => ({
  duration: 1.25,
  delay,
  ease: [0.16, 1, 0.3, 1] as const,
});

export default function AnimatedBuilding() {
  return (
    <svg className="building-drawing" viewBox="0 0 1200 520" role="img" aria-label="Animated architectural section drawing">
      <defs>
        <pattern id="ground-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V12" stroke="currentColor" strokeWidth="1" opacity=".35" />
        </pattern>
      </defs>

      <motion.path className="building-soft" d="M30 440H1170" pathLength={1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(0)} />
      <path className="building-ground" d="M30 440H1170V520H30Z" />
      <motion.path className="building-hatch" d="M30 440H1170V520H30Z" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: .7 }} />

      <motion.rect className="building-mass" x="106" y="334" width="218" height="106" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={lineTransition(.3)} style={{ transformOrigin: '106px 440px' }} />
      <motion.rect className="building-mass building-mass-dark" x="486" y="298" width="268" height="142" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={lineTransition(.55)} style={{ transformOrigin: '486px 440px' }} />
      <motion.rect className="building-mass building-mass-light" x="822" y="258" width="276" height="182" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={lineTransition(.82)} style={{ transformOrigin: '822px 440px' }} />
      <motion.rect className="building-cutout" x="556" y="348" width="112" height="92" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={lineTransition(1.1)} style={{ transformOrigin: '556px 440px' }} />
      <motion.path className="building-brise" d="M822 258H1098M822 278H1098M822 298H1098M822 318H1098M822 338H1098" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.15)} />
      <motion.path className="building-cantilever" d="M274 334H486V298H754" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.2)} />

      <motion.rect className="building-outline" x="140" y="280" width="320" height="160" pathLength={1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.22)} />
      {[320, 360, 400].map((y, index) => <motion.line key={y} className="building-detail" x1="140" y1={y} x2="460" y2={y} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.42 + index * .08)} />)}
      {[220, 300, 380].map((x, index) => <motion.line key={x} className="building-detail" x1={x} y1="280" x2={x} y2="440" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.5 + index * .08)} />)}

      <motion.rect className="building-accent" x="300" y="200" width="480" height="80" pathLength={1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.72)} />
      {Array.from({ length: 11 }, (_, index) => {
        const x = 340 + index * 40;
        return <motion.line key={x} className="building-accent-detail" x1={x} y1="200" x2={x} y2="280" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.9 + index * .035)} />;
      })}
      <motion.line className="building-heavy" x1="640" y1="282" x2="640" y2="440" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.2)} />
      <motion.line className="building-heavy" x1="770" y1="282" x2="770" y2="440" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.28)} />

      <motion.rect className="building-outline" x="880" y="80" width="120" height="360" pathLength={1} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(.95)} />
      {Array.from({ length: 8 }, (_, index) => <motion.line key={index} className="building-detail" x1="880" y1={120 + index * 40} x2="1000" y2={120 + index * 40} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.2 + index * .04)} />)}
      <motion.line className="building-detail" x1="940" y1="80" x2="940" y2="48" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.55)} />

      <motion.path className="building-dimension" d="M140 490H780M880 490H1000M140 448V498M460 448V498M780 448V498M880 448V498M1000 448V498" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition(1.8)} />
      <motion.g className="building-labels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.15, duration: .6 }}>
        <text x="300" y="482">28.80</text><text x="620" y="482">28.80</text><text x="940" y="482">10.80</text>
        <text x="1015" y="84">+32.40</text><text x="1015" y="284">+14.40</text><text x="1015" y="444">±0.00</text>
      </motion.g>

      {[90, 1062, 1120].map((x, index) => <motion.g key={x} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 + index * .1, duration: .6 }}><circle className="building-tree" cx={x} cy={400} r={index === 1 ? 28 : 23} /><line className="building-tree" x1={x} y1="420" x2={x} y2="440" /></motion.g>)}
    </svg>
  );
}
