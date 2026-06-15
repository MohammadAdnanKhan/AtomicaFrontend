import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Plane,
  HeartPulse,
  Globe2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const whatWeDo = [
  { title: "Online Tutoring", icon: BookOpen, desc: "Personalised academic coaching across subjects for school and college students." },
  { title: "IT & Project Training", icon: Code2, desc: "Industry-aligned, project-driven programs taught by working professionals." },
  { title: "Study Abroad — MBBS & Management", icon: GraduationCap, desc: "End-to-end guidance for top universities and specialised global courses." },
  { title: "Postgraduate Admissions, Germany", icon: Plane, desc: "Admissions consulting for public and private universities in Germany." },
  { title: "Healthcare Job Placement", icon: HeartPulse, desc: "Placement support for healthcare professionals targeting global roles." },
  { title: "International Career Consulting", icon: Globe2, desc: "Career strategy across IT, healthcare and beyond, in multiple countries." },
];

const stats = [
  { value: "10+", label: "Countries" },
  { value: "500+", label: "Careers launched" },
  { value: "15+", label: "Expert mentors" },
  { value: "100%", label: "Personalised" },
];

function OrbitRings({ className = "" }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1">
        <ellipse cx="200" cy="200" rx="180" ry="70" opacity="0.5" />
        <ellipse cx="200" cy="200" rx="180" ry="70" opacity="0.5" transform="rotate(60 200 200)" />
        <ellipse cx="200" cy="200" rx="180" ry="70" opacity="0.5" transform="rotate(120 200 200)" />
        <circle cx="200" cy="200" rx="120" r="120" opacity="0.3" />
      </g>
      <circle cx="380" cy="200" r="4" fill="currentColor" />
      <circle cx="110" cy="92" r="3.5" fill="currentColor" opacity="0.7" />
      <circle cx="150" cy="320" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const orbARef = useRef(null);
  const orbBRef = useRef(null);
  const patternRef = useRef(null);
  const imgWrapRef = useRef(null);

  const [transforms, setTransforms] = useState({
    imgTilt: "rotateX(0deg) rotateY(0deg) translateZ(0px)",
    orbATrans: "translate3d(0px,0px,0px)",
    orbBTrans: "translate3d(0px,0px,0px)",
    patternTrans: "translate3d(0px,0px,0px)",
  });

  useEffect(() => {
    const imgWrap = imgWrapRef.current;
    let raf = null;

    function handleMove(e) {
      if (!imgWrap) return;
      const rect = imgWrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const nx = dx / rect.width;
      const ny = dy / rect.height;

      const rotY = nx * -6;
      const rotX = ny * 6;
      const translateZ = Math.max(0, 8 - Math.abs(nx) * 6);

      const orbAX = nx * -16;
      const orbAY = ny * -12;
      const orbBX = nx * 12;
      const orbBY = ny * 9;
      const patX = nx * -6;
      const patY = ny * -6;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTransforms({
          imgTilt: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px)`,
          orbATrans: `translate3d(${orbAX}px, ${orbAY}px, 0)`,
          orbBTrans: `translate3d(${orbBX}px, ${orbBY}px, 0)`,
          patternTrans: `translate3d(${patX}px, ${patY}px, 0)`,
        });
      });
    }

    function handleLeave() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setTransforms({
          imgTilt: `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
          orbATrans: `translate3d(0px,0px,0px)`,
          orbBTrans: `translate3d(0px,0px,0px)`,
          patternTrans: `translate3d(0px,0px,0px)`,
        })
      );
    }

    let latestScroll = 0;
    let rafScroll = null;
    function onScroll() {
      latestScroll = window.scrollY || window.pageYOffset;
      if (rafScroll) cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        const s = Math.max(0, latestScroll);
        const orbAScrollY = s * -0.02;
        const orbBScrollY = s * -0.015;
        const patScrollY = s * -0.01;
        setTransforms((prev) => ({
          ...prev,
          orbATrans: `translate3d(${extractPx(prev.orbATrans, 0)}, ${orbAScrollY}px, 0)`,
          orbBTrans: `translate3d(${extractPx(prev.orbBTrans, 0)}, ${orbBScrollY}px, 0)`,
          patternTrans: `translate3d(${extractPx(prev.patternTrans, 0)}, ${patScrollY}px, 0)`,
        }));
      });
    }

    function extractPx(translateStr = "", fallback = 0) {
      const match = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(translateStr);
      if (!match) return fallback;
      return parseFloat(match[1]);
    }

    const hero = heroRef.current;
    hero?.addEventListener("mousemove", handleMove);
    hero?.addEventListener("mouseleave", handleLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      hero?.removeEventListener("mousemove", handleMove);
      hero?.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (rafScroll) cancelAnimationFrame(rafScroll);
    };
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 overflow-hidden">
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="grain relative min-h-[92vh] flex items-center bg-wash-light dark:bg-wash-dark"
        aria-labelledby="hero-title"
      >
        {/* faint parallax rule pattern */}
        <div
          ref={patternRef}
          className="absolute inset-0 pointer-events-none opacity-[0.5]"
          style={{ transform: transforms.patternTrans }}
        >
          <div className="absolute inset-y-0 left-[8%] w-px bg-light-secondary/10 dark:bg-white/5" />
          <div className="absolute inset-y-0 right-[8%] w-px bg-light-secondary/10 dark:bg-white/5" />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-7"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Atomica Career Academy
            </motion.span>

            <motion.h1
              id="hero-title"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="font-heading font-semibold text-[2.7rem] sm:text-6xl xl:text-[4.6rem] leading-[1.02] tracking-[-0.02em]"
            >
              Shaping ambitions,
              <br />
              launching{" "}
              <span className="em-serif">global</span> careers.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-light-secondary dark:text-dark-secondary max-w-md leading-relaxed"
            >
              We guide students and professionals toward opportunities worldwide —
              through mentoring, skill-building, and study-abroad and placement
              pathways built around <span className="underline-accent">you</span>.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-light-surface dark:text-dark-background bg-light-primary dark:bg-dark-primary hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore services
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-light-secondary/30 dark:border-white/15 hover:border-light-primary dark:hover:border-dark-primary hover:text-light-primary dark:hover:text-dark-primary transition-all duration-300"
              >
                Browse careers
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative flex items-center justify-center"
          >
            {/* orbit motif (parallax + slow spin) */}
            <div
              ref={orbARef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none text-light-primary/40 dark:text-dark-primary/40"
              style={{ transform: transforms.orbATrans }}
            >
              <OrbitRings className="w-[125%] h-[125%] animate-spinSlow" />
            </div>
            {/* soft ambient glow (parallax) */}
            <div
              ref={orbBRef}
              className="absolute w-72 h-72 rounded-full blur-3xl bg-light-accent/15 dark:bg-dark-accent/15 pointer-events-none"
              style={{ transform: transforms.orbBTrans }}
            />

            <div
              ref={imgWrapRef}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                transform: transforms.imgTilt,
                transition: "transform 240ms cubic-bezier(.2,.9,.2,1)",
              }}
            >
              {/* offset accent block behind */}
              <span
                className="absolute -bottom-4 -right-4 w-full h-full rounded-[1.6rem] border border-light-primary/40 dark:border-dark-primary/40"
                style={{ transform: "translateZ(-20px)" }}
              />
              <img
                src="/logo2.jpg"
                alt="Atomica"
                className="relative block w-[18rem] sm:w-[22rem] h-auto rounded-[1.6rem] bg-light-surface dark:bg-dark-surface p-3 shadow-card"
                style={{ transform: "translateZ(28px)" }}
              />
              <div
                className="absolute -top-4 left-5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-eyebrow bg-light-primary dark:bg-dark-primary text-light-surface dark:text-dark-background shadow-soft"
                style={{ transform: "translateZ(46px)" }}
              >
                Global Reach
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== STATS BAND ===================== */}
      <section className="border-y hairline">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 hairline">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="px-6 py-9 text-center md:text-left"
            >
              <div className="font-heading text-4xl md:text-5xl font-semibold text-light-primary dark:text-dark-primary">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-light-secondary dark:text-dark-secondary">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <span className="absolute -top-4 -left-4 w-28 h-28 border-t border-l border-light-accent/60 dark:border-dark-accent/60 rounded-tl-3xl" />
          <div className="overflow-hidden rounded-[1.4rem] shadow-card">
            <img src="/img1.jpg" alt="Mentoring" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 order-1 md:order-2"
        >
          <span className="eyebrow">Our mission</span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.01em]">
            Guiding young minds toward a <span className="em-serif">global</span> future.
          </h2>
          <p className="text-lg text-light-secondary dark:text-dark-secondary leading-relaxed">
            From tutoring to international job placements, we are committed to
            personalised, future-ready solutions that drive academic excellence,
            career growth, and global exposure.
          </p>
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 font-semibold text-light-primary dark:text-dark-primary group"
          >
            More about us
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* ===================== WHAT WE DO (indexed list) ===================== */}
      <section className="grain relative bg-light-surface dark:bg-dark-surface border-y hairline">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <span className="eyebrow">What we do</span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.01em]">
                Everything for your journey
              </h2>
            </div>
            <p className="text-light-secondary dark:text-dark-secondary max-w-xs md:text-right">
              Six focused practices, one personalised path abroad.
            </p>
          </div>

          <ul className="border-t hairline">
            {whatWeDo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="group border-b hairline"
                >
                  <Link
                    to="/services"
                    className="flex items-center gap-5 md:gap-8 py-7 transition-colors duration-300 hover:bg-light-primary/[0.04] dark:hover:bg-dark-primary/[0.06] -mx-4 px-4 rounded-xl"
                  >
                    <span className="font-heading text-2xl md:text-3xl font-semibold text-light-secondary/50 dark:text-dark-secondary/50 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors w-12 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full border border-light-secondary/20 dark:border-white/10 text-light-primary dark:text-dark-primary group-hover:border-light-primary dark:group-hover:border-dark-primary transition-colors">
                      <Icon size={22} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-heading text-xl md:text-2xl font-medium leading-snug">
                        {item.title}
                      </span>
                      <span className="block text-sm md:text-base text-light-secondary dark:text-dark-secondary mt-1 leading-relaxed">
                        {item.desc}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={22}
                      className="shrink-0 text-light-secondary/50 dark:text-dark-secondary/50 group-hover:text-light-primary dark:group-hover:text-dark-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===================== WHY ATOMICA ===================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="eyebrow">Why Atomica</span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.01em]">
            Future-ready. <br />
            <span className="em-serif">Globally</span> connected.
          </h2>
          <p className="text-lg text-light-secondary dark:text-dark-secondary leading-relaxed">
            Our global approach ensures you're not just prepared for today, but for
            tomorrow's opportunities — anywhere in the world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="absolute -bottom-4 -right-4 w-28 h-28 border-b border-r border-light-accent/60 dark:border-dark-accent/60 rounded-br-3xl" />
          <div className="overflow-hidden rounded-[1.4rem] shadow-card">
            <img src="/img2.jpg" alt="Global careers" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="px-6 md:px-10 pb-24">
        <div className="grain relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-light-primary dark:bg-pine-800 text-light-surface dark:text-dark-text px-6 md:px-16 py-20 text-center">
          {/* orbit motif */}
          <div className="absolute -right-24 -top-24 text-white/10 dark:text-white/[0.06]">
            <OrbitRings className="w-[28rem] h-[28rem] animate-spinSlowRev" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-7">
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-light-surface/70 dark:text-dark-text/70">
              Start your journey
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-[1.08]">
              Your global journey starts here
            </h2>
            <p className="text-lg text-light-surface/85 dark:text-dark-text/80">
              Whether you're aiming for a top university or your dream job overseas,
              Atomica is with you, every step of the way.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold bg-light-surface text-light-primary dark:bg-dark-text dark:text-dark-background hover:-translate-y-0.5 transition-all duration-300 shadow-card"
              >
                Get in touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
