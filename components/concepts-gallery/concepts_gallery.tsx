'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { concepts, type Concept } from '@/lib/concepts';
import ConceptArt from './concept_art';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Isolated scroll-IMAGE-REVEAL concepts gallery (own environment, prefix `cvg-`).
 * Each drawing unveils via a clip-path curtain that opens as it scrolls into view,
 * while the art scales from a slight zoom down to rest. Driven by element-targeted
 * `useScroll` + `useTransform` (clipPath + scale) — no velocity, no shared sheets.
 */
export default function ConceptsGallery() {
  const [selected, setSelected] = useState<Concept | null>(null);

  return (
    <>
      <motion.div
        className="cvg-intro"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.7, ease }}
      >
        <span>Ideas unrolled / 00—06</span>
        <p>Concept studies that unfold as you move through them. Each drawing is clipped into a frame from every side and opens outward while it travels across the view — scroll down to pull, scroll up to push it back.</p>
      </motion.div>

      <div className="cvg-grid">
        {concepts.map((concept, index) => (
          <ConceptsCard key={concept.slug} concept={concept} index={index} onOpen={() => setSelected(concept)} />
        ))}
      </div>

      <AnimatePresence>{selected && <Viewer concept={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}

function ConceptsCard({ concept, index, onOpen }: { concept: Concept; index: number; onOpen: () => void }) {
  // Layout column (stagger), not reveal direction — the reveal is symmetric.
  const column = index % 3;
  const boxRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Progress across the whole card: 0 when it slides in at the bottom, 0.5 once
  // centred, 1 as it leaves at the top. Because it maps back and forth with the
  // element's position, scrolling UP reverses the reveal and scrolling DOWN plays
  // it forwards — a live, scrubbed curtain with no one-shot trigger.
  const { scrollYProgress } = useScroll({
    target: boxRef,
    offset: ['start end', 'end start'],
  });

  // The inset collapses in from all four edges at once, so the drawing unfolds in
  // every direction and stays fully open only while centred in the view.
  const closed = 'inset(47% 47% 47% 47%)';
  const clipPath = useTransform(scrollYProgress, [0, 0.5, 1], [closed, 'inset(0% 0% 0% 0%)', closed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const revealStyle = reduceMotion ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath };
  const zoomStyle = reduceMotion ? { scale: 1 } : { scale };

  return (
    <article ref={boxRef} className={`cvg-item cvg-item-${column}`}>
      <header>
        <span>Concept {String(index + 1).padStart(2, '0')}</span>
        <span>{concept.category} / {concept.year}</span>
      </header>

      <motion.button
        className={`cvg-media cvg-media-${column}`}
        type="button"
        layoutId={`cvg-${concept.slug}`}
        onClick={onOpen}
        aria-label={`Open ${concept.title} concept`}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ duration: 0.5, ease }}
      >
        <motion.div className="cvg-reveal" style={revealStyle}>
          <div className="cvg-frame">
            <motion.div className="cvg-zoom" style={zoomStyle}>
              <ConceptArt concept={concept} />
            </motion.div>
          </div>
          <em>{String(index + 1).padStart(2, '0')}</em>
        </motion.div>
      </motion.button>

      <div className="cvg-caption"><h3>{concept.title}</h3><p>{concept.summary}</p><small>{concept.type}</small></div>
    </article>
  );
}

function Viewer({ concept, onClose }: { concept: Concept; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div className="cvg-viewer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.section
        className="cvg-viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cvg-viewer-title"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.55 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="cvg-viewer-close" onClick={onClose} aria-label="Close concept viewer">Close <span>×</span></button>
        <motion.div className="cvg-viewer-art" layoutId={`cvg-${concept.slug}`}><ConceptArt concept={concept} large /></motion.div>
        <div className="cvg-viewer-copy">
          <span className="eyebrow">{concept.category} / {concept.year}</span>
          <h2 id="cvg-viewer-title">{concept.title}</h2>
          <p>{concept.summary}</p>
        </div>
      </motion.section>
    </motion.div>
  );
}
