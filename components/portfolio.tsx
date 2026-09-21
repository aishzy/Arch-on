'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { notes, projects, type Project } from '@/lib/projects';
import Sheet from './sheet';
import AnimatedBuilding from './animated_building';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const visibleProjects = projects.filter((project) => active === 'All' || project.category === active);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.15 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const jump = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); jump('top'); }}>Manku<span> / 26</span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span />Menu</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['projects', 'notes', 'about', 'contact'].map((item) => <button key={item} onClick={() => jump(item)}>{item}</button>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7, ease }}>Architecture student / Malaysia</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: 1.1, ease }}>Manku<span>.</span></motion.h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .8 }}>
              <p>Buildings that reward slow looking.<br />Drawings that make the idea visible.</p>
              <button className="circle-link" onClick={() => jump('projects')} aria-label="Scroll to selected projects">↘</button>
            </motion.div>
            <motion.div className="hero-building" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: .55, duration: 1.25, ease }}>
              <AnimatedBuilding />
            </motion.div>
          </div>
          <div className="hero-index">Projects<br /><span>01—06</span></div>
        </section>

        <section className="projects section-shell" id="projects">
          <SectionHeading index="01" title="Projects" count={`${visibleProjects.length} projects`} />
          <div className="filters">{categories.map((category) => <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>{category}</button>)}</div>
          <motion.div layout className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={() => setSelected(project)} />)}</motion.div>
        </section>

        <section className="notes section-shell" id="notes">
          <SectionHeading index="02" title="Notes and ideas" />
          <div className="note-list">{notes.map((note, index) => <motion.details key={note.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .08, duration: .7, ease }}><summary><span>{note.title}</span><small>{note.date}</small><b>+</b></summary><p>{note.text}</p></motion.details>)}</div>
        </section>

        <section className="about section-shell" id="about">
          <SectionHeading index="03" title="About" />
          <div className="about-layout"><motion.p className="manifesto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease }}>I design from the inside out. I start with how someone arrives, where they pause and what they can see from there, then let the structure, the section and the facade grow from that.</motion.p><div className="about-details"><p>I am a fourth-year architecture student working in hand sketches, physical models and parametric scripts. I like projects where climate, materials and public life have to be solved together.</p><div className="detail-row"><span>Currently</span><strong>Looking for an internship<br />starting January 2027</strong></div><div className="detail-row"><span>Tools</span><strong>Rhino / Grasshopper / Revit<br />QGIS / V-Ray / Photoshop</strong></div></div></div>
        </section>

        <section className="contact section-shell" id="contact"><p className="eyebrow">04 / Contact</p><h2>Have a project<br />in mind?</h2><a href="mailto:manku@gmail.com">manku@gmail.com <span>↗</span></a><div className="contact-links"><a href="#contact">LinkedIn</a><a href="#contact">Instagram</a><a href="#contact">Issuu</a><a href="#contact">Download CV</a></div></section>
      </main>
      <footer><span>© 2026 Manku</span><span>Designed through sections</span><button onClick={() => jump('top')}>Back to top ↑</button></footer>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} onSelect={setSelected} />}</AnimatePresence>
    </>
  );
}

function SectionHeading({ index, title, count }: { index: string; title: string; count?: string }) { return <div className="section-heading"><span>{index}</span><h2>{title}</h2>{count && <small>{count}</small>}</div>; }
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) { return <motion.button className={`project-card card-${index % 4}`} onClick={onOpen} layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ delay: (index % 2) * .1, duration: .8, ease }} whileHover={{ y: -8 }}><div className="card-sheet"><Sheet project={project} /></div><div className="card-info"><h3>{project.title}</h3><span>{project.category} / {project.year}</span></div><p>{project.summary}</p><i>View project ↗</i></motion.button>; }
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
        <span>Scroll the sheet ↕</span>
      </div>
      <div className="modal-visual sheet-scroll" tabIndex={0} aria-label="Scrollable architectural sheet">
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
