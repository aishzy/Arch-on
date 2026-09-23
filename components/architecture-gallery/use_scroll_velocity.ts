'use client';

import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'framer-motion';

export type GalleryVelocity = {
  y: MotionValue<number>;
  x: MotionValue<number>;
};

export function useScrollVelocity(): GalleryVelocity {
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const velocity = useSpring(rawVelocity, { stiffness: 170, damping: 30, mass: 0.75 });

  return {
    y: useTransform(velocity, [-2200, 2200], [28, -28], { clamp: true }),
    x: useTransform(velocity, [-2200, 2200], [-7, 7], { clamp: true }),
  };
}
