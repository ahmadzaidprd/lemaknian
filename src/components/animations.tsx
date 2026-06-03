"use client";

// ─── Animation hooks & primitives ─────────────────────────
// Reusable animation building blocks used across all sections.
// Includes: useReveal, useInView, useCountUp, useMagnet, useTilt,
// useParallax, plus drop-in wrappers Reveal / TiltCard /
// MagnetButton / SplitText / CountStat.

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";

/* ── useReveal ── adds .visible when in viewport */
export function useReveal(opts: { once?: boolean; threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          if (opts.once !== false) io.unobserve(el);
        } else if (opts.once === false) {
          el.classList.remove("visible");
        }
      });
    }, { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [opts.once, opts.threshold, opts.rootMargin]);
  return ref;
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}
export function Reveal({ children, delay = 0, className = "", as: Tag = "div", style }: RevealProps) {
  const ref = useReveal();
  return (
    <Tag ref={ref as any} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* ── useInView ── boolean trigger */
export function useInView<T extends HTMLElement = HTMLDivElement>(opts: { once?: boolean; threshold?: number } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          if (opts.once !== false) io.unobserve(el);
        } else if (opts.once === false) {
          setInView(false);
        }
      });
    }, { threshold: opts.threshold ?? 0.2 });
    io.observe(el);
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/* ── useCountUp ── animated integer */
export function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let startTime: number | null = null;
    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ── useMagnet ── cursor-following hover */
export function useMagnet<T extends HTMLElement = HTMLDivElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = `translate(0, 0)`;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/* ── useTilt ── 3D card tilt + shine */
export function useTilt(max = 10) {
  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const wrap = outer.current;
    const card = inner.current;
    if (!wrap || !card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max * 2;
      const ry = (x - 0.5) * max * 2;
      wrap.style.setProperty("--mx", `${x * 100}%`);
      wrap.style.setProperty("--my", `${y * 100}%`);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      card.style.transform = `rotateX(0) rotateY(0)`;
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return [outer, inner] as const;
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}
export function TiltCard({ children, className = "", max = 10, style }: TiltCardProps) {
  const [outer, inner] = useTilt(max);
  return (
    <div ref={outer} className={`tilt ${className}`} style={{ position: "relative", ...style }}>
      <div ref={inner} className="tilt-inner" style={{ borderRadius: "inherit" }}>
        {children}
      </div>
      <div className="tilt-shine" />
    </div>
  );
}

/* ── SplitText ── word/char reveal on viewport entry */
interface SplitTextProps {
  text: string;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
}
// Disederhanakan: render teks polos (TANPA memecah per-huruf/kata & tanpa
// IntersectionObserver). Animasi per-huruf dulu membuat ratusan <span> +
// observer di tiap judul \u2192 beban main-thread besar di mobile (pemicu NO_LCP).
// Animasi masuk yang halus tetap didapat dari wrapper <Reveal> di sekelilingnya.
export function SplitText({ text, className = "", style }: SplitTextProps) {
  return (
    <span className={`split-line ${className}`} style={style}>
      {text}
    </span>
  );
}

/* ── useParallax ── translateY based on scroll */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/* ── MagnetButton ── cursor magnet wrapper */
type MagnetButtonProps<E extends ElementType> = {
  as?: E;
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "children" | "className">;

export function MagnetButton<E extends ElementType = "button">({
  as, children, className = "", strength = 0.4, ...rest
}: MagnetButtonProps<E>) {
  const ref = useMagnet<HTMLElement>(strength);
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag ref={ref as any} className={`magnet ${className}`} {...(rest as any)}>
      {children}
    </Tag>
  );
}

/* ── CountStat ── animated number + progress bar */
interface CountStatProps {
  num: number;
  suffix?: string;
  label: string;
  barTo?: number;
  delay?: number;
  accent?: string;
}
export function CountStat({ num, suffix = "", label, barTo = 80, delay = 0, accent = "var(--accent)" }: CountStatProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);
  const count = useCountUp(num, 1800, started);
  return (
    <div ref={ref}>
      <div className="font-display" style={{ color: accent, fontSize: 36, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>
        {count.toLocaleString("id-ID")}{suffix}
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 8, marginBottom: 10 }}>{label}</div>
      <div style={{ height: 3, background: "var(--border-light)", borderRadius: 999, overflow: "hidden" }}>
        <div className="bar-fill" style={{ width: started ? `${barTo}%` : "0%" }} />
      </div>
    </div>
  );
}

/* ── ThemeToggle helpers ── */
export function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    return (localStorage.getItem("lemaknian-theme") as "dark" | "light") || "dark";
  } catch { return "dark"; }
}
export function setTheme(theme: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("lemaknian-theme", theme); } catch {}
}
export function useTheme() {
  const [theme, setT] = useState<"dark" | "light">("dark");
  useEffect(() => { setT(getInitialTheme()); }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setT(next);
    setTheme(next);
  };
  return { theme, toggle, setTheme: (t: "dark" | "light") => { setT(t); setTheme(t); } };
}
