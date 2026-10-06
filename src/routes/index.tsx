import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GitFork,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Presentation,
  Send,
  Sparkles,
  Star,
  Sun,
  TerminalSquare,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { getGithubProfile } from "@/lib/github.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darshan M — Assistant Professor & Data Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Darshan M, a Computer Science Assistant Professor and Data Analyst in Karnataka, India.",
      },
      { property: "og:title", content: "Darshan M — Assistant Professor & Data Analyst" },
      {
        property: "og:description",
        content: "Teaching computer science, analyzing data, and building practical technology solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["Home", "About", "Skills", "Projects", "GitHub", "Analytics", "Academics", "Certifications", "Resume", "Contact"];

const skills = [
  { title: "Programming", icon: Code2, level: "Core practice", items: ["Python", "Java", "JavaScript", "PHP", "SQL", "HTML", "CSS"], bar: "w-4/5" },
  { title: "Data Science", icon: BarChart3, level: "Applied analysis", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "Exploratory Data Analysis"], bar: "w-[86%]" },
  { title: "Databases", icon: Database, level: "Data systems", items: ["MySQL", "MongoDB", "Data Modeling", "Query Design"], bar: "w-3/4" },
  { title: "AI & Emerging Tech", icon: BrainCircuit, level: "Active exploration", items: ["Artificial Intelligence", "Machine Learning", "Generative AI", "NLP", "AI-assisted development"], bar: "w-[82%]" },
  { title: "Tools", icon: TerminalSquare, level: "Daily toolkit", items: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Excel", "Power BI"], bar: "w-[88%]" },
];

const projects = [
  { title: "College Department Website", category: "Web", icon: Presentation, tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], description: "A responsive website for managing and presenting information about a Computer Science department." },
  { title: "AI Chatbot for College Website", category: "AI", icon: BrainCircuit, tech: ["Python", "NLP", "AI", "Flask"], description: "An AI-powered chatbot designed to answer common student and college-related queries." },
  { title: "Automatic Timetable Generator", category: "Software", icon: GraduationCap, tech: ["Python / Java", "MySQL"], description: "A system that automatically generates conflict-free academic timetables." },
  { title: "Student Skill Tracking System", category: "Web", icon: Users, tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], description: "A platform for tracking student skills, certifications, projects, and technical development." },
  { title: "Data Analysis Projects", category: "Data", icon: BarChart3, tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"], description: "Data cleaning, exploratory analysis, visualization, and insight generation using real-world datasets." },
];

const academics = [
  ["Computer Science Education", "Practical, concept-led learning for future-ready students.", GraduationCap],
  ["Artificial Intelligence", "Foundations, responsible use, and emerging applications.", BrainCircuit],
  ["Data Science", "From data preparation to insight communication.", BarChart3],
  ["Programming Languages", "Problem solving through syntax, logic, and paradigms.", Code2],
  ["Database Management Systems", "Structured data, query design, and information systems.", Database],
  ["Web Technologies", "Modern web foundations and full-stack project practice.", TerminalSquare],
  ["Principles of Programming Languages", "Language design, semantics, and computational thinking.", BookOpen],
] as const;

const certifications = [
  ["UGC / Faculty Development Program", "Issuing organization — replace", "Year — replace"],
  ["AI Literacy for Teaching and Learning", "Issuing organization — replace", "Year — replace"],
  ["Technical Certification", "Issuing organization — replace", "Year — replace"],
  ["Data Analytics Certification", "Issuing organization — replace", "Year — replace"],
  ["Professional Development", "Issuing organization — replace", "Year — replace"],
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("Message form ready — connect your preferred email service to receive submissions.");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={cn("site-header", scrolled && "site-header-compact")}>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Darshan M, home">
            <span className="brand-mark">DM</span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-extrabold">DARSHAN M</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:block">Educator · Analyst</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<ArrowRight /></a>)}
          </nav>
        )}
      </header>

      <main id="main">
        <section id="home" className="hero-grid relative flex min-h-[min(900px,100svh)] scroll-mt-24 items-center pt-24">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
            <div className="relative z-10">
              <div className="eyebrow"><span className="status-dot" /> Karnataka, India · Open to collaboration</div>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.04] sm:text-6xl lg:text-7xl">
                Hello, I’m <span className="text-gradient">Darshan M</span>
              </h1>
              <p className="typing-line mt-5 font-display text-lg font-bold text-primary sm:text-xl">Assistant Professor | Data Analyst | Computer Science Educator</p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">I teach, analyze, build, and explore emerging technologies—helping students turn concepts into practical solutions.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className={buttonVariants({ variant: "premium", size: "lg" })}>View My Work <ArrowRight /></a>
                <a href="#resume" className={buttonVariants({ variant: "glass", size: "lg" })}>Download Resume <Download /></a>
                <a href="#contact" className={buttonVariants({ variant: "ghost", size: "lg" })}>Contact Me</a>
              </div>
              <div className="mt-10 flex items-center gap-5 border-t border-border/70 pt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> Academia</span>
                <span className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Analytics</span>
                <span className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-primary" /> AI</span>
              </div>
            </div>
            <TechVisual />
          </div>
          <a href="#about" className="scroll-cue" aria-label="Scroll to about"><ChevronDown /></a>
        </section>

        <Section id="about" eyebrow="Profile" title="Teaching theory. Building practice." intro="A computer science educator who connects academic foundations with the technologies shaping today’s classrooms and workplaces.">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <article className="panel p-6 sm:p-8">
              <p className="text-lg leading-8 text-foreground/90">I’m an Assistant Professor and Data Analyst with a strong interest in programming, data science, artificial intelligence, and practical software development. My work spans classroom teaching, academic resources, laboratory manuals, student projects, and technical content.</p>
              <p className="mt-5 leading-7 text-muted-foreground">I believe students learn technology best by applying it. My approach combines clear foundations, guided experimentation, and project-based learning—helping learners build confidence as they move from concepts to useful solutions.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Teaching: programming, databases & web", "Technical: analytics, software & AI", "Research: data-driven learning systems", "Approach: practical, curious & student-first"].map((item) => <div key={item} className="flex items-start gap-3 rounded-md bg-muted/60 p-4 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</div>)}
              </div>
            </article>
            <div className="grid grid-cols-2 gap-3">
              {([["Teaching & Academic Work", BookOpen, "Concept to classroom"], ["Data Analysis", BarChart3, "Data to decisions"], ["Student Projects", Users, "Ideas to outcomes"], ["Technical Content", FileText, "Knowledge to resources"]] as Array<[string, LucideIcon, string]>).map(([label, Icon, caption]) => (
                <article key={String(label)} className="metric-card">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3>{String(label)}</h3><p>{String(caption)}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="Capabilities" title="A practical, full-spectrum toolkit." intro="From code and data to intelligent systems—organized around how I teach, analyze, and build.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skills.map(({ title, icon: Icon, items, level, bar }) => (
              <article key={title} className="skill-card">
                <div className="flex items-center justify-between"><span className="icon-box"><Icon /></span><span className="text-xs font-bold uppercase text-muted-foreground">{level}</span></div>
                <h3 className="mt-5 font-display text-xl font-extrabold">{title}</h3>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full bg-primary", bar)} /></div>
                <div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="skill-chip">{item}</span>)}</div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Selected work" title="Projects built for real learning." intro="Academic, analytical, and software projects designed to solve practical problems.">
          <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {["All", "Web", "AI", "Software", "Data"].map((item) => <Button key={item} variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</Button>)}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.filter((project) => filter === "All" || project.category === filter).map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
          </div>
        </Section>

        <GithubSection />

        <Section id="analytics" eyebrow="Data analyst profile" title="Turning raw data into a clear story." intro="A disciplined workflow spanning data preparation, exploration, visualization, and decision-ready reporting.">
          <div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="grid grid-cols-2 gap-3">{["Data Cleaning", "Exploratory Analysis", "Data Visualization", "Statistical Analysis", "Excel & SQL", "Python", "Dashboard Development", "Insight Communication"].map((item, i) => <div key={item} className="analytics-capability"><span>0{i + 1}</span>{item}</div>)}</div>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">Tools and methods are selected to fit the question—not the other way around. The goal is always a result that is accurate, understandable, and useful.</p>
            </div>
            <AnalyticsDashboard />
          </div>
        </Section>

        <Section id="academics" eyebrow="Academic & teaching" title="Subjects taught with context and clarity." intro="Core computer science disciplines presented through examples, labs, discussion, and application.">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {academics.map(([title, description, Icon]) => <article key={title} className="academic-card"><Icon /><div><h3>{title}</h3><p>{description}</p></div></article>)}
          </div>
        </Section>

        <Section id="certifications" eyebrow="Continuous learning" title="Professional development." intro="A structured place for faculty development, technical credentials, and ongoing learning achievements.">
          <div className="relative space-y-3 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-border">
            {certifications.map(([name, issuer, year], index) => (
              <article key={name} className="timeline-card">
                <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1"><p className="placeholder-label">PLACEHOLDER — REPLACE WITH YOUR DETAILS</p><h3>{name}</h3><p>{issuer} · {year}</p></div>
                <Button variant="ghost" size="sm" onClick={() => alert("Add a certificate file or URL to enable this button.")}>View <ExternalLink /></Button>
              </article>
            ))}
          </div>
        </Section>

        <Section id="resume" eyebrow="Resume" title="Experience at a glance." intro="A concise preview of the academic and technical profile behind the work.">
          <div className="resume-shell">
            <div className="resume-side">
              <span className="brand-mark brand-mark-large">DM</span><h3>Darshan M</h3><p>Assistant Professor<br />Data Analyst<br />Computer Science Educator</p>
              <div className="mt-auto"><p className="placeholder-label">FILE PLACEHOLDER</p><Button variant="premium" size="lg" className="mt-3 w-full" onClick={() => alert("Replace this placeholder with Darshan’s resume PDF.")}><Download /> Download Resume</Button></div>
            </div>
            <div className="grid gap-8 p-6 sm:p-9 md:grid-cols-2">
              {([ ["Education", "Add degree, institution, and graduation year.", GraduationCap], ["Teaching Experience", "Add roles, institutions, subjects, and dates.", BriefcaseBusiness], ["Technical Skills", "Programming, data science, databases, AI, and tools.", Code2], ["Projects", "Academic systems, data analysis, web, and AI work.", TerminalSquare], ["Certifications", "Add verified certifications and faculty development.", FileText], ["Achievements", "Add awards, publications, and measurable outcomes.", Sparkles] ] as Array<[string, string, LucideIcon]>).map(([title, text, Icon]) => <div key={title} className="resume-item"><Icon /><div><h3>{title}</h3><p>{text}</p></div></div>)}
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s start a thoughtful conversation." intro="For academic collaboration, data projects, workshops, or technical discussions.">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div className="contact-panel">
              <h3 className="font-display text-2xl font-extrabold">Connect with Darshan</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Contact details and social URLs below are clearly marked placeholders. Replace them with verified information before publishing.</p>
              <div className="mt-7 space-y-3">{([[Mail, "Email", "your.email@example.com — replace"], [Linkedin, "LinkedIn", "Profile URL — replace"], [Github, "GitHub", "Profile URL — replace"], [Instagram, "Instagram", "Profile URL — replace"], [MapPin, "Location", "Karnataka, India"]] as Array<[LucideIcon, string, string]>).map(([Icon, label, value]) => <div key={label} className="contact-row"><Icon /><div><span>{label}</span><p>{value}</p></div></div>)}</div>
              <SocialLinks />
            </div>
            <form className="panel grid gap-5 p-6 sm:p-8" onSubmit={submitContact}>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" placeholder="Your name" /><Field label="Email" name="email" type="email" placeholder="you@example.com" /></div>
              <Field label="Subject" name="subject" placeholder="How can we collaborate?" />
              <label className="field-label">Message<textarea name="message" rows={6} required placeholder="Write your message here…" className="field-input resize-y" /></label>
              <div className="flex flex-wrap items-center gap-4"><Button variant="premium" size="lg" type="submit"><Send /> Send Message</Button>{formStatus && <p role="status" className="max-w-md text-xs leading-5 text-muted-foreground">{formStatus}</p>}</div>
            </form>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <div><p className="font-display text-sm font-extrabold">© 2026 Darshan M. All Rights Reserved.</p><p className="mt-1 text-xs text-muted-foreground">Built with curiosity, code, and continuous learning.</p></div><SocialLinks compact />
        </div>
      </footer>
    </div>
  );
}

function GithubSection() {
  const fetchProfile = useServerFn(getGithubProfile);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-profile"],
    queryFn: () => fetchProfile(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Section id="github" eyebrow="Open source" title="Code published on GitHub." intro="Repositories load live from GitHub, so this section grows as new work is published.">
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((key) => <div key={key} className="panel h-48 animate-pulse" aria-hidden="true" />)}
        </div>
      )}

      {isError && (
        <p className="panel p-6 text-sm leading-6 text-muted-foreground" role="status">
          GitHub work couldn&apos;t be loaded just now. Please check back shortly.
        </p>
      )}

      {data && (
        <>
          <div className="panel mb-6 flex flex-wrap items-center gap-6 p-6">
            {data.avatarUrl && (
              <img src={data.avatarUrl} alt={`${data.displayName} on GitHub`} className="h-16 w-16 shrink-0 rounded-full border border-border object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-extrabold">{data.displayName}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{data.bio}</p>
            </div>
            <div className="flex items-center gap-7 text-center">
              <div><span className="block font-display text-2xl font-extrabold">{data.publicRepos}</span><span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Repos</span></div>
              <div><span className="block font-display text-2xl font-extrabold">{data.followers}</span><span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Followers</span></div>
            </div>
            <a href={data.url} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline" })}>View profile <ExternalLink /></a>
          </div>

          {data.repos.length === 0 ? (
            <p className="panel p-6 text-sm leading-6 text-muted-foreground">
              No public repositories yet — published work will appear here automatically.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.repos.map((repo) => (
                <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="project-card block p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <Github className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{repo.language}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold">{repo.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{repo.description}</p>
                  <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{repo.forks}</span>
                    {repo.updated && <span className="ml-auto">{new Date(repo.updated).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>}
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <section id={id} className="section-shell scroll-mt-20" data-reveal><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{intro}</p></div>{children}</div></section>;
}

function TechVisual() {
  return <div className="tech-visual" aria-label="Animated illustration connecting education, code, data, and AI" role="img">
    <div className="visual-grid" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="core-node"><BrainCircuit /><span>DARSHAN</span><small>TEACH · ANALYZE · BUILD</small></div>
    <div className="float-node node-code"><Code2 /><span>CODE</span></div><div className="float-node node-data"><BarChart3 /><span>DATA</span></div><div className="float-node node-learn"><GraduationCap /><span>LEARN</span></div>
    <div className="visual-caption"><span>01</span><p>Where academic thinking meets applied technology.</p></div>
  </div>;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const Icon = project.icon;
  return <article className="project-card"><div className={cn("project-visual", `project-visual-${(index % 3) + 1}`)} role="img" aria-label={`${project.title} technology illustration`}><span className="project-number">0{index + 1}</span><Icon /><div className="project-lines"><i /><i /><i /></div></div><div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase text-primary">{project.category}</p><h3 className="mt-2 font-display text-xl font-extrabold">{project.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{project.tech.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div><div className="mt-6 flex gap-2"><Button variant="outline" size="sm" onClick={() => alert("Replace with the project’s GitHub URL.")}><Github /> GitHub</Button><Button variant="ghost" size="sm" onClick={() => alert("Replace with the project’s live demo URL.")}>Live Demo <ExternalLink /></Button></div></div></article>;
}

function AnalyticsDashboard() {
  return <div className="dashboard-frame" role="img" aria-label="Sample analytics dashboard showing student engagement trends and category distribution"><div className="dashboard-top"><div><span>ACADEMIC ANALYTICS</span><h3>Learning engagement</h3></div><span className="live-badge"><i /> Sample data</span></div><div className="dashboard-metrics"><div><span>ENGAGEMENT</span><strong>87%</strong><small>↑ 12.4%</small></div><div><span>PROJECTS</span><strong>48</strong><small>+8 this term</small></div><div><span>COMPLETION</span><strong>92%</strong><small>Target 90%</small></div></div><div className="dashboard-charts"><div className="chart-main"><span>Weekly engagement</span><div className="bars">{["h-[38%]", "h-[53%]", "h-[44%]", "h-[69%]", "h-[61%]", "h-[82%]", "h-[74%]", "h-[92%]"].map((height, i) => <i key={i} className={height} />)}</div><div className="chart-labels"><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div></div><div className="donut-wrap"><span>Skill mix</span><div className="donut"><strong>5</strong><small>AREAS</small></div><div className="legend"><i /> Programming <i /> Data <i /> AI</div></div></div></div>;
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return <label className="field-label">{label}<input className="field-input" name={name} type={type} placeholder={placeholder} required /></label>;
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={cn("flex items-center gap-2", !compact && "mt-7")} aria-label="Social media links">{([[Github, "GitHub"], [Linkedin, "LinkedIn"], [Instagram, "Instagram"], [Mail, "Email"]] as Array<[LucideIcon, string]>).map(([Icon, label]) => <a key={label} href="#contact" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full")} aria-label={`${label} placeholder link`} title={`${label} — replace URL`}><Icon /></a>)}</div>;
}