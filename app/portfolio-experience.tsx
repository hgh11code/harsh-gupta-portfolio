"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent, WheelEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { certificates } from "@/data/certificates";
import { liveProjects, projects } from "@/data/projects";

const profileLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-059-gupta" },
  { label: "GitHub", href: "https://github.com/hgh11code" },
  { label: "Email", href: "mailto:gupta059harsh@gmail.com" },
  { label: "Resume", href: "/harsh-gupta-resume.pdf" },
];

const education = [
  { institution: "IIT Guwahati", degree: "BSc (Hons) Data Science & AI", period: "Oct 2023 — Jul 2027" },
  { institution: "MITS Gwalior", degree: "Master of Computer Applications", period: "Aug 2024 — Jun 2026" },
  { institution: "Awadhesh Pratap Singh University, Rewa", degree: "Bachelor of Science", period: "Jul 2019 — Jun 2022" },
];

const pages = [
  { id: "cover", label: "Introduction" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Skills" },
] as const;

type SkillNode = {
  label: string;
  group: "Models" | "Data" | "Platforms" | "Workflow";
  x: number;
  y: number;
};

const skillNodes: SkillNode[] = [
  { label: "NLP", group: "Models", x: 10, y: 20 },
  { label: "SQL", group: "Data", x: 22, y: 38 },
  { label: "Python", group: "Data", x: 12, y: 68 },
  { label: "Machine Learning", group: "Models", x: 31, y: 57 },
  { label: "Data Viz", group: "Data", x: 26, y: 84 },
  { label: "Big Data", group: "Data", x: 42, y: 24 },
  { label: "PySpark", group: "Data", x: 40, y: 76 },
  { label: "Analytics", group: "Data", x: 49, y: 52 },
  { label: "Databricks", group: "Platforms", x: 58, y: 36 },
  { label: "Computer Vision", group: "Models", x: 57, y: 78 },
  { label: "Microsoft Fabric", group: "Platforms", x: 70, y: 18 },
  { label: "Time Series", group: "Models", x: 71, y: 55 },
  { label: "Git", group: "Workflow", x: 77, y: 73 },
  { label: "Azure", group: "Platforms", x: 86, y: 36 },
  { label: "GitHub", group: "Workflow", x: 90, y: 82 },
];

const skillLinks = [
  [0, 1], [0, 5], [1, 3], [1, 2], [2, 3], [2, 4], [3, 5], [3, 6],
  [3, 7], [4, 6], [5, 7], [5, 8], [6, 7], [6, 9], [7, 8], [7, 9],
  [8, 10], [8, 11], [9, 11], [9, 12], [10, 13], [11, 12], [11, 13],
  [12, 14], [13, 14],
] as const;

function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "left" | "right" }) {
  if (direction === "left") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m15 5-7 7 7 7M8 12h12" stroke="currentColor" strokeWidth="1.7" /></svg>;
  }
  if (direction === "right") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7M4 12h12" stroke="currentColor" strokeWidth="1.7" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .7A11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17 4.3 18 4.6 18 4.6c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}

function LinkedInIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M5.3 7.8H1.7V22h3.6V7.8ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2Zm18.8 11.8c0-4.3-2.3-6.3-5.4-6.3a4.7 4.7 0 0 0-4.2 2.3v-2H9.1V22h3.6v-7c0-1.8.3-3.6 2.6-3.6 2.3 0 2.3 2.1 2.3 3.7V22h3.7l1-8.2Z" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M3 6.5h18v12H3v-12Z" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function PageHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <header className="page-heading">
      <div><span>{number}</span><p>{eyebrow}</p></div>
      <h2>{title}</h2>
    </header>
  );
}

function MiniHarsh({ frame, message }: { frame: number; message: string }) {
  const [responding, setResponding] = useState(false);

  return (
    <button
      className={`mini-guide${responding ? " is-responding" : ""}`}
      type="button"
      onClick={() => setResponding((value) => !value)}
      aria-label={`Mini Harsh: ${message}`}
    >
      <svg className="mini-guide-drawing" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M29 36c-5-23 42-30 42 0M31 25l-3-9 15 4 9-8 16 13" />
        <path d="M31 34v13c0 23 37 23 37 0V33M31 38h15v11H31zm22 0h15v11H53zm-7 4h7" />
        <path d={responding ? "M42 55q8 10 16 0" : frame % 2 ? "M43 57h13" : "M43 55q7 6 14 0"} />
        <path d="M39 66l-9 8-4 22m34-30 9 8 5 22M39 68l11 10 10-10M50 78v17M15 96h72" />
        <path className="guide-arm" d={frame % 2 ? "M66 76l13-10 6-19m-4 3 4-5 5 5" : "M33 76 20 64 12 66m2-3-4 3 3 5"} />
        <path stroke="var(--blue)" d={frame === 4 ? "M37 81h24v14H37zm6 5h12" : "m43 85-4 3 4 3m14-6 4 3-4 3m-5-7-3 9"} />
      </svg>
      <span className="guide-caption"><span>{responding ? "Let’s explore this together." : message}</span></span>
    </button>
  );
}

function SkillConstellation({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(compact ? "Microsoft Fabric" : "Machine Learning");
  const selectedNode = skillNodes.find((node) => node.label === selected) ?? skillNodes[0];

  return (
    <div className={`skill-constellation${compact ? " skill-constellation--compact" : ""}`}>
      <svg className="skill-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {skillLinks.map(([from, to]) => (
          <line key={`${from}-${to}`} x1={skillNodes[from].x} y1={skillNodes[from].y} x2={skillNodes[to].x} y2={skillNodes[to].y} />
        ))}
      </svg>
      {skillNodes.map((node) => (
        <button
          key={node.label}
          type="button"
          className={`skill-node skill-node--${node.group.toLowerCase()}${selected === node.label ? " is-active" : ""}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onPointerEnter={() => setSelected(node.label)}
          onFocus={() => setSelected(node.label)}
          onClick={() => setSelected(node.label)}
          aria-pressed={selected === node.label}
          aria-label={node.label}
        >
          <span aria-hidden="true" />
          <strong>{node.label}</strong>
        </button>
      ))}
      {!compact && (
        <div className="skill-readout" aria-live="polite"><span>{selectedNode.group}</span><strong>{selectedNode.label}</strong></div>
      )}
    </div>
  );
}

const gameSkills = [
  ["ML", "Models"], ["Python", "Data"], ["Azure", "Platforms"], ["Git", "Workflow"],
  ["DL", "Models"], ["SQL", "Data"], ["Excel", "Data"], ["CV", "Models"],
  ["GitHub", "Workflow"], ["Fabric", "Platforms"], ["Big Data", "Data"], ["NLP", "Models"],
  ["LLMs", "Models"], ["PySpark", "Data"], ["Databricks", "Platforms"], ["Docker", "Workflow"],
  ["AI Agents", "Models"], ["Analytics", "Data"], ["Statistics", "Data"], ["Bioinformatics", "Models"],
  ["MLflow", "Workflow"], ["Cloud", "Platforms"], ["Data Viz", "Data"], ["Time Series", "Models"],
] as const;

function SkillGame() {
  const [chosen, setChosen] = useState<number | null>(null);
  const [pairs, setPairs] = useState<[number, number][]>([]);
  const [message, setMessage] = useState("Pick two skills from the same colour family.");
  const matched = new Set(pairs.flat());
  const point = (index: number) => ({ x: 9 + (index % 4) * 27, y: 8 + Math.floor(index / 4) * 16.5 });
  const choose = (index: number) => {
    if (matched.has(index)) return;
    if (chosen === index) { setChosen(null); return; }
    if (chosen === null) { setChosen(index); setMessage(`${gameSkills[index][0]} selected. Find another ${gameSkills[index][1].toLowerCase()} skill.`); return; }
    if (gameSkills[chosen][1] !== gameSkills[index][1]) {
      setMessage("Different families. Try another dot of the same colour and symbol.");
      return;
    }
    setPairs([...pairs, [chosen, index]]);
    setChosen(null);
    setMessage(pairs.length === 11 ? "All 12 connections made. Nicely connected!" : `${gameSkills[chosen][0]} + ${gameSkills[index][0]} connected.`);
  };
  const symbols = { Models: "○", Data: "◇", Platforms: "□", Workflow: "△" };
  return <section className="skill-game" aria-label="Connect the skills game">
    <div className="game-intro"><p>Skills & learning map<br /><span>Connect matching colours. Explore the stack.</span></p><button type="button" onClick={() => { setPairs([]); setChosen(null); setMessage("Pick two skills from the same colour family."); }}>Reset</button></div>
    <div className="game-board">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{pairs.map(([a,b]) => <line key={a} x1={point(a).x} y1={point(a).y} x2={point(b).x} y2={point(b).y} className={`pair-${gameSkills[a][1].toLowerCase()}`} />)}</svg>
      {gameSkills.map(([label, group], index) => <button key={label} type="button" className={`game-dot pair-${group.toLowerCase()}${chosen === index ? " is-selected" : ""}${matched.has(index) ? " is-matched" : ""}`} style={{left:`${point(index).x}%`,top:`${point(index).y}%`}} aria-label={`${label}, ${group}${matched.has(index) ? ", connected" : ""}`} aria-pressed={chosen === index} aria-disabled={matched.has(index)} onClick={() => choose(index)}><span aria-hidden="true">{matched.has(index) ? "✓" : symbols[group]}</span><strong>{label}</strong></button>)}
    </div>
    <div className="game-status"><strong>{pairs.length} / 12</strong><p role="status">{message}</p></div>
  </section>;
}

export default function PortfolioExperience() {
  const [activePage, setActivePage] = useState(0);
  const [turn, setTurn] = useState(0);
  const [dark, setDark] = useState(false);
  const [hashReady, setHashReady] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const lastWheel = useRef(0);
  const angle = 360 / pages.length;

  const goToPage = useCallback((page: number) => {
    const next = ((page % pages.length) + pages.length) % pages.length;
    setTurn((previous) => {
      const current = ((previous % pages.length) + pages.length) % pages.length;
      let delta = next - current;
      if (delta > pages.length / 2) delta -= pages.length;
      if (delta < -pages.length / 2) delta += pages.length;
      return previous + delta;
    });
    setActivePage(next);
  }, []);

  useEffect(() => {
    const syncPageFromHash = () => {
      const pageFromHash = pages.findIndex((page) => `#${page.id}` === window.location.hash);
      if (pageFromHash >= 0) goToPage(pageFromHash);
      setHashReady(true);
    };
    const frame = window.requestAnimationFrame(syncPageFromHash);
    window.addEventListener("hashchange", syncPageFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncPageFromHash);
    };
  }, [goToPage]);

  useEffect(() => {
    if (!hashReady) return;
    window.history.replaceState(null, "", `#${pages[activePage].id}`);
  }, [activePage, hashReady]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest("input, textarea, select, [contenteditable=true]")) return;
      if (["ArrowRight", "ArrowLeft", "PageDown", "PageUp", "Home", "End"].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowRight" || event.key === "PageDown") goToPage(activePage + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goToPage(activePage - 1);
      if (event.key === "Home") goToPage(0);
      if (event.key === "End") goToPage(pages.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePage, goToPage]);

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const scrollArea = (event.target as HTMLElement).closest<HTMLElement>("[data-page-scroll]");
    if (scrollArea) {
      const canScrollDown = scrollArea.scrollTop + scrollArea.clientHeight < scrollArea.scrollHeight - 2;
      const canScrollUp = scrollArea.scrollTop > 2;
      if (Math.abs(event.deltaY) >= Math.abs(event.deltaX) && (canScrollDown || canScrollUp)) return;
    }
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(dominantDelta) < 18 || Date.now() - lastWheel.current < 520) return;
    lastWheel.current = Date.now();
    goToPage(activePage + (dominantDelta > 0 ? 1 : -1));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("a, button")) return;
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    shellRef.current?.style.setProperty("--pointer-x", x.toFixed(3));
    shellRef.current?.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragStart.current) return;
    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;
    dragStart.current = null;
    if (Math.abs(deltaX) > 58 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
      goToPage(activePage + (deltaX < 0 ? 1 : -1));
    }
  };

  const carouselStyle = {
    transform: `translateZ(calc(var(--drum-radius) * -1)) rotateY(${-turn * angle}deg)`,
  } as CSSProperties;

  return (
    <main
      ref={shellRef}
      className={`portfolio-shell${dark ? " theme-dark" : ""}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { dragStart.current = null; }}
    >
      <header className="book-header">
        <button className="monogram" type="button" onClick={() => goToPage(0)} aria-label="Go to introduction">HG<span>.</span></button>
        <nav aria-label="Portfolio pages">
          {pages.map((page, index) => (
            <button key={page.id} type="button" className={index === activePage ? "is-current" : ""} onClick={() => goToPage(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{page.label}
            </button>
          ))}
        </nav>
        <div className="page-count" aria-label={`Page ${activePage + 1} of ${pages.length}`}>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} pages`} type="button">{dark ? "☀" : "☾"}</button>
          <strong>{String(activePage + 1).padStart(2, "0")}</strong><span>/ {String(pages.length).padStart(2, "0")}</span>
        </div>
      </header>

      <p className="sr-only" aria-live="polite">Now viewing {pages[activePage].label}</p>

      <section className="drum-stage" aria-label="Rotating portfolio book">
        <div className="drum-shadow" aria-hidden="true" />
        <div className="cylinder-body">
        <div className="page-drum" style={carouselStyle}>
          <article id="cover" className={`book-page book-page--cover${activePage === 0 ? " is-active" : ""}`} style={{ transform: "rotateY(0deg) translateZ(var(--drum-radius))" }} aria-hidden={activePage !== 0} inert={activePage !== 0}>
            <div className="paper-grain" aria-hidden="true" />
            <SkillConstellation compact />
            <div className="cover-copy">
              <p className="eyebrow">Satna, Madhya Pradesh, India</p>
              <h1>Harsh<br />Gupta<span>.</span></h1>
              <p className="role-line">Data Scientist <i>·</i> Data Engineer <i>·</i> Data Analyst</p>
              <p className="cover-summary">Curious about everything data — how it flows, what it reveals, and what we can build with it.</p>
              <div className="profile-links" aria-label="Profile links">
                {profileLinks.map((link) => (
                  <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label}<ArrowIcon /></a>
                ))}
              </div>
            </div>
            <div className="cover-index" aria-hidden="true"><span>Portfolio</span><strong>2026</strong></div>
          </article>

          <article id="about" className={`book-page${activePage === 1 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 1} inert={activePage !== 1}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll" data-page-scroll>
              <PageHeading number="01" eyebrow="Profile" title="Curiosity, translated into useful data work." />
              <div className="about-layout">
                <p className="lead-copy">I&apos;m drawn to the full story behind data: where it comes from, how it moves, and how it becomes something people can use.</p>
                <div className="margin-note"><span>Current direction</span><p>Machine learning, deep learning, computer vision, NLP, and the engineering foundations that make them reliable.</p></div>
              </div>
              <div className="focus-strip">
                <div><span>01</span><strong>Understand</strong><p>Find the real question behind the dataset.</p></div>
                <div><span>02</span><strong>Build</strong><p>Turn exploration into repeatable systems.</p></div>
                <div><span>03</span><strong>Explain</strong><p>Make the result clear enough to act on.</p></div>
              </div>
            </div>
            <MiniHarsh frame={0} message="Follow the curiosity." />
          </article>

          <article id="experience" className={`book-page${activePage === 2 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle * 2}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 2} inert={activePage !== 2}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll" data-page-scroll>
              <PageHeading number="02" eyebrow="Experience" title="Research ideas, tested against working prototypes." />
              <div className="experience-entry">
                <div className="experience-meta"><span>Dec 2025 — May 2026</span><span>Internship</span></div>
                <div className="experience-copy"><p>Data Science Intern</p><h3>TechieShubhdeep IT Solutions Pvt Ltd</h3><ul><li>Tested state-of-the-art models against practical problem settings.</li><li>Studied model architectures to understand design trade-offs.</li><li>Developed prototypes that turned research directions into working experiments.</li></ul></div>
              </div>
              <p className="page-quote">“The useful model is the one you can understand, test, and put to work.”</p>
            </div>
            <MiniHarsh frame={1} message="Test. Study. Prototype." />
          </article>

          <article id="education" className={`book-page${activePage === 3 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle * 3}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 3} inert={activePage !== 3}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll" data-page-scroll>
              <PageHeading number="03" eyebrow="Education" title="A multidisciplinary route into data and computing." />
              <div className="education-stack">
                {education.map((item, index) => (
                  <article key={item.institution} className="education-card"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.institution}</h3><p>{item.degree}</p></div><time>{item.period}</time></article>
                ))}
              </div>
            </div>
            <MiniHarsh frame={2} message="Always learning." />
          </article>

          <article id="projects" className={`book-page${activePage === 4 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle * 4}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 4} inert={activePage !== 4}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll" data-page-scroll>
              <PageHeading number="04" eyebrow="Projects" title="Things built to make the learning concrete." />
              <div className="project-columns">
                <section>
                  <div className="column-label"><span>Source archive</span><strong>{String(projects.length).padStart(2, "0")}</strong></div>
                  <div className="project-list">
                    {projects.map((project, index) => <a key={project.name} href={project.github} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, "0")}</span><strong>{project.name}</strong><ArrowIcon /></a>)}
                  </div>
                </section>
                <section>
                  <div className="column-label"><span>Live now</span><strong>{String(liveProjects.length).padStart(2, "0")}</strong></div>
                  <div className="live-project-card">
                    {liveProjects.map((project) => (
                      <a key={project.name} href={project.liveUrl} target={project.liveUrl.startsWith("http") ? "_blank" : undefined} rel={project.liveUrl.startsWith("http") ? "noreferrer" : undefined}>
                        <span className="live-pulse" aria-hidden="true" /><small>Production</small><strong>{project.name}</strong><span>Open live project <ArrowIcon /></span>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            <MiniHarsh frame={3} message="Ideas into systems." />
          </article>

          <article id="certificates" className={`book-page${activePage === 5 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle * 5}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 5} inert={activePage !== 5}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll" data-page-scroll>
              <PageHeading number="05" eyebrow="Certificates" title="A record of deliberate practice." />
              <div className="certificate-groups">
                {certificates.map((group, groupIndex) => (
                  <section key={group.category} className="certificate-group">
                    <div className="column-label"><span>{group.category}</span><strong>{String(group.items.length).padStart(2, "0")}</strong></div>
                    <div>
                      {group.items.map((item, itemIndex) => {
                        const content = <><span>{String(groupIndex + 1)}.{String(itemIndex + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{[item.issuer, item.date, item.detail].filter(Boolean).join(" · ")}</small></div>{item.href && <ArrowIcon />}</>;
                        return item.href ? <a key={item.title} href={item.href} target="_blank" rel="noreferrer">{content}</a> : <div className="certificate-row" key={item.title}>{content}</div>;
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <MiniHarsh frame={4} message="Proof of the practice." />
          </article>

          <article id="skills" className={`book-page${activePage === 6 ? " is-active" : ""}`} style={{ transform: `rotateY(${angle * 6}deg) translateZ(var(--drum-radius))` }} aria-hidden={activePage !== 6} inert={activePage !== 6}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="page-scroll page-scroll--skills" data-page-scroll>
              <PageHeading number="06" eyebrow="Skills map" title="A connected world of data." />
              <SkillGame />
              <div className="skill-legend" aria-label="Skill categories"><span><i className="models" />Models</span><span><i className="data" />Data</span><span><i className="platforms" />Platforms</span><span><i className="workflow" />Workflow</span></div>
            </div>
            <MiniHarsh frame={5} message="Connect the stack." />
          </article>
        </div>
        </div>
      </section>

      <div className="book-controls">
        <button type="button" onClick={() => goToPage(activePage - 1)} aria-label={`Previous page: ${pages[(activePage - 1 + pages.length) % pages.length].label}`}><ArrowIcon direction="left" /><span>Previous</span></button>
        <div className="progress-dots" aria-label="Page progress">
          {pages.map((page, index) => <button key={page.id} type="button" className={index === activePage ? "is-current" : ""} onClick={() => goToPage(index)} aria-label={`Go to ${page.label}`} />)}
        </div>
        <button type="button" onClick={() => goToPage(activePage + 1)} aria-label={`Next page: ${pages[(activePage + 1) % pages.length].label}`}><span>Next</span><ArrowIcon direction="right" /></button>
      </div>

      <footer className="book-footer">
        <span>Drag · swipe · scroll · arrow keys</span>
        <span className="footer-credit">Designed with Harsh · Built with Codex</span>
        <div className="footer-links" aria-label="Contact links">
          <a href="mailto:gupta059harsh@gmail.com" aria-label="Email Harsh Gupta"><MailIcon /></a>
          <a href="https://www.linkedin.com/in/harsh-059-gupta" target="_blank" rel="noreferrer" aria-label="Harsh Gupta on LinkedIn"><LinkedInIcon /></a>
          <a href="https://github.com/hgh11code" target="_blank" rel="noreferrer" aria-label="Harsh Gupta on GitHub"><GitHubIcon /></a>
        </div>
      </footer>
    </main>
  );
}
