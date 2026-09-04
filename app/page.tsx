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

const navItems = ["about", "experience", "education", "projects", "certificates", "skills"];

function ArrowIcon() {
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

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-heading">
      <span>{number}</span><h2>{title}</h2><div aria-hidden="true" />
      <figure className={`mini-harsh mini-harsh-${number}`} aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Back to top">HG<span>.</span></a>
        <nav aria-label="Page sections">
          {navItems.map((item) => <a key={item} href={`#${item}`}>{item}</a>)}
        </nav>
      </header>

      <section className="hero" id="top">
        <svg className="hero-network" viewBox="0 0 880 560" aria-hidden="true">
          <g className="network-paths">
            <path d="M42 393 164 316 274 382 393 251 510 298 627 186 815 250" />
            <path d="M164 316 190 166 343 114 393 251 529 102 627 186 764 76" />
            <path d="M274 382 420 456 510 298 687 409 815 250" />
            <path d="M190 166 393 251 420 456" />
          </g>
          <g className="network-nodes">
            <circle cx="42" cy="393" r="6" /><circle cx="164" cy="316" r="9" />
            <circle cx="190" cy="166" r="6" /><circle cx="274" cy="382" r="6" />
            <circle cx="343" cy="114" r="9" /><circle cx="393" cy="251" r="12" />
            <circle cx="420" cy="456" r="6" /><circle cx="510" cy="298" r="8" />
            <circle cx="529" cy="102" r="6" /><circle cx="627" cy="186" r="11" />
            <circle cx="687" cy="409" r="7" /><circle cx="764" cy="76" r="6" />
            <circle cx="815" cy="250" r="9" />
          </g>
          <g className="network-code">
            <text x="25" y="430">[ raw ]</text><text x="152" y="352">SQL</text>
            <text x="76" y="276">PySpark</text><text x="214" y="138">NLP</text>
            <text x="325" y="84">01</text><text x="370" y="236">Σ</text>
            <text x="438" y="502">TIME SERIES</text><text x="493" y="334">pipe()</text>
            <text x="548" y="74">COMPUTER VISION</text><text x="604" y="225">ML</text>
            <text x="604" y="447">DATABRICKS</text><text x="695" y="375">CLOUD</text>
            <text x="738" y="50">↗</text><text x="792" y="287">insight</text>
          </g>
        </svg>
        <div className="hero-copy">
          <p className="eyebrow">Satna, Madhya Pradesh, India</p>
          <h1>Harsh<br />Gupta<span>.</span></h1>
          <p className="summary">Curious about everything data — how it flows, what it reveals, and what we can build with it.</p>
          <div className="link-bar" aria-label="Profile links">
            {profileLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                {link.label}<ArrowIcon />
              </a>
            ))}
          </div>
        </div>

        <aside className="roles-panel" aria-label="Professional roles">
          <p className="roles-label">Working across</p>
          <ol>
            <li><span>01</span><strong>Data Scientist</strong></li>
            <li><span>02</span><strong>Data Engineer</strong></li>
            <li><span>03</span><strong>Data Analyst</strong></li>
          </ol>
          <p className="roles-note">From the first question<br />to the final decision.</p>
        </aside>
        <a className="scroll-cue" href="#about">Scroll to explore <span>↓</span></a>
      </section>

      <div className="content-shell">
        <section className="content-section" id="about">
          <SectionHeading number="01" title="About" />
          <div className="section-body about-copy">
            <p>I&apos;m drawn to the full story behind data: where it comes from, how it moves, and how it becomes something people can use. Right now, I&apos;m focused on machine learning and deep learning, with a particular interest in computer vision and natural language processing.</p>
            <p>Alongside model-building, I&apos;m learning the infrastructure that makes data work at scale—Microsoft Fabric, Databricks, and PySpark.</p>
          </div>
        </section>

        <section className="content-section" id="experience">
          <SectionHeading number="02" title="Experience" />
          <div className="section-body timeline">
            <article className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" /><div className="timeline-date">Dec 2025 — May 2026</div>
              <div><p className="kicker">Data Science Intern</p><h3>TechieShubhdeep IT Solutions Pvt Ltd</h3><p className="muted">Tested state-of-the-art models, analysed model architectures, and developed prototypes to turn research ideas into working experiments.</p></div>
            </article>
          </div>
        </section>

        <section className="content-section" id="education">
          <SectionHeading number="03" title="Education" />
          <div className="section-body education-list">
            {education.map((item, index) => (
              <article key={item.institution} className="education-item"><span className="item-index">0{index + 1}</span><div><h3>{item.institution}</h3><p>{item.degree}</p></div><time>{item.period}</time></article>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <SectionHeading number="04" title="Projects" />
          <div className="section-body projects-wrap">
            <div>
              <div className="subhead-row"><h3>Source projects</h3><span>{String(projects.length).padStart(2, "0")}</span></div>
              {projects.length ? <div className="project-list">{projects.map((project) => <a key={project.name} href={project.github} target="_blank" rel="noreferrer"><span>{project.name}</span><ArrowIcon /></a>)}</div> : <div className="empty-state"><span>01</span><p>Project archive is being curated.</p></div>}
            </div>
            <div id="live-projects">
              <div className="subhead-row"><h3>Live projects</h3><span>{String(liveProjects.length).padStart(2, "0")}</span></div>
              {liveProjects.length ? <div className="project-list">{liveProjects.map((project) => <a key={project.name} href={project.liveUrl} target="_blank" rel="noreferrer"><span>{project.name}</span><ArrowIcon /></a>)}</div> : <div className="empty-state"><span>02</span><p>Deployed work will appear here.</p></div>}
            </div>
          </div>
        </section>

        <section className="content-section" id="certificates">
          <SectionHeading number="05" title="Certificates" />
          <div className="section-body certificate-grid">
            {certificates.map((group, index) => (
              <article key={group.category} className="certificate-group"><span className="item-index">0{index + 1}</span><h3>{group.category}</h3>{group.items.length ? <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="muted">To be added.</p>}</article>
            ))}
          </div>
        </section>

        <section className="content-section" id="skills">
          <SectionHeading number="06" title="Skills" />
          <div className="section-body skills-placeholder"><div className="plus" aria-hidden="true">+</div><div><p className="kicker">In progress</p><h3>A focused toolkit is coming next.</h3><p className="muted">This section is intentionally open for the final skills list.</p></div></div>
        </section>
      </div>

      <footer>
        <div><p className="footer-name">Harsh Gupta</p><p>Data Scientist · Engineer · Analyst</p><p className="footer-credit">Built together with Codex.</p></div>
        <div className="footer-links" aria-label="Contact links"><a href="mailto:gupta059harsh@gmail.com" aria-label="Email Harsh Gupta"><MailIcon /></a><a href="https://www.linkedin.com/in/harsh-059-gupta" target="_blank" rel="noreferrer" aria-label="Harsh Gupta on LinkedIn"><LinkedInIcon /></a><a href="https://github.com/hgh11code" target="_blank" rel="noreferrer" aria-label="Harsh Gupta on GitHub"><GitHubIcon /></a></div>
        <p className="footer-location">Satna, India · 2026</p>
      </footer>
    </main>
  );
}
