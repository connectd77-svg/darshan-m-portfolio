import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight, BarChart3, BrainCircuit, Check, CheckCircle2, Clock, Facebook, Instagram, Laptop,
  Linkedin, Loader2, Mail, MapPin, Menu, Phone, Presentation, Sparkles, TrendingUp, X, Youtube, Zap,
} from "lucide-react";
import heroImg from "@/assets/skillspark-hero.jpg";
import aboutImg from "@/assets/skillspark-about.jpg";

const TITLE = "SkillSpark Coach | Master Excel with AI";
const DESC =
  "Learn Excel, AI productivity tools, and professional PowerPoint skills with SkillSpark Coach. Explore practical learning designed to help you work smarter and grow your digital skills.";

export const Route = createFileRoute("/skillspark")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700;800&display=swap" },
      { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#102A56"/><path d="M22 9c-3-2-11-2-11 3s11 3 11 8-8 5-11 3" stroke="#168447" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>') },
    ],
  }),
  component: SkillSpark,
});

const NAV = [["home", "Home"], ["courses", "Courses"], ["benefits", "Benefits"], ["about", "About"], ["contact", "Contact"]] as const;

const COURSES = [
  { id: "excel", tone: "green", Icon: BarChart3, title: "Excel Skills", text: "Learn to organize data, use formulas, analyze information, and create meaningful reports.", topics: ["Data Management", "Excel Formulas", "Charts and Visualization", "Interactive Dashboards"], cta: "Explore Excel", value: "Excel Skills" },
  { id: "ai", tone: "purple", Icon: BrainCircuit, title: "AI Tools", text: "Discover how AI assistants can help you work efficiently, generate ideas, and automate everyday tasks.", topics: ["ChatGPT Fundamentals", "Microsoft Copilot", "AI-Assisted Workflows", "Productivity Automation"], cta: "Explore AI", value: "AI Tools" },
  { id: "ppt", tone: "orange", Icon: Presentation, title: "PowerPoint", text: "Create professional presentations that communicate information clearly and effectively.", topics: ["Slide Design", "Layout and Typography", "Visual Storytelling", "Presentation Skills"], cta: "Explore PowerPoint", value: "PowerPoint" },
] as const;

const BENEFITS = [
  ["Beginner to Advanced", "Start with the fundamentals and gradually develop more advanced skills."],
  ["Hands-On Practice", "Learn by working through exercises and practical activities."],
  ["Real-Life Examples", "Apply concepts to realistic workplace and productivity scenarios."],
  ["Flexible Online Learning", "Learn at your own pace and revisit learning materials when available."],
];

const OPTIONS = ["Excel Skills", "AI Tools", "PowerPoint", "Excel with AI", "General Inquiry"];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`ss-logo ${light ? "is-light" : ""}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" className="ss-logo-bg" /><path d="M28 11c-4-3-15-3-15 4s15 4 15 11-11 7-15 4" className="ss-logo-s" /><circle cx="29" cy="11" r="2.6" className="ss-logo-dot" /></svg>
      <span><strong>SkillSpark</strong><small>COACH</small></span>
    </span>
  );
}

function SkillSpark() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [course, setCourse] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const rv = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); rv.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".ss-reveal").forEach((el) => rv.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); rv.disconnect(); };
  }, []);

  const pick = (value: string) => { setCourse(value); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="ss-page">
      <a href="#main" className="ss-skip">Skip to content</a>
      <header className={`ss-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="ss-container ss-nav" aria-label="Main">
          <a href="#home" aria-label="SkillSpark Coach home"><Logo /></a>
          <button className="ss-burger" aria-expanded={open} aria-controls="ss-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <ul id="ss-menu" className={`ss-menu ${open ? "is-open" : ""}`}>
            {NAV.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={active === id ? "is-active" : ""} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
            <li><a href="#contact" className="ss-btn ss-btn-green ss-btn-sm" onClick={() => setOpen(false)}>Enroll Now</a></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="home" className="ss-hero">
          <div className="ss-container ss-hero-grid">
            <div className="ss-reveal">
              <p className="ss-eyebrow">SkillSpark Coach | Digital Skills Training</p>
              <h1 className="ss-h1">Master <span className="ss-green">Excel</span> with <span className="ss-purple">AI</span></h1>
              <p className="ss-lead">Learn Excel, explore AI-powered productivity tools, and create professional presentations. Build practical digital skills that help you work smarter, save time, and achieve more.</p>
              <ul className="ss-pills">
                {[[Zap, "Work Smarter"], [Clock, "Save Time"], [TrendingUp, "Boost Productivity"]].map(([I, t]) => { const Icon = I as typeof Zap; return <li key={t as string}><Icon aria-hidden="true" />{t as string}</li>; })}
              </ul>
              <div className="ss-ctas">
                <a href="#contact" className="ss-btn ss-btn-green">Enroll Now <ArrowRight aria-hidden="true" /></a>
                <a href="#courses" className="ss-btn ss-btn-outline">Explore Courses</a>
              </div>
              <p className="ss-note">Beginner-Friendly • Hands-On Learning • Real-World Skills</p>
            </div>
            <div className="ss-hero-visual ss-reveal">
              <img src={heroImg} width={1200} height={1008} alt="Instructor in a navy blazer at a bright desk with a laptop showing an Excel-style dashboard" fetchPriority="high" />
              <div className="ss-float ss-float-a"><BarChart3 aria-hidden="true" /><div><b>Sales Dashboard</b><span className="ss-bars"><i /><i /><i /><i /><i /></span></div></div>
              <div className="ss-float ss-float-b"><Sparkles aria-hidden="true" /><div><b>AI Assistant</b><small>“Summarize this report…”</small></div></div>
              <div className="ss-float ss-float-c"><code>=SUM(B2:B9)</code></div>
            </div>
          </div>
        </section>

        <section id="courses" className="ss-section">
          <div className="ss-container">
            <header className="ss-head ss-reveal"><p className="ss-eyebrow">Courses</p><h2 className="ss-h2">Explore Our Courses</h2><p>Develop practical digital skills through hands-on learning and real-world examples.</p></header>
            <div className="ss-grid-3">
              {COURSES.map(({ id, tone, Icon, title, text, topics, cta, value }) => (
                <article key={id} id={`course-${id}`} className={`ss-card ss-course tone-${tone} ss-reveal`}>
                  <span className="ss-icon"><Icon aria-hidden="true" /></span>
                  <h3>{title}</h3><p>{text}</p>
                  <ul>{topics.map((t) => <li key={t}><Check aria-hidden="true" />{t}</li>)}</ul>
                  <button type="button" className="ss-btn ss-btn-tone" onClick={() => pick(value)}>{cta} <ArrowRight aria-hidden="true" /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="ss-section ss-soft">
          <div className="ss-container">
            <header className="ss-head ss-reveal"><p className="ss-eyebrow">Why Choose SkillSpark Coach?</p><h2 className="ss-h2">Learn Skills That Make a Difference</h2></header>
            <div className="ss-grid-4">
              {BENEFITS.map(([t, d]) => <article key={t} className="ss-card ss-benefit ss-reveal"><CheckCircle2 aria-hidden="true" /><h3>{t}</h3><p>{d}</p></article>)}
            </div>
          </div>
        </section>

        <section className="ss-section" aria-labelledby="outcomes">
          <div className="ss-container">
            <header className="ss-head ss-reveal"><p className="ss-eyebrow">Learning Outcomes</p><h2 id="outcomes" className="ss-h2">Build Skills. Improve Productivity. Grow Your Career.</h2></header>
            <div className="ss-outcomes">
              <Outcome tag="Excel Proficiency" tone="green" text="Organize information, perform calculations, analyze datasets, and build insightful dashboards." visual={<DashVisual />} />
              <Outcome tag="AI Productivity" tone="purple" text="Use AI tools to brainstorm, summarize information, assist with routine tasks, and streamline workflows." visual={<AiVisual />} flip />
              <Outcome tag="Presentation Excellence" tone="orange" text="Create engaging slides, communicate ideas clearly, and deliver professional presentations." visual={<SlideVisual />} />
            </div>
          </div>
        </section>

        <section id="about" className="ss-section ss-soft">
          <div className="ss-container ss-split">
            <img className="ss-about-img ss-reveal" src={aboutImg} width={1200} height={912} loading="lazy" alt="Adult learners working together on laptops and reviewing a chart" />
            <div className="ss-reveal">
              <p className="ss-eyebrow">About SkillSpark Coach</p>
              <h2 className="ss-h2">Our Mission Is to Help You Grow</h2>
              <p className="ss-lead">SkillSpark Coach focuses on practical digital skills that help learners improve productivity and build confidence with modern workplace tools.</p>
              <p className="ss-body">Our learning philosophy is simple:</p>
              <ol className="ss-steps"><li>Learn new concepts.</li><li>Practice through hands-on activities.</li><li>Apply your knowledge to real-world tasks.</li><li>Grow your skills and opportunities.</li></ol>
              <div className="ss-principles">{["Learn", "Practice", "Grow"].map((p, i) => <div key={p}><span>0{i + 1}</span>{p}</div>)}</div>
            </div>
          </div>
        </section>

        <section className="ss-cta" aria-labelledby="cta-h">
          <div className="ss-cta-deco" aria-hidden="true"><BarChart3 /><BrainCircuit /><Presentation /></div>
          <div className="ss-container ss-cta-inner ss-reveal">
            <h2 id="cta-h">Ready to Master Excel with AI?</h2>
            <p>Start building practical skills in Excel, AI productivity, and professional presentations.</p>
            <div className="ss-ctas"><a href="#contact" className="ss-btn ss-btn-green">Start Learning Today <ArrowRight aria-hidden="true" /></a><a href="#courses" className="ss-link-light">Explore Courses</a></div>
            <p className="ss-slogan">Better Skills, Bigger Opportunities.</p>
          </div>
        </section>

        <section id="contact" className="ss-section">
          <div className="ss-container ss-split ss-contact">
            <div className="ss-reveal">
              <p className="ss-eyebrow">Contact & Enrollment</p>
              <h2 className="ss-h2">Start Your Learning Journey</h2>
              <p className="ss-lead">Tell us which course interests you and we'll follow up with details.</p>
              <ul className="ss-contact-list">
                <li><Mail aria-hidden="true" />[your-email@example.com]</li>
                <li><Phone aria-hidden="true" />[+00 00000 00000]</li>
                <li><MapPin aria-hidden="true" />[Your city, Country]</li>
              </ul>
            </div>
            <EnrollForm course={course} setCourse={setCourse} />
          </div>
        </section>
      </main>

      <footer className="ss-footer">
        <div className="ss-container ss-foot-grid">
          <div><Logo light /><p className="ss-foot-tag">Learn • Practice • Grow</p><p>Practical training in Excel, AI productivity tools, and presentations — skills for a brighter future.</p></div>
          <div><h3>Quick Links</h3><ul>{NAV.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul></div>
          <div><h3>Courses</h3><ul>{COURSES.map((c) => <li key={c.id}><a href={`#course-${c.id}`}>{c.title}</a></li>)}</ul></div>
          <div><h3>Contact</h3><ul><li>[your-email@example.com]</li><li>[+00 00000 00000]</li></ul>
            <div className="ss-social">{[[Facebook, "Facebook"], [Instagram, "Instagram"], [Linkedin, "LinkedIn"], [Youtube, "YouTube"]].map(([I, l]) => { const Icon = I as typeof Mail; return <a key={l as string} href="#contact" aria-label={`${l} (placeholder link)`}><Icon aria-hidden="true" /></a>; })}</div>
          </div>
        </div>
        <p className="ss-container ss-copy">© 2026 SkillSpark Coach. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Outcome({ tag, text, tone, visual, flip }: { tag: string; text: string; tone: string; visual: React.ReactNode; flip?: boolean }) {
  return (
    <article className={`ss-outcome tone-${tone} ${flip ? "is-flip" : ""} ss-reveal`}>
      <div><span className="ss-icon"><Laptop aria-hidden="true" /></span><h3>{tag}</h3><p>{text}</p></div>
      <div className="ss-visual" aria-hidden="true">{visual}</div>
    </article>
  );
}

const DashVisual = () => (
  <div className="v-dash"><div className="v-kpis">{["Revenue", "Orders", "Growth"].map((k) => <div key={k}><small>{k}</small><b /></div>)}</div>
    <div className="v-chart">{[40, 65, 50, 80, 70, 92, 60].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></div>
);
const AiVisual = () => (
  <div className="v-ai"><div className="v-msg me">Summarize last quarter's sales.</div><div className="v-msg bot"><Sparkles /> Sales grew steadily, led by the North region…</div>
    <svg viewBox="0 0 200 60" className="v-net">{[[20, 30], [70, 12], [70, 48], [130, 20], [130, 44], [180, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}<path d="M20 30L70 12L130 20L180 30M20 30L70 48L130 44L180 30M70 12L130 44M70 48L130 20" /></svg></div>
);
const SlideVisual = () => (
  <div className="v-laptop"><div className="v-screen"><b>Quarterly Review</b><span /><span /><div className="v-slide-row"><i /><i /><i /></div></div><div className="v-base" /></div>
);

type Errors = Partial<Record<"name" | "email" | "phone" | "course" | "message", string>>;

function EnrollForm({ course, setCourse }: { course: string; setCourse: (v: string) => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "demo">("idle");
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (v("website") || Date.now() - startedAt < 1500) return; // honeypot + timing spam check
    const next: Errors = {};
    if (v("name").length < 2) next.name = "Please enter your full name.";
    else if (v("name").length > 100) next.name = "Name must be under 100 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) next.email = "Please enter a valid email address.";
    if (v("phone") && !/^\+?[\d\s()-]{7,20}$/.test(v("phone"))) next.phone = "Please enter a valid phone number.";
    if (!OPTIONS.includes(v("course"))) next.course = "Please choose a course of interest.";
    if (v("message").length > 1000) next.message = "Message must be under 1000 characters.";
    setErrors(next);
    if (Object.keys(next).length) { (e.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus(); return; }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));
    // No backend connected: nothing is sent or stored. Connect a backend here to deliver inquiries.
    setStatus("demo");
  };

  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="ss-err" role="alert">{errors[k]}</p>;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form className="ss-card ss-form ss-reveal" noValidate onSubmit={onSubmit}>
      <p className="ss-demo-note" role="note">Demo form: inquiries are not sent or stored yet. A backend must be connected before this form can deliver enrollments.</p>
      <label>Full Name *<input name="name" autoComplete="name" maxLength={100} {...aria("name")} /></label>{err("name")}
      <label>Email Address *<input name="email" type="email" autoComplete="email" maxLength={255} {...aria("email")} /></label>{err("email")}
      <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={20} {...aria("phone")} /></label>{err("phone")}
      <label>Course of Interest *<select name="course" value={course} onChange={(e) => setCourse(e.target.value)} {...aria("course")}><option value="">Select a course</option>{OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></label>{err("course")}
      <label>Message<textarea name="message" rows={4} maxLength={1000} {...aria("message")} /></label>{err("message")}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="ss-hp" aria-hidden="true" />
      <button type="submit" className="ss-btn ss-btn-green" disabled={status === "loading"}>{status === "loading" ? <><Loader2 className="ss-spin" aria-hidden="true" /> Checking…</> : "Send Enrollment Inquiry"}</button>
      {status === "demo" && <p className="ss-demo-result" role="status">Your details look good — but this is a demo, so the inquiry was <strong>not</strong> sent. Connect a backend to receive enrollments.</p>}
    </form>
  );
}
