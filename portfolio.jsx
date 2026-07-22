import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOSPHOR = "#39FF14";
const AMBER = "#FFB627";


const _0x7a = (a, k) => a.map((x, i) => String.fromCharCode(x ^ k.charCodeAt(i % k.length))).join("");
const FORMSPREE_ID = _0x7a([5, 13, 4, 0, 21, 3, 9, 4], "hacker");

function TerminalModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [logs, setLogs] = useState(["SYSTEM READY", "gowin297@gmail.com:~$ mail --subject 'Contact_Request'"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const steps = [
    { key: "name", label: "Input sender name : > " },
    { key: "email", label: "Input sender email: > " },
    { key: "message", label: "Input message body : > " },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setLogs([...logs, `${steps[step].label} ${formData[steps[step].key]}`, "------------------"]);
      setStep(step + 1);
    } else {
      setLogs([...logs, `${steps[step].label} ${formData[steps[step].key]}`, "[PROCESS] Encrypting package...", "[PROCESS] Contacting remote server..."]);
      setIsSubmitting(true);

      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setLogs(prev => [...prev, "[SUCCESS] Package delivered.", "admin@govin002:~$ logout"]);
          setTimeout(() => {
            onClose();
            setStep(0);
            setFormData({ name: "", email: "", message: "" });
            setLogs(["SYSTEM READY", "admin@govin002:~$ mail --subject 'Contact_Request'"]);
            setIsSubmitting(false);
          }, 2000);
        } else {
          throw new Error("Relay failed");
        }
      } catch (err) {
        setLogs(prev => [...prev, "[ERROR] Transmission failed. Retrying manually...", "Please use metricmuscle1@gmail.com"]);
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl border-2 bg-black shadow-[0_0_50px_#39FF1422]" style={{ borderColor: PHOSPHOR }}>
        <div className="flex justify-between items-center px-4 py-2 border-b-2" style={{ borderColor: PHOSPHOR, background: PHOSPHOR + "10" }}>
          <span className="font-mono text-xs font-bold" style={{ color: PHOSPHOR }}>SECURE_COMMUNICATION_TERMINAL_v1.0.4</span>
          <button onClick={onClose} className="hover:scale-110" style={{ color: PHOSPHOR }}>[X]</button>
        </div>
        <div className="p-6 font-mono text-sm min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-hide">
          {logs.map((log, i) => (
            <p key={i} className="mb-1" style={{ color: log.startsWith("[ERROR]") ? "#ff4444" : log.startsWith("[SUCCESS]") ? AMBER : PHOSPHOR }}>
              {log}
            </p>
          ))}
          {!isSubmitting && step < steps.length && (
            <form onSubmit={handleSubmit} className="mt-4">
              <span style={{ color: PHOSPHOR }}>{steps[step].label}</span>
              <input
                ref={inputRef}
                autoFocus
                className="bg-transparent outline-none border-b border-dashed flex-1 ml-2"
                style={{ borderColor: PHOSPHOR, color: "#fff", width: "calc(100% - 160px)" }}
                value={formData[steps[step].key]}
                onChange={e => setFormData({ ...formData, [steps[step].key]: e.target.value })}
                required
              />
              <span className="animate-pulse ml-1" style={{ color: PHOSPHOR }}>_</span>
            </form>
          )}
        </div>
        <div className="px-4 py-1 text-[10px] text-right opacity-30" style={{ color: PHOSPHOR }}>
          ENCRYPTION: AES-256 | STATUS: ENCRYPTED_TUNNEL_ACTIVE
        </div>
      </div>
    </div>
  );
}

function useTypewriter(text, speed = 45, start = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, start]);
  return { displayed, done };
}

function Cursor({ color = PHOSPHOR }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ color, opacity: on ? 1 : 0 }}>█</span>;
}

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`min-h-screen px-6 py-20 md:px-16 lg:px-32 ${className}`}>
      {children}
    </section>
  );
}

function Prompt({ text, color = PHOSPHOR }) {
  return (
    <span className="font-mono text-sm" style={{ color }}>
      {"> "}{text}
    </span>
  );
}

function Nav({ active }) {
  const links = ["home", "about", "skills", "projects", "contact"];
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 py-4 border-b"
      style={{ background: "rgba(6,6,6,0.85)", backdropFilter: "blur(12px) saturate(180%)", borderColor: "#39FF1420" }}>
      <span className="font-mono font-bold text-lg" style={{ color: PHOSPHOR, textShadow: `0 0 10px ${PHOSPHOR}aa` }}>
        <span style={{ color: AMBER }}>./</span>govin002
      </span>
      <ul className="hidden md:flex gap-6">
        {links.map(l => (
          <li key={l}>
            <button onClick={() => scroll(l)}
              className="font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-100"
              style={{
                color: active === l ? PHOSPHOR : "#777",
                opacity: active === l ? 1 : 0.6,
                textShadow: active === l ? `0 0 12px ${PHOSPHOR}` : "none"
              }}>
              {l}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex md:hidden gap-2">
        {links.map(l => (
          <button key={l} onClick={() => scroll(l)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: active === l ? PHOSPHOR : "#444", boxShadow: active === l ? `0 0 8px ${PHOSPHOR}` : "none" }} />
        ))}
      </div>
    </nav>
  );
}

function GlitchText({ children, color = PHOSPHOR, className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -z-10 animate-pulse opacity-50 translate-x-[2px] translate-y-[1px]" style={{ color: AMBER }}>{children}</span>
      <span className="absolute top-0 left-0 -z-10 animate-pulse opacity-50 -translate-x-[2px] -translate-y-[1px]" style={{ color: "#ff00ff" }}>{children}</span>
    </div>
  );
}

function Hero({ onHireMe }) {
  const [isNecHover, setIsNecHover] = useState(false);
  return (
    <Section id="home" className="flex flex-col justify-center items-center text-center">
      <div className="max-w-2xl">
        <Prompt text="$ whoami" color={AMBER} />
        <h1 className="font-mono text-4xl md:text-6xl font-bold mt-4 mb-6 tracking-tighter"
          style={{ color: PHOSPHOR, textShadow: `0 0 15px ${PHOSPHOR}33` }}>
          Govinda Prasad Shrestha
        </h1>
        <div className="font-mono text-sm md:text-base mb-10" style={{ color: "#888" }}>
          <a href="https://nec.gov.np/registration/96724" target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setIsNecHover(true)}
            onMouseLeave={() => setIsNecHover(false)}
            className="transition-all duration-300 group relative inline-block px-3 py-1 border border-amber-500/20"
            style={{
              color: isNecHover ? PHOSPHOR : AMBER,
              backgroundColor: isNecHover ? AMBER + "99" : "transparent",
              textDecoration: "none"
            }}>
            <span className="relative z-10 font-bold tracking-widest">COMPUTER ENGINEER</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-md" style={{ background: AMBER + "44" }} />
          </a>
          <span className="mx-3 opacity-30">|</span>
          <span className="opacity-70 italic">2024 Batch</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onHireMe} className="font-mono px-6 py-3 border text-sm transition-all duration-200 hover:scale-105"
            style={{ borderColor: PHOSPHOR, color: PHOSPHOR, boxShadow: `0 0 12px ${PHOSPHOR}44` }}>
            {">> HIRE ME"}
          </button>
          <a href={`${import.meta.env.BASE_URL}Govindaapshrestha.pdf`} download
            className="font-mono px-6 py-3 border text-sm transition-all duration-200 hover:scale-105"
            style={{ borderColor: AMBER, color: AMBER, boxShadow: `0 0 12px ${AMBER}44`, textDecoration: "none" }}>
            {"[↓] RESUME.PDF"}
          </a>
        </div>
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about">
      <Prompt text="cat about.txt" color={AMBER} />
      <div className="mt-6 border-l-2 pl-6 max-w-2xl" style={{ borderColor: PHOSPHOR }}>
        <h2 className="font-mono text-3xl font-bold mb-4" style={{ color: PHOSPHOR }}>About Me</h2>
        <div className="space-y-4 font-mono text-sm leading-relaxed" style={{ color: "#c8c8c0" }}>
          <p>
            Hey! I'm <span style={{ color: AMBER }}>Govinda Prasad Shrestha</span>, a
            Computer Engineer from the <span style={{ color: PHOSPHOR }}>2024 batch</span>. I graduated from
            <span style={{ color: AMBER }}> Shivaji University, Kolhapur,India </span> and am currently based in
            <span style={{ color: PHOSPHOR }}> Kathmandu, Nepal</span>.
          </p>
          <p>
            I love building things — from <span style={{ color: AMBER }}>architecting complex web applications</span> to
            writing <span style={{ color: PHOSPHOR }}>performance-driven utility tools</span> in TypeScript. I'm passionate
            about learning, shipping, and getting better every single day.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
          {[
            { label: "Batch", val: "2024" },
            { label: "Degree", val: "B.E. Computer" },
            { label: "Status", val: "Open to Work" },
            { label: "Location", val: "Kathmandu, NP" },
          ].map(({ label, val }) => (
            <div key={label} className="border p-3" style={{ borderColor: "#39FF1430" }}>
              <p className="font-mono text-xs" style={{ color: "#555" }}>{label}</p>
              <p className="font-mono text-sm font-bold mt-1" style={{ color: PHOSPHOR }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const TechIcon = ({ name, color }) => {
  const icons = {
    "HTML": <path d="M5 2l1.5 18 5.5 2 5.5-2 1.5-18h-14zm11 7h-7l.2 2h6.8l-.6 6-3.4 1.2-3.4-1.2-.2-2h2.2l.1 1 1.3.4 1.3-.4.2-2.4H7.2L6.6 5h10.8l-.4 4z" />,
    "CSS": <path d="M5 2l1.5 18 5.5 2 5.5-2 1.5-18h-14zm12.4 5l-.5 4.6h-6.2l-.2-2.1h4.1l.1-.9H8.6l.6-6h10l-.4 3.4z" />,
    "JavaScript": <path d="M3 3h18v18H3V3zm11.5 14.5c.5 0 .8-.2.8-.8v-2.5h-1.5v2c0 .3-.1.5-.4.5s-.4-.2-.4-.5v-4h-1.5v4c0 1 .8 1.8 1.8 1.8zm2.7 0c1 0 1.8-.8 1.8-1.8v-1.5c0-1-.8-1.8-1.8-1.8h-1v-1.5h1.5v-1.5H16c-1 0-1.8.8-1.8 1.8V14c0 1 .8 1.8 1.8 1.8h1v1.5H16v1.5h1.2z" />,
    "React": <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0-7c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />,
    "Tailwind": <path d="M12 7c-4 0-6 2-7 6 2-2 3.5-2.5 5-2.5 1.5 0 2.5.5 3.5 1.5 1 1 2 2.5 4 2.5 4 0 6-2 7-6-2 2-3.5 2.5-5 2.5-1.5 0-2.5-.5-3.5-1.5-1-1-2-2.5-4-2.5zM7 13c-4 0-6 2-7 6 2-2 3.5-2.5 5-2.5 1.5 0 2.5.5 3.5 1.5 1 1 2 2.5 4 2.5 4 0 6-2 7-6-2 2-3.5 2.5-5 2.5-1.5 0-2.5-.5-3.5-1.5-1-1-2-2.5-4-2.5z" />,
    "Node.js": <path d="M12 2L4.5 6.2v8.6L12 19l7.5-4.2V6.2L12 2zm5.5 12.3l-5.5 3.1-5.5-3.1V6.9l5.5-3.1 5.5 3.1v7.4z" />,
    "TypeScript": <path d="M1.5 1.5v21h21v-21h-21zm14.5 17.5c-1 0-1.8-.8-1.8-1.8v-1c0-1 .8-1.8 1.8-1.8h1v-1.5h-1.5v-1.5H16c1 0 1.8.8 1.8 1.8V14c0 1-.8 1.8-1.8 1.8h-1v1.5h1.5v1.5h-1.5zm-5.5 0c-1 0-1.8-.8-1.8-1.8v-4h-1.8v-1.8h5.4v1.8h-1.8v4.2c0 1-.8 1.6-1.8 1.6z" />,
    "Python": <path d="M12 2c-3.1 0-2.9 2.7-2.9 2.7l.1 2.8h5.7v.8H9.3l-4 1.1s-2.1.6-2.1 3.2.6 3.1.6 3.1l2.4 2.3s.9.3 1.2.3c.4 0 1.4-.4 1.4-.4v-3.2s0-3.1 3.1-3.1h3.6V8.2s.2-2.6-3.5-2.6h-2.8V2zm-2.1 1.7a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm7.2 5.1v3.2s0 3.1-3.1 3.1h-3.6v2.1s-.2 2.6 3.5 2.6h2.8c3.1 0 2.9-2.7 2.9-2.7l-.1-2.8H14v-.8h5.7l4-1.1s2.1-.6 2.1-3.2-.6-3.1-.6-3.1l-2.4-2.3s-.9-.3-1.2-.3c-.4 0-1.4.4-1.4.4zm-2.8 10.7a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" />,
    "C / C++": <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm4.5-9h-1.5v-1.5c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2s2-.9 2-2V13h1.5v2.5c0 2.1-1.7 3.8-3.8 3.8h-1c-2.1 0-3.8-1.7-3.8-3.8v-6c0-2.1 1.7-3.8 3.8-3.8h1c2.1 0 3.8 1.7 3.8 3.8V11z" />,
    "MySQL": <path d="M12 2c-5.5 0-10 1.8-10 4s4.5 4 10 4 10-1.8 10-4-4.5-4-10-4zm0 6c-4.4 0-8-1.3-8-2s3.6-2 8-2 8 1.3 8 2-3.6 2-8 2zm0 3c-5.5 0-10 1.8-10 4v2c0 2.2 4.5 4 10 4s10-1.8 10-4v-2c0-2.2-4.5-4-10-4zm8 6c0 .7-3.6 2-8 2s-8-1.3-8-2v-.8c1.3.8 4.4 1.3 8 1.3s6.7-.5 8-1.3v.8z" />,
    "Git": <path d="M22.6 11.4l-9.1-9.1c-.5-.5-1.3-.5-1.8 0l-1.9 1.9 2.5 2.5c.3-.1.6-.2.9-.2 1.3 0 2.4 1.1 2.4 2.4 0 .3-.1.6-.2.9l2.5 2.5c.3-.1.6-.2.9-.2 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4 0-.3.1-.6.2-.9l-2.4-2.4c-.3.1-.6.2-.9.2-1.3 0-2.4-1.1-2.4-2.4 0-.3.1-.6.2-.9l-2.5-2.5-4.3 4.3c-.5.5-.5 1.3 0 1.8l9.1 9.1c.5.5 1.3.5 1.8 0l9.1-9.1c.5-.5.5-1.3 0-1.8z" />,
    "GitHub": <path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2V24c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.7 18.6.3 12 .3z" />,
    "Linux": <path d="M12 2C7.6 2 4 5.6 4 10c0 1.8.6 3.4 1.6 4.8C4.6 16.2 3 18.5 3 21c0 .6.4 1 1 1h16c.6 0 1-.4 1-1 0-2.5-1.6-4.8-2.6-6.2 1-1.4 1.6-3 1.6-4.8 0-4.4-3.6-8-8-8zm0 18H6c0-1.7.9-3.2 2.2-4.1.6.8 1.5 1.3 2.5 1.5-.4.4-.7.9-.7 1.4 0 .6.4 1 1 1s1-.4 1-1c0-.5-.3-1-.7-1.4 1-.2 1.9-.7 2.5-1.5 1.3.9 2.2 2.4 2.2 4.1h-6z" />,
    "VS Code": <path d="M1.5 12c0-.5.2-1 .6-1.4L16 .4c.4-.4 1.1-.4 1.5 0l5.4 5.4c.4.4.4 1.1 0 1.5L14.7 12l8.2 4.7c.4.4.4 1.1 0 1.5l-5.4 5.4c-.4.4-1.1.4-1.5 0l-14-10.2c-.4-.4-.6-.9-.6-1.4zm14.5-9.2L3.8 12l12.2 9.2V2.8z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mb-2" style={{ color }}>
      {icons[name] || <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />}
    </svg>
  );
};

const techStack = [
  { name: "HTML", cat: "Frontend", color: "#E34F26" },
  { name: "CSS", cat: "Frontend", color: "#1572B6" },
  { name: "JavaScript", cat: "Frontend", color: "#F7DF1E" },
  { name: "React", cat: "Frontend", color: "#61DAFB" },
  { name: "Tailwind", cat: "Frontend", color: "#06B6D4" },
  { name: "Node.js", cat: "Backend", color: "#339933" },
  { name: "TypeScript", cat: "Backend", color: "#3178C6" },
  { name: "Python", cat: "Language", color: "#3776AB" },
  { name: "C / C++", cat: "Language", color: "#00599C" },
  { name: "MySQL", cat: "Database", color: "#4479A1" },
  { name: "Git", cat: "Tools", color: "#F05032" },
  { name: "GitHub", cat: "Tools", color: "#e8e8e0" },
  { name: "Linux", cat: "Tools", color: "#FCC624" },
  { name: "VS Code", cat: "Tools", color: "#007ACC" },
];

const cats = ["All", "Frontend", "Backend", "Language", "Database", "Tools"];

function TechCard({ name, color, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center gap-1 p-3 border transition-all duration-300"
      style={{
        borderColor: hovered ? color : "#39FF1440",
        background: hovered ? color + "15" : "#181818",
        boxShadow: hovered ? `0 0 20px ${color}33` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
        opacity: 1,
      }}>
      <TechIcon name={name} color={hovered ? color : "#aaa"} />
      <span className="font-mono text-[10px] text-center font-bold" style={{ color: hovered ? color : "#fff" }}>{name}</span>
    </div>
  );
}

function Skills() {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat === "All" ? techStack : techStack.filter(t => t.cat === activeCat);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 98%",
          toggleActions: "play none none none",
        },
        y: 15,
        stagger: 0.05,
        duration: 0.4,
        ease: "power1.out",
      });
    }
  }, [activeCat]);

  return (
    <Section id="skills">
      <Prompt text="ls -la skills/" color={AMBER} />
      <h2 className="font-mono text-3xl font-bold mt-4 mb-6" style={{ color: PHOSPHOR }}>Tech Stack</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map(c => (
          <button key={c} onClick={() => setActiveCat(c)}
            className="font-mono text-xs px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: activeCat === c ? PHOSPHOR : "#333",
              color: activeCat === c ? PHOSPHOR : "#666",
              background: activeCat === c ? PHOSPHOR + "18" : "transparent",
              boxShadow: activeCat === c ? `0 0 10px ${PHOSPHOR}33` : "none",
            }}>
            {activeCat === c ? "▶ " : ""}{c}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
        {filtered.map(t => (
          <TechCard key={t.name} {...t} visible={true} />
        ))}
      </div>

      <p className="font-mono text-xs mt-6" style={{ color: "#444" }}>
        // hover over a card to highlight
      </p>
    </Section>
  );
}

const projects = [
  {
    title: "Watch_dog",
    desc: "A professional utility designed to monitor and automatically restart critical applications on your computer.",
    tags: ["TypeScript", "Node.js", "Automation"],
    status: "COMPLETED",
    link: "https://github.com/govin002/Watch_dog",
  },
  {
    title: "SYNC_SSH",
    desc: "Open source tool for SSH synchronization, ensuring your configuration is consistent across environments.",
    tags: ["TypeScript", "SSH", "Sync"],
    status: "PROTOTYPE",
    link: "https://github.com/govin002/SYNC_SSH",
  },
  {
    title: "Inventory",
    desc: "A modern, user-friendly complete system for managing inventory operations and others data.",
    tags: ["React", "JavaScript", "UI/UX", "SQL Lite"],
    status: "COMPLETED",
    link: "https://https://github.com/govin002/Inventory",
  },
  {
    title: "Labro",
    desc: "A prototype for a laboratory management system focused on sample tracking and reporting.",
    tags: ["JavaScript", "Prototope", "LMS"],
    status: "PROTOTYPE",
    link: "https://github.com/govin002/Labro",
  },
];

function ProjectCard({ title, desc, tags, status, link }) {
  const statusColor = status === "LIVE" ? PHOSPHOR : status === "IN PROGRESS" ? AMBER : status === "PRACTICE" ? "#888" : "#aaa";
  const [hovered, setHovered] = useState(false);
  return (
    <a href={link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-2 p-5 block transition-all duration-300 group"
      style={{
        borderColor: hovered ? PHOSPHOR : "#39FF1450",
        background: "#181818",
        textDecoration: "none",
        boxShadow: hovered ? `0 0 30px ${PHOSPHOR}33` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
        opacity: 1,
      }}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-mono font-bold text-base" style={{ color: hovered ? PHOSPHOR : "#eee" }}>{title}</h3>
        <span className="font-mono text-[10px] px-2 py-1 border ml-2 shrink-0 uppercase tracking-tighter"
          style={{ color: statusColor, borderColor: statusColor + "60" }}>
          {status}
        </span>
      </div>
      <p className="font-mono text-[12px] leading-relaxed mb-4" style={{ color: hovered ? "#eee" : "#aaa" }}>{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <span key={t} className="font-mono text-[11px] px-2 py-0.5 border"
            style={{ borderColor: AMBER + "40", color: AMBER, background: AMBER + "10" }}>{t}</span>
        ))}
      </div>
      <p className="font-mono text-[11px] mt-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: PHOSPHOR }}>
        view_source() <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
      </p>
    </a>
  );
}

function Projects() {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current && listRef.current.children.length > 0) {
      gsap.from(listRef.current.children, {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 98%",
          toggleActions: "play none none none",
        },
        y: 15,
        stagger: 0.1,
        duration: 0.6,
        ease: "power1.out",
      });
    }
  }, []);

  return (
    <Section id="projects">
      <Prompt text="git log --oneline projects/" color={AMBER} />
      <h2 className="font-mono text-3xl font-bold mt-4 mb-8" style={{ color: PHOSPHOR }}>Projects</h2>
      <div ref={listRef} className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {projects.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
      <div className="text-center mt-10">
        <a href="https://github.com/govin002?tab=repositories" target="_blank" rel="noopener noreferrer"
          className="inline-block font-mono text-sm border px-5 py-2 transition-all hover:scale-105"
          style={{ borderColor: "#39FF1430", color: "#666", textDecoration: "none" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = PHOSPHOR; e.currentTarget.style.color = PHOSPHOR; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#39FF1430"; e.currentTarget.style.color = "#666"; }}>
          {">> view all repos on GitHub"}
        </a>
      </div>
    </Section>
  );
}

function Contact({ onOpenTerminal }) {
  return (
    <Section id="contact">
      <Prompt text="ping contact --verbose" color={AMBER} />
      <h2 className="font-mono text-3xl font-bold mt-4 mb-2" style={{ color: PHOSPHOR }}>Get In Touch</h2>
      <p className="font-mono text-sm mb-8" style={{ color: "#888" }}>
        Open to opportunities, collaborations, or just a nerdy conversation.
      </p>
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
        <div className="space-y-4">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "#555" }}>// DIRECT CHANNELS</p>
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
              label: "Email", value: "Launch Terminal",
              action: onOpenTerminal,
              color: PHOSPHOR
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
              label: "WhatsApp", value: "+977-9817448062", href: "https://wa.me/9779817448062", color: "#25D366"
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
              label: "LinkedIn", value: "in/govinda-prasad-shrestha", href: "https://www.linkedin.com/in/govinda-prasad-shrestha-4788041a5", color: "#0A66C2"
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
              label: "GitHub", value: "github.com/govin002", href: "https://github.com/govin002", color: "#e8e8e0"
            },
          ].map(({ icon, label, value, href, action, color }) => (
            <a key={label} href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
              onClick={action ? (e) => { e.preventDefault(); action(); } : undefined}
              className="flex items-center gap-4 border-2 p-4 transition-all duration-200 hover:scale-[1.02] block relative overflow-hidden group cursor-pointer"
              style={{ borderColor: "#39FF1440", textDecoration: "none", background: "#181818" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color + "80"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#39FF1440"}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: color }} />
              <div className="relative z-10" style={{ color }}>{icon}</div>
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-tighter" style={{ color: "#555" }}>{label}</p>
                <p className="font-mono text-sm font-bold" style={{ color }}>{value}</p>
              </div>
            </a>
          ))}
          <a href={`${import.meta.env.BASE_URL}Govindaapshrestha.pdf`} download
            className="flex items-center gap-4 border-2 p-4 transition-all duration-200 hover:scale-[1.02] block relative overflow-hidden group"
            style={{ borderColor: AMBER + "40", textDecoration: "none", background: "#181818" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: AMBER }} />
            <div className="relative z-10" style={{ color: AMBER }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            </div>
            <div className="relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-tighter" style={{ color: "#555" }}>Resume</p>
              <p className="font-mono text-sm" style={{ color: AMBER }}>Download CV / Resume</p>
            </div>
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t px-6 md:px-16 lg:px-32 py-8" style={{ borderColor: "#39FF1430" }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-mono text-xs" style={{ color: "#888" }}>
          © {new Date().getFullYear()} Govinda Prasad Shrestha
        </p>
        <p className="font-mono text-xs" style={{ color: "#777" }}>
          <span style={{ color: PHOSPHOR }}>status:</span> <span style={{ color: "#fff" }}>open_to_work</span> <Cursor color={PHOSPHOR} />
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#060606] text-[#e8e8e0] min-h-screen relative overflow-x-hidden selection:bg-[#39FF1433] selection:text-[#39FF14]">
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes crt-flicker {
          0% { opacity: 0.98; }
          5% { opacity: 0.95; }
          10% { opacity: 0.98; }
          15% { opacity: 0.9; }
          20% { opacity: 0.98; }
          100% { opacity: 1; }
        }
        .crt-bg {
          animation: crt-flicker 0.15s infinite;
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 50;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 3px, 3px 100%;
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #060606;
        }
        ::-webkit-scrollbar-thumb {
          background: #39FF1440;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #39FF14;
        }
      `}</style>
      <div className="crt-bg" />
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <div className="pointer-events-none fixed inset-0 z-40"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
      <Nav active={active} />
      <main className="pt-16 relative z-10">
        <Hero onHireMe={() => setTerminalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Contact onOpenTerminal={() => setTerminalOpen(true)} />
      </main>
      <Footer />
    </div>
  );
}
