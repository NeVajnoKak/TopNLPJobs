"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { categorySummary, courseCoverage, jobs, platforms, skillFrequency, sources } from "./data";

type ThemeMode = "paper" | "night";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h9M10.5 5.5 15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.35 4.35l1.4 1.4M14.25 14.25l1.4 1.4M15.65 4.35l-1.4 1.4M5.75 14.25l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.8 12.6A6.2 6.2 0 0 1 7.4 4.2 6.4 6.4 0 1 0 15.8 12.6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  );
}

function Metric({ value, label, detail, accent = false }: { value: string; label: string; detail: string; accent?: boolean }) {
  return (
    <div className={`metric ${accent ? "metric-accent" : ""}`}>
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{detail}</small>
    </div>
  );
}

function SkillBars({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`skill-bars ${compact ? "compact" : ""}`}>
      {skillFrequency.map((item) => (
        <div className="skill-row" key={item.label}>
          <div className="skill-label"><span>{item.label}</span><b>{item.value}/{item.total}</b></div>
          <div className="bar-track"><span style={{ width: `${(item.value / item.total) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function CoverageBars() {
  return (
    <div className="coverage-list">
      {courseCoverage.map((item) => (
        <div className="coverage-row" key={item.skill}>
          <div className="coverage-meta"><span>{item.skill}</span><b>{item.label}</b></div>
          <div className="coverage-track"><span style={{ width: `${item.level}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function PlatformGrid() {
  return (
    <div className="platform-grid">
      {platforms.map((platform) => (
        <a className="platform-card" href={platform.href} target="_blank" rel="noreferrer" key={platform.name} style={{ "--platform": platform.accent } as CSSProperties}>
          <div className="platform-top"><span className="platform-dot" /><b>{platform.name}</b><ArrowIcon /></div>
          <small>{platform.focus}</small>
          <h3>{platform.highlight}</h3>
          <p>{platform.location}</p>
          <div className="platform-note">{platform.note}</div>
        </a>
      ))}
    </div>
  );
}

function JobTable() {
  return (
    <div className="job-table-wrap">
      <table className="job-table">
        <thead><tr><th>Source</th><th>Role</th><th>Location</th><th>What stood out</th></tr></thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={`${job.company}-${job.role}`}>
              <td><span className="source-pill">{job.platform}</span></td>
              <td><a href={job.href} target="_blank" rel="noreferrer"><b>{job.role}</b><span>{job.company}</span>{job.compensation && <em>{job.compensation}</em>}</a></td>
              <td>{job.location}</td>
              <td><div className="mini-tags">{job.strengths.slice(0, 4).map((skill) => <span key={skill}>{skill}</span>)}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pipeline() {
  const steps = [
    ["01", "Collect", "documents, queries, logs"],
    ["02", "Prepare", "clean, tokenize, chunk"],
    ["03", "Represent", "embeddings, features"],
    ["04", "Retrieve", "semantic / vector search"],
    ["05", "Train", "labels, fine-tuning"],
    ["06", "Evaluate", "offline + online tests"],
    ["07", "Deploy", "API, cloud, monitoring"],
  ];
  return <div className="pipeline">{steps.map(([n, title, text], i) => <div className="pipeline-step" key={n}><span>{n}</span><b>{title}</b><small>{text}</small>{i < steps.length - 1 && <i>→</i>}</div>)}</div>;
}

function Slide({ index, kicker, title, subtitle, children, inverse = false }: { index: string; kicker: string; title: string; subtitle?: string; children: ReactNode; inverse?: boolean }) {
  return (
    <section className={`slide ${inverse ? "inverse" : ""}`}>
      <div className="slide-rule" />
      <header className="slide-header"><div><span className="kicker">{kicker}</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><span className="slide-index">{index}</span></header>
      <div className="slide-body">{children}</div>
    </section>
  );
}

function Presentation() {
  return (
    <main className="slides" aria-label="NLP job market presentation">
      <section className="slide hero-slide">
        <div className="slide-rule" />
        <div className="hero-copy">
          <span className="eyebrow">Current U.S. job review · September, 2026</span>
          <h1>7 current postings.<br />One clear hiring pattern.</h1>
          <p>NLP roles now combine language modeling with retrieval, data pipelines, evaluation, and production engineering.</p>
        </div>
        <div className="metric-grid">
          <Metric value="7" label="detailed postings" detail="NLP Engineer / Applied Scientist roles" />
          <Metric value="8" label="platforms scanned" detail="from LinkedIn to company careers" />
          <Metric value="Python + NLP" label="strongest shared signal" detail="followed by evaluation and deployment" accent />
        </div>
        <div className="hero-note"><b>Market signal</b><span>Employers increasingly expect end-to-end ownership: prepare the data, build the model, evaluate it, connect retrieval, and ship a reliable system.</span></div>
      </section>

      <Slide index="02" kicker="Job boards" title="Where the search happened" subtitle="Each platform exposes a different slice of the U.S. market, so the analysis uses several sources rather than relying on one board.">
        <PlatformGrid />
      </Slide>

      <Slide index="03" kicker="Posting sample" title="Seven roles, one comparison frame" subtitle="I focused on postings with enough technical detail to identify concrete skills, tools, and workflows.">
        <JobTable />
      </Slide>

      <Slide index="04" kicker="Representative role" title="Senior NLP Engineer — Zest for Tech" subtitle="This posting best captures the skills that repeat across the broader sample.">
        <div className="representative-grid">
          <div className="rep-main">
            <div className="rep-title"><span>LinkedIn · New York / Remote</span><strong>$150k–$260k</strong></div>
            <div className="rep-points">
              {["Python engineering with Hugging Face, spaCy / NLTK, PyTorch or TensorFlow", "Search and retrieval with embeddings, graph databases and Elasticsearch", "Entity extraction and text classification", "RAG and LLM-powered applications", "Fine-tuning for robustness and accuracy", "Prototype-to-production ownership"].map((item, i) => <div key={item}><b>{String(i + 1).padStart(2, "0")}</b><p>{item}</p></div>)}
            </div>
          </div>
          <aside className="rep-aside"><span>Why this one</span><p>It combines classical NLP, transformer tooling, retrieval, data pipelines and production engineering in a single role — the same pattern that appears repeatedly in the other postings.</p><a href={jobs[0].href} target="_blank" rel="noreferrer">Open posting <ArrowIcon /></a></aside>
        </div>
      </Slide>

      <Slide index="05" kicker="1 / 4" title="Frameworks / Libraries" subtitle="The strongest signal is flexibility across modeling, NLP, and data-processing tools.">
        <div className="two-col">
          <div className="category-card large"><span className="category-number">01</span><h3>Core stack</h3><div className="tag-cloud">{categorySummary[0].items.map((item, i) => <span className={i < 3 ? "hot" : ""} key={item}>{item}</span>)}</div><p>{categorySummary[0].note}</p></div>
          <div className="chart-card"><div className="chart-head"><span>Mentions in detailed sample</span><b>n = 7</b></div><SkillBars compact /></div>
        </div>
      </Slide>

      <Slide index="06" kicker="2 / 4" title="Techniques" subtitle="Classical NLP tasks now sit next to retrieval, transformers, and LLM-centered workflows.">
        <div className="tech-grid">{categorySummary[1].items.map((item, i) => <div className={`tech-card ${i < 4 ? "primary" : ""}`} key={item}><span>{String(i + 1).padStart(2, "0")}</span><h3>{item}</h3></div>)}</div>
        <div className="bottom-observation"><b>Pattern:</b><span>Employers are asking for systems that understand, retrieve, rank, extract, and evaluate — not only generate text.</span></div>
      </Slide>

      <Slide index="07" kicker="3 / 4" title="Data Processing" subtitle="The pipeline itself is part of the job description.">
        <Pipeline />
        <div className="pipeline-notes"><div><b>Repeated inputs</b><p>Unstructured documents, text, tables, user queries, structured and semi-structured data.</p></div><div><b>Repeated transformations</b><p>Tokenization, chunking, embeddings, retrieval, training-data creation, hard negatives and synthetic data.</p></div><div><b>Repeated quality checks</b><p>Model metrics, targeted error analysis, offline evaluation, online experiments and monitoring.</p></div></div>
      </Slide>

      <Slide index="08" kicker="4 / 4" title="Programming & Deployment" subtitle="Production readiness is the clearest requirement that extends beyond a model notebook.">
        <div className="deploy-layout"><div className="deploy-list">{categorySummary[3].items.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>)}</div><div className="deploy-quote"><span>Industry expectation</span><p>Build it, expose it, deploy it, monitor it, test it, and improve it.</p><small>Model quality matters, but reliability and maintainability are part of the role.</small></div></div>
      </Slide>

      <Slide index="09" kicker="Frequency" title="What appears most often" subtitle="Counts are based on the seven detailed postings in this review.">
        <div className="frequency-layout"><SkillBars /><div className="frequency-summary"><strong>4</strong><span>themes appear in at least 6 of 7 postings</span><p>NLP fundamentals, programming, evaluation, and production ownership are the strongest shared requirements.</p></div></div>
      </Slide>

      <Slide index="10" kicker="Course reflection" title="What can be practiced in this course?" subtitle="Most core NLP skills can be practiced directly. Production infrastructure will need extra work outside the course.">
        <div className="coverage-layout"><CoverageBars /><div className="reflection-card"><span>My reflection</span><p>This course can address the language-modeling foundation employers expect: preprocessing, classification, NER, embeddings, transformers, and evaluation.</p><p>To match the full job descriptions, I would add one small production project with an API, cloud deployment, CI/CD, and monitoring.</p></div></div>
      </Slide>

      <Slide index="11" kicker="Assignment summary" title="The skill set in one page" subtitle="The four categories from the discussion prompt, distilled from the current posting sample.">
        <div className="summary-grid">{categorySummary.map((category) => <div className="summary-card" key={category.number}><span>{category.number}</span><h3>{category.title}</h3><ul>{category.items.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
      </Slide>

      <section className="slide closing-slide">
        <div className="closing-copy"><span>Key takeaway</span><h2>NLP hiring now rewards end-to-end ownership.</h2><p>The strongest candidate can prepare data, choose the right technique, evaluate it rigorously, connect it to retrieval, and ship it as a reliable system.</p><div className="closing-line" /><h3>Thank you for watching.</h3><small>Current job-market review · September, 2026</small></div>
      </section>
    </main>
  );
}


export default function Home() {
  const [view, setView] = useState("presentation");
  const [theme, setTheme] = useState<ThemeMode>("paper");
  const className = useMemo(() => `site-shell theme-${theme} view-${view}`, [theme, view]);

  return (
    <div className={className}>
      <nav className="toolbar" aria-label="Presentation controls">
        <div className="brand"><span>NLP</span><div><b>Job Market Analysis</b><small>Fall 2026</small></div></div>
        <div className="toolbar-actions">
         
          <button className="icon-button" aria-label="Toggle theme" title="Toggle theme" onClick={() => setTheme(theme === "paper" ? "night" : "paper")}>{theme === "paper" ? <MoonIcon/> : <SunIcon/>}</button>
        </div>
      </nav>
       <Presentation /> 
      <footer className="site-footer"><span>Natural Language Processing · Current U.S. job-market review</span><span>September, 2026</span></footer>
    </div>
  );
}
