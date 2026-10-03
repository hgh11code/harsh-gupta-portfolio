"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { certificates } from "@/data/certificates";
import { liveProjects, projects } from "@/data/projects";
import { connectionPoints, connectionsIntersect } from "@/lib/skill-connections";
import { gestureAxis, swipeStep } from "@/lib/portfolio-gestures";

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
  { label: "Deep Learning", group: "Models", x: 12, y: 46 },
  { label: "LLMs", group: "Models", x: 32, y: 12 },
  { label: "AI Agents", group: "Models", x: 51, y: 10 },
  { label: "Bioinformatics", group: "Models", x: 86, y: 10 },
  { label: "Excel", group: "Data", x: 10, y: 89 },
  { label: "Statistics", group: "Data", x: 48, y: 92 },
  { label: "Cloud", group: "Platforms", x: 88, y: 57 },
  { label: "Docker", group: "Workflow", x: 70, y: 93 },
  { label: "MLflow", group: "Workflow", x: 30, y: 34 },
];

const skillLinks = [
  [0, 1], [0, 5], [1, 3], [1, 2], [2, 3], [2, 4], [3, 5], [3, 6],
  [3, 7], [4, 6], [5, 7], [5, 8], [6, 7], [6, 9], [7, 8], [7, 9],
  [8, 10], [8, 11], [9, 11], [9, 12], [10, 13], [11, 12], [11, 13],
  [12, 14], [13, 14],
  [0, 15], [15, 16], [16, 17], [17, 18], [18, 13], [2, 19],
  [19, 4], [6, 20], [20, 22], [22, 14], [13, 21], [21, 11], [23, 3], [23, 8],
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
          <line className={skillNodes[from].label === selected || skillNodes[to].label === selected ? "is-highlighted" : ""} key={`${from}-${to}`} x1={skillNodes[from].x} y1={skillNodes[from].y} x2={skillNodes[to].x} y2={skillNodes[to].y} />
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
  const [message, setMessage] = useState("Tap two matching colours, or drag between them. Dots can have several connections.");
  const [order, setOrder] = useState(() => [7, 18, 2, 12, 21, 4, 16, 9, 0, 23, 6, 14, 20, 11, 1, 19, 8, 15, 22, 3, 17, 10, 5, 13]);
  const [preview, setPreview] = useState<{x:number;y:number;target:number|null} | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const board = useRef<HTMLDivElement>(null);
  const gesture = useRef<{index:number;x:number;y:number;moved:boolean} | null>(null);
  const suppressClick = useRef(false);
  const connected = new Set(pairs.flat());
  // Irregular, collision-safe positions; shuffling changes which skill occupies each spot.
  useEffect(() => {
    if (!board.current) return;
    const observer = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width < 430));
    observer.observe(board.current);
    return () => observer.disconnect();
  }, []);
  const positions = narrow
    ? [[12,5],[37,9],[64,3],[88,10],[9,22],[34,27],[61,19],[88,28],[14,41],[40,43],[65,37],[91,46],[9,58],[35,61],[61,54],[87,63],[14,75],[39,78],[66,71],[91,81],[9,92],[34,94],[60,88],[84,95]]
    : [[7,10],[24,6],[42,14],[58,7],[76,13],[92,8],[10,37],[27,32],[44,41],[61,34],[79,39],[94,32],[6,65],[23,60],[40,69],[57,62],[74,68],[91,60],[10,89],[28,94],[46,87],[62,93],[79,88],[94,95]];
  const point = (index: number) => { const [x,y] = positions[order.indexOf(index)]; return {x,y}; };
  const connect = (from:number, to:number) => {
    if (gameOver) return;
    if (from === to) return;
    if (gameSkills[from][1] !== gameSkills[to][1]) {
      setChosen(to);
      setMessage(`${gameSkills[to][0]} selected instead. Highlighted dots are available matches.`);
      return;
    }
    if (pairs.some(([a,b]) => (a === from && b === to) || (a === to && b === from))) {
      setMessage("Already connected. Pick another highlighted skill.");
      return;
    }
    const next = [...pairs, [from,to] as [number,number]];
    const crosses = pairs.some(([a,b]) => gameSkills[a][1] !== gameSkills[from][1] && connectionsIntersect(connectionPoints(point(from),point(to)),connectionPoints(point(a),point(b))));
    setPairs(next);
    setChosen(null);
    if (crosses) {
      setGameOver(true);
      setMessage("Round over — that connection crossed a different colour. Restart to try a new network.");
      return;
    }
    setMessage(new Set(next.flat()).size === gameSkills.length ? "Every skill is connected! Keep building your network, or shuffle for a fresh start." : `${gameSkills[from][0]} ↔ ${gameSkills[to][0]}. Keep connecting the network.`);
  };
  const choose = (index: number) => {
    if (gameOver) return;
    if (chosen === index) { setChosen(null); return; }
    if (chosen === null) { setChosen(index); setMessage(`${gameSkills[index][0]} selected. Tap any highlighted ${gameSkills[index][1].toLowerCase()} dot.`); return; }
    connect(chosen,index);
  };
  const targetAt = (x:number,y:number,from:number) => {
    let closest:number|null = null;
    let distance = 44;
    board.current?.querySelectorAll<HTMLButtonElement>("[data-skill]").forEach(button => {
      const index = Number(button.dataset.skill);
      if (index === from || gameSkills[index][1] !== gameSkills[from][1]) return;
      const rect = button.getBoundingClientRect();
      const next = Math.hypot(x-(rect.left+rect.width/2),y-(rect.top+rect.height/2));
      if (next < distance) { closest=index; distance=next; }
    });
    return closest;
  };
  const dragMove = (event:ReactPointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current || !board.current) return;
    if (Math.hypot(event.clientX-current.x,event.clientY-current.y)>6) current.moved=true;
    if (!current.moved) return;
    setChosen(current.index);
    const rect=board.current.getBoundingClientRect();
    const target=targetAt(event.clientX,event.clientY,current.index);
    setPreview(target === null ? {x:(event.clientX-rect.left)/rect.width*100,y:(event.clientY-rect.top)/rect.height*100,target:null} : {...point(target),target});
  };
  const shuffle = () => {
    const next = [...order];
    for(let i=next.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [next[i],next[j]]=[next[j],next[i]]; }
    setOrder(next); setPairs([]); setChosen(null); setPreview(null); setGameOver(false);
    setMessage("Fresh network. Tap or drag between matching colours.");
  };
  const symbols = { Models: "○", Data: "◇", Platforms: "□", Workflow: "△" };
  return <section className="skill-game" aria-label="Connect the skills game" onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()} onKeyDown={event=>{ if(event.key === "Escape") {setChosen(null);setPreview(null);} event.stopPropagation(); }}>
    <div className="game-intro"><p>Build a skill network<br /><span>Match colours. Don’t cross another colour’s line.</span></p><div className="game-actions"><button type="button" disabled={!pairs.length || gameOver} onClick={()=>{setPairs(pairs.slice(0,-1));setChosen(null);setMessage("Last connection undone.");}}>Undo</button><button type="button" onClick={shuffle}>{gameOver ? "Restart" : "Shuffle"}</button></div></div>
    <div className="game-board" ref={board} inert={gameOver}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{pairs.map(([a,b],index) => <polyline key={`${a}-${b}`} points={connectionPoints(point(a),point(b)).map(p=>`${p.x},${p.y}`).join(" ")} className={`pair-${gameSkills[a][1].toLowerCase()}${gameOver && index === pairs.length-1 ? " crossing-line" : ""}`} />)}{chosen !== null && preview && <polyline className={`connection-preview pair-${gameSkills[chosen][1].toLowerCase()}`} points={connectionPoints(point(chosen),preview).map(p=>`${p.x},${p.y}`).join(" ")}/>}</svg>
      {gameSkills.map(([label, group], index) => <button key={label} type="button" data-skill={index} className={`game-dot pair-${group.toLowerCase()}${chosen === index ? " is-selected" : ""}${connected.has(index) ? " is-connected" : ""}${chosen !== null && chosen !== index && gameSkills[chosen][1] === group ? " is-compatible" : ""}${chosen !== null && gameSkills[chosen][1] !== group ? " is-muted" : ""}${preview?.target === index ? " is-snap-target" : ""}`} style={{left:`${point(index).x}%`,top:`${point(index).y}%`}} aria-label={`${label}, ${group}`} aria-pressed={chosen === index} onPointerDown={event=>{if(event.button!==0)return; suppressClick.current=false;gesture.current={index,x:event.clientX,y:event.clientY,moved:false};event.currentTarget.setPointerCapture(event.pointerId);}} onPointerMove={dragMove} onPointerUp={event=>{const current=gesture.current;gesture.current=null;setPreview(null);if(current?.moved){suppressClick.current=true;const target=targetAt(event.clientX,event.clientY,current.index);if(target!==null)connect(current.index,target);else {setChosen(current.index);setMessage("Tap a highlighted dot to finish the connection.");}}}} onPointerCancel={()=>{gesture.current=null;setPreview(null);}} onClick={event=>{if(suppressClick.current && event.detail!==0){suppressClick.current=false;return;}choose(index);}}><span aria-hidden="true">{symbols[group]}</span><strong>{label}</strong></button>)}
    </div>
    <div className={`game-status${gameOver ? " game-status--ended" : ""}`}><strong>{gameOver ? "Round over" : `${connected.size} / 24 skills`}<br />{pairs.length} links</strong><p role={gameOver ? "alert" : "status"}>{message}</p></div>
  </section>;
}

export default function PortfolioExperience() {
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef(0);
  const [dark, setDark] = useState(false);
  const [hashReady, setHashReady] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const swipe = useRef<{id:number;x:number;y:number;axis:"x"|"y"|null;dx:number;width:number} | null>(null);
  const wheelGesture = useRef({at:0,sum:0,turned:false});
  const angle = 360 / pages.length;

  const goToPage = useCallback((page: number) => {
    const next = ((page % pages.length) + pages.length) % pages.length;
    let delta = next - activeRef.current;
    if (delta > pages.length / 2) delta -= pages.length;
    if (delta < -pages.length / 2) delta += pages.length;
    setDirection(delta < 0 ? -1 : 1);
    activeRef.current = next;
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
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        goToPage(activePage + (event.key === "ArrowRight" ? 1 : -1));
      }
      const area = stageRef.current?.querySelector<HTMLElement>(".is-active [data-page-scroll]");
      if (area && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") area.scrollTop = 0;
        else if (event.key === "End") area.scrollTop = area.scrollHeight;
        else area.scrollBy({top: (event.key.endsWith("Down") ? 1 : -1) * (event.key.startsWith("Page") ? area.clientHeight * .8 : 48)});
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePage, goToPage]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Native scrolling owns vertical input inside the reader, including inertia.
    const scrollReader = (event: globalThis.WheelEvent) => {
      if (event.ctrlKey) return; // Preserve browser pinch-to-zoom.
      const area = stage.querySelector<HTMLElement>(".is-active [data-page-scroll]");
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.5) {
        event.preventDefault();
        if ((event.target as HTMLElement).closest(".skill-game")) return;
        const now = performance.now();
        const gesture = wheelGesture.current;
        if (now - gesture.at > 220) { gesture.sum=0; gesture.turned=false; }
        gesture.at=now;
        gesture.sum += event.deltaX * (event.deltaMode === 1 ? 16 : 1);
        if (!gesture.turned && Math.abs(gesture.sum) > 85) {
          gesture.turned=true;
          goToPage(activePage + (gesture.sum > 0 ? 1 : -1));
        }
        return;
      }
      if (!area || area.contains(event.target as Node)) return;
      event.preventDefault();
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? area.clientHeight : 1;
      area.scrollTop += event.deltaY * scale;
    };
    stage.addEventListener("wheel", scrollReader, {passive:false});
    return () => stage.removeEventListener("wheel", scrollReader);
  }, [activePage,goToPage]);

  const resetSwipe = () => {
    swipe.current=null;
    stageRef.current?.classList.remove("is-dragging");
    stageRef.current?.style.setProperty("--drag-angle","0deg");
  };
  const startSwipe = (event:ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("a,button,input,.skill-game")) return;
    const width=event.currentTarget.querySelector(".book-page.is-active")?.getBoundingClientRect().width || 390;
    swipe.current={id:event.pointerId,x:event.clientX,y:event.clientY,axis:null,dx:0,width};
  };
  const moveSwipe = (event:ReactPointerEvent<HTMLElement>) => {
    const current=swipe.current;
    if (!current || current.id !== event.pointerId) return;
    const dx=event.clientX-current.x, dy=event.clientY-current.y;
    current.axis ??= gestureAxis(dx,dy);
    if (current.axis !== "x") return;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    current.dx=dx;
    stageRef.current?.classList.add("is-dragging");
    stageRef.current?.style.setProperty("--drag-angle",`${Math.max(-angle,Math.min(angle,dx/current.width*angle))}deg`);
  };
  const endSwipe = (event:ReactPointerEvent<HTMLElement>) => {
    const current=swipe.current;
    const step=current?.axis === "x" ? swipeStep(current.dx,current.width) : 0;
    resetSwipe();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (step) goToPage(activePage+step);
  };

  const carouselStyle = {
    "--arrival-angle": `${direction * 12}deg`,
    "--arrival-offset": `${direction * 32}px`,
  } as CSSProperties;

  return (
    <main
      className={`portfolio-shell${dark ? " theme-dark" : ""}`}
    >
      <svg className="upright-book" viewBox="0 0 1000 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M3 25Q250 0 500 25Q750 0 997 25V781Q750 758 500 792Q250 758 3 781Z" fill="var(--book-cover)" />
        <path d="M13 20Q250 0 500 24Q750 0 987 20V770Q750 749 500 783Q250 749 13 770Z" fill="var(--paper-deep)" stroke="var(--line)" />
        <path d="M23 14Q264 -1 500 26V771Q264 739 23 758Z" fill="var(--paper)" />
        <path d="M977 14Q736 -1 500 26V771Q736 739 977 758Z" fill="var(--paper)" />
        <path d="M500 26V771M18 763Q261 745 495 777M982 763Q739 745 505 777M17 26V757M983 26V757" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M494 26Q478 380 494 769M506 26Q522 380 506 769" stroke="var(--line)" strokeWidth="3" opacity=".35" />
      </svg>
      <header className="book-header">
        <button className="monogram" type="button" onClick={() => goToPage(0)} aria-label="Go to introduction">HG<span>.</span></button>
        <nav aria-label="Portfolio pages">
          {pages.map((page, index) => (
            <button key={page.id} type="button" aria-current={index === activePage ? "page" : undefined} className={index === activePage ? "is-current" : ""} onClick={() => goToPage(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{page.label}
            </button>
          ))}
        </nav>
        <label className="mobile-chapters"><span className="sr-only">Choose a chapter</span><select value={activePage} onChange={event => goToPage(Number(event.target.value))}>{pages.map((page,index)=><option key={page.id} value={index}>{String(index+1).padStart(2,"0")} / {page.label}</option>)}</select></label>
        <div className="page-count" aria-label={`Page ${activePage + 1} of ${pages.length}`}>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} pages`} type="button">{dark ? "☀" : "☾"}</button>
          <strong>{String(activePage + 1).padStart(2, "0")}</strong><span>/ {String(pages.length).padStart(2, "0")}</span>
        </div>
      </header>

      <p className="sr-only" aria-live="polite">Now viewing {pages[activePage].label}</p>

      <section ref={stageRef} className="drum-stage" aria-label="Rotating portfolio book" onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={endSwipe} onPointerCancel={resetSwipe} onLostPointerCapture={resetSwipe}>
        <div className="drum-shadow" aria-hidden="true" />
        <div className="cylinder-body">
        <div className="page-drum" style={carouselStyle}>
          <article id="cover" className={`book-page book-page--cover${activePage === 0 ? " is-active" : ""}`} aria-hidden={activePage !== 0} inert={activePage !== 0}>
            <div className="paper-grain" aria-hidden="true" />
            <div className="cover-reader" data-page-scroll>
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
            </div>
            <div className="cover-index" aria-hidden="true"><span>Portfolio</span><strong>2026</strong></div>
          </article>

          <article id="about" className={`book-page${activePage === 1 ? " is-active" : ""}`} aria-hidden={activePage !== 1} inert={activePage !== 1}>
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

          <article id="experience" className={`book-page${activePage === 2 ? " is-active" : ""}`} aria-hidden={activePage !== 2} inert={activePage !== 2}>
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

          <article id="education" className={`book-page${activePage === 3 ? " is-active" : ""}`} aria-hidden={activePage !== 3} inert={activePage !== 3}>
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

          <article id="projects" className={`book-page${activePage === 4 ? " is-active" : ""}`} aria-hidden={activePage !== 4} inert={activePage !== 4}>
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

          <article id="certificates" className={`book-page${activePage === 5 ? " is-active" : ""}`} aria-hidden={activePage !== 5} inert={activePage !== 5}>
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

          <article id="skills" className={`book-page${activePage === 6 ? " is-active" : ""}`} aria-hidden={activePage !== 6} inert={activePage !== 6}>
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
        <button className="chapter-step" type="button" onClick={()=>goToPage(activePage-1)} aria-label={`Previous chapter: ${pages[(activePage+pages.length-1)%pages.length].label}`}><ArrowIcon direction="left" /><span>Previous</span></button>
        <div className="chapter-position"><span>{String(activePage+1).padStart(2,"0")} / 07</span><strong>{pages[activePage].label}</strong>
        <div className="progress-dots" aria-label="Page progress">
          {pages.map((page, index) => <button key={page.id} type="button" className={index === activePage ? "is-current" : ""} onClick={() => goToPage(index)} aria-label={`Go to ${page.label}`} />)}
        </div>
        </div>
        <button className="chapter-step" type="button" onClick={()=>goToPage(activePage+1)} aria-label={`Next chapter: ${pages[(activePage+1)%pages.length].label}`}><span>Next chapter</span><ArrowIcon direction="right" /></button>
      </div>

      <footer className="book-footer">
        <span>Swipe · Trackpad · Arrow keys</span>
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
