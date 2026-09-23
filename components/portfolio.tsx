'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { notes, projects, type Project } from '@/lib/projects';
import Sheet from './sheet';
import AnimatedBuilding from './animated_building';
import ConceptsGallery from './concepts-gallery/concepts_gallery';
import iconUrl from '@/app/icon.png';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const visibleProjects = projects.filter((project) => active === 'All' || project.category === active);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = '';
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setIsLoading(false), reducedMotion ? 250 : 1900);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.15,
      prevent: (node) => node.closest('.modal-backdrop, .velocity-viewer-backdrop, .cvg-viewer-backdrop') !== null,
    });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); lenisRef.current = null; };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (!selected) {
      lenisRef.current?.start();
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      return;
    }

    const scrollY = window.scrollY;
    lenisRef.current?.stop();
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollY);
      lenisRef.current?.start();
    };
  }, [selected]);

  const jump = (id: string) => {
    setMenuOpen(false); 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); jump('top'); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src={iconUrl.src} alt="" aria-hidden="true" draggable={false} />Manku<span> / 26</span>
        </a>
        <button className="menu-toggle" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span />Menu</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['about', 'concepts', 'projects', 'notes', 'contact'].map((item) => <button key={item} onClick={() => jump(item)}>{item}</button>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <motion.div className="hero-signature" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: 1.3, ease }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconUrl.src} alt="" aria-hidden="true" draggable={false} />
          </motion.div>
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7, ease }}>Architecture student / Malaysia</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: 1.1, ease }}>Manku<span>.</span></motion.h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .8, ease }}>
              <p>Buildings that reward slow looking.<br />Drawings that make the idea visible.</p>
              <HeroProjectsButton onClick={() => jump('projects')} />
            </motion.div>
            <motion.div className="hero-building" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: .55, duration: 1.25, ease }}>
              <AnimatedBuilding />
            </motion.div>
          </div>
          <div className="hero-index">Projects<br /><span>01—06</span></div>
          <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: .8 }}><span className="hero-scroll-line" />Scroll to explore</motion.div>
        </section>

        <section className="about section-shell" id="about">
          <SectionHeading index="01" title="About" />
          <div className="about-layout"><motion.p className="manifesto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .45, margin: '-10% 0px -10% 0px' }} transition={{ duration: .8, ease }}>I design from the inside out. I start with how someone arrives, where they pause and what they can see from there, then let the structure, the section and the facade grow from that.</motion.p><div className="about-details"><motion.p initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .45, margin: '-10% 0px -10% 0px' }} transition={{ delay: .12, duration: .7, ease }}>I am a fourth-year architecture student working in hand sketches, physical models and parametric scripts. I like projects where climate, materials and public life have to be solved together.</motion.p><div className="detail-row"><span>Currently</span><strong>Looking for an internship<br />starting January 2027</strong></div><div className="detail-row"><span>Tools</span><strong>Rhino / Grasshopper / Revit<br />QGIS / V-Ray / Photoshop</strong></div></div></div>
          <div className="about-stats"><Stat value="06" label="Selected studies" /><Stat value="04" label="Years in architecture" /><Stat value="01" label="Approach: inside out" /><Stat value="∞" label="Sheets still to draw" /></div>
        </section>

        <section className="concepts section-shell" id="concepts">
          <SectionHeading index="02" title="Concepts" count="scroll reveals" />
          <ConceptsGallery />
        </section>

        <section className="projects section-shell" id="projects">
          <SectionHeading index="03" title="Projects" count={`${visibleProjects.length} projects`} />
          <motion.div className="section-lede" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35, margin: '-8% 0px -8% 0px' }} transition={{ duration: .7, ease }}><span>Latest work</span><p>A working archive of buildings, territories and small experiments. Each project starts with a question about how space should feel.</p></motion.div>
          <div className="filters">{categories.map((category) => <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}</button>)}</div>
          <motion.div layout className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={() => setSelected(project)} />)}</motion.div>
        </section>

        <section className="notes section-shell" id="notes">
          <SectionHeading index="04" title="Notes and ideas" />
          <div className="note-list">{notes.map((note, index) => <motion.details key={note.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35, margin: '-8% 0px -8% 0px' }} transition={{ delay: index * .08, duration: .7, ease }}><summary><span>{note.title}</span><small>{note.date}</small><b>+</b></summary><motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ delay: .12, duration: .55, ease }}>{note.text}</motion.p></motion.details>)}</div>
        </section>

        <section className="contact section-shell" id="contact"><motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ duration: .6, ease }}>04 / Contact</motion.p><motion.h2 initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .35 }} transition={{ delay: .08, duration: .8, ease }}>Have a project<br />in mind?</motion.h2><motion.a href="mailto:aimanfarhan74@gmail.com" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .5 }} transition={{ delay: .18, duration: .7, ease }}>aimanfarhan74@gmail.com <span>↗</span></motion.a><motion.div className="contact-links" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .5 }} transition={{ delay: .28, duration: .7, ease }}><a href="#contact">LinkedIn</a><a href="https://www.instagram.com/mku.works/">Instagram</a><a href="#contact">Issuu</a><a href="#contact">Download CV</a></motion.div></section>
      </main>
      <footer>
        <span className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer-mark" src={iconUrl.src} alt="" aria-hidden="true" draggable={false} />© 2026 Manku
        </span>
        <span>Designed through sections</span><button onClick={() => jump('top')}>Back to top ↑</button>
      </footer>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}</AnimatePresence>
    </>
  );
}

/**
 * Immersive hero call-to-action.
 * A magnetic, spring-linked disc: a dashed drafting ring spins on idle and
 * quickens on hover, the arrow dips toward the page while the whole control
 * leans into the cursor, and a mono label slides out of the shoulder.
 */
function HeroProjectsButton({ onClick }: { onClick: () => void }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  // Magnet values: pointer offset within the button (normalised -0.5..0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 260, damping: 22, mass: 0.5 });
  const x = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const y = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); setHover(false); };

  return (
    <motion.button
      ref={ref}
      className="circle-link"
      type="button"
      onClick={onClick}
      aria-label="Scroll to selected projects"
      onPointerMove={reduce ? undefined : move}
      onPointerLeave={leave}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      whileHover={reduce ? undefined : { scale: 1.12 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 340, damping: 18 }}
      style={reduce ? undefined : { x, y }}
    >
      <svg className="circle-ring" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="circle-ring-track" cx="32" cy="32" r="29" />
        <circle className="circle-ring-dash" cx="32" cy="32" r="29" />
      </svg>
      <motion.span
        className="circle-arrow"
        animate={{ rotate: hover && !reduce ? -45 : 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 15 }}
        aria-hidden="true"
      >↘</motion.span>
      <span className={`circle-label ${hover ? 'is-visible' : ''}`} aria-hidden="true">Selected projects <b>01 / 06</b></span>
    </motion.button>
  );
}
function SectionHeading({ index, title, count }: { index: string; title: string; count?: string }) { return <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .45, margin: '-8% 0px -8% 0px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .1 } } }}><motion.span variants={headingItem}>{index}</motion.span><motion.h2 variants={headingItem}>{title}</motion.h2>{count && <motion.small variants={headingItem}>{count}</motion.small>}</motion.div>; }
const headingItem = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease } } };

/** Loading Screen */
function LoadingScreen() {
  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .85, ease }}>
    <div className="loading-topline"><span>Manku / Architecture portfolio</span><span>2026</span></div>
    <div className="loading-drawing-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="loading-icon" src={iconUrl.src} alt="Manku monogram" draggable={false} />
      <motion.svg className="loading-drawing" viewBox="0 0 900 240" aria-hidden="true" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.35, delay: .15, ease }}>
        <path d="M30 200H870M90 200V92L166 40L242 92V200M350 200V112H650V200M704 200V58H810V200" />
        <path d="M112 108H220M376 140H624M730 88H784M730 116H784M730 144H784" />
        <path className="loading-accent-line" d="M242 92H350V112H650V58H704" />
        <path d="M90 218H810" strokeDasharray="2 8" />
      </motion.svg>
    </div>
    <div className="loading-bottomline"><strong>Drawing the section</strong><span>01 — 06</span></div>
  </motion.div>;
}
function Stat({ value, label }: { value: string; label: string }) { return <motion.div className="stat" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .5 }} transition={{ duration: .65, ease }}><strong>{value}</strong><span>{label}</span></motion.div>; }
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) { return <motion.button className={`project-card card-${index % 4}`} onClick={onOpen} layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .16, margin: '-5% 0px -5% 0px' }} transition={{ delay: (index % 2) * .1, duration: .8, ease }} whileHover={{ y: -8 }}><div className="card-sheet"><Sheet project={project} /></div><div className="card-info"><h3>{project.title}</h3><span>{project.category} / {project.year}</span></div><p>{project.summary}</p><i>View project ↗</i></motion.button>; }
function ProjectModal({ project, onClose, onSelect }: { project: Project; onClose: () => void; onSelect: (project: Project) => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.article className="modal" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: .65, ease }} onClick={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>Close <span>×</span></button>
      <div className="modal-heading">
        <p className="eyebrow">{project.category} / {project.year}</p>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
      </div>
      <div className="sheet-toolbar">
        <label htmlFor="projects-demo">Explore projects</label>
        <select id="projects-demo" value={project.slug} onChange={(event) => { const next = projects.find((item) => item.slug === event.target.value); if (next) onSelect(next); }}>
          {projects.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
        </select>
        <span>Scroll to browse ↕</span>
      </div>
      <div className="modal-visual sheet-scroll" aria-label="Architectural project sheets">
        <div className="sheet-stack">
          <div className="sheet-frame"><Sheet project={project} large /></div>
          <div className="sheet-caption"><span>Drawing {project.visual === 'tower' ? 'A-01' : 'A-07'}</span><span>Scale 1:200 / Scroll for full sheet</span></div>
          <div className="sheet-frame sheet-secondary"><Sheet project={projects[(projects.indexOf(project) + 1) % projects.length]} large /></div>
        </div>
      </div>
      <div className="modal-body"><dl><div><dt>Type</dt><dd>{project.type}</dd></div><div><dt>Studio</dt><dd>{project.studio}</dd></div><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Tools</dt><dd>{project.tools}</dd></div></dl><div>{project.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
    </motion.article>
  </motion.div>;
}
