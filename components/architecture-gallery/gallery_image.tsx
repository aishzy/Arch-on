'use client';

import { motion, useReducedMotion, type MotionValue } from 'framer-motion';
import type { Project } from '@/lib/projects';
import Sheet from '../sheet';

type GalleryImageProps = {
  project: Project;
  index: number;
  y: MotionValue<number>;
  x: MotionValue<number>;
  onOpen: () => void;
};

export default function GalleryImage({ project, index, y, x, onOpen }: GalleryImageProps) {
  const reduceMotion = useReducedMotion();
  const offsetX = index % 3 === 1 ? x : undefined;

  return (
    <motion.button
      className={`velocity-gallery-image velocity-gallery-image-${index % 3}`}
      type="button"
      layoutId={`velocity-gallery-${project.slug}`}
      onClick={onOpen}
      aria-label={`Open ${project.title} concept view`}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="velocity-gallery-art" style={reduceMotion ? undefined : { y, x: offsetX }}>
        <Sheet project={project} large />
      </motion.div>
      <span>{String(index + 1).padStart(2, '0')}</span>
    </motion.button>
  );
}
