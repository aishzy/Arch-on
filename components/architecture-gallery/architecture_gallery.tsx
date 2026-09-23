'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import Sheet from '../sheet';
import GalleryImage from './gallery_image';
import { useScrollVelocity } from './use_scroll_velocity';

type ArchitectureGalleryProps = { projects: Project[] };

export default function ArchitectureGallery({ projects }: ArchitectureGalleryProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const { y, x } = useScrollVelocity();

  return (
    <>
      <motion.div className="velocity-gallery-intro" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .7 }}>
        <span>Moving archive / 00—06</span>
        <p>Concepts and studies with a little physical inertia. The faster you move through the archive, the more the drawings shift.</p>
      </motion.div>
      <div className="velocity-gallery">
        {projects.map((project, index) => (
          <article className={`velocity-gallery-project velocity-gallery-project-${index % 3}`} key={project.slug}>
            <header><span>Study {String(index + 1).padStart(2, '0')}</span><span>{project.category} / {project.year}</span></header>
            <GalleryImage project={project} index={index} y={y} x={x} onOpen={() => setSelected(project)} />
            <div className="velocity-gallery-caption"><h3>{project.title}</h3><p>{project.summary}</p><small>{project.type}</small></div>
          </article>
        ))}
      </div>
      <AnimatePresence>{selected && <VelocityViewer project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}

function VelocityViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return <motion.div className="velocity-viewer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.section className="velocity-viewer" role="dialog" aria-modal="true" aria-labelledby="velocity-viewer-title" initial={{ opacity: 0, scale: reduceMotion ? 1 : .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduceMotion ? 1 : .98 }} transition={{ duration: reduceMotion ? .15 : .55 }} onClick={(event) => event.stopPropagation()}>
      <button ref={closeRef} type="button" className="velocity-viewer-close" onClick={onClose} aria-label="Close concept viewer">Close <span>×</span></button>
      <motion.div className="velocity-viewer-art" layoutId={`velocity-gallery-${project.slug}`}><Sheet project={project} large /></motion.div>
      <div className="velocity-viewer-copy"><span className="eyebrow">{project.category} / {project.year}</span><h2 id="velocity-viewer-title">{project.title}</h2><p>{project.summary}</p></div>
    </motion.section>
  </motion.div>;
}
