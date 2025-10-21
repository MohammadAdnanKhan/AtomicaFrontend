import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    const orbA = orbARef.current;
    const orbB = orbBRef.current;
    const pattern = patternRef.current;
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

      const rotY = nx * -6; // degrees
      const rotX = ny * 6; // degrees
      const translateZ = Math.max(0, 8 - Math.abs(nx) * 6);

      const orbAX = nx * -14;
      const orbAY = ny * -10;
      const orbBX = nx * 10;
      const orbBY = ny * 8;

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
      const match = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\)/.exec(
        translateStr
      );
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

  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 font-body">
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div
          ref={patternRef}
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ transform: transforms.patternTrans }}
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1.2" cy="1.2" r="1.2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" className="text-light-primary dark:text-dark-primary/30" />
          </svg>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-light-gradient to-light-background dark:from-dark-gradient dark:to-dark-background animate-gradientShift" />

        <div
          ref={orbARef}
          aria-hidden
          className="absolute -left-28 -top-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,200,120,0.24), rgba(255,120,60,0.06))",
            transform: transforms.orbATrans,
          }}
        />
        <div
          ref={orbBRef}
          aria-hidden
          className="absolute right-6 bottom-6 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 40%, rgba(80,150,255,0.18), rgba(20,60,120,0.04))",
            transform: transforms.orbBTrans,
          }}
        />

        <div className="container max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              <motion.h1
                id="hero-title"
                className="text-5xl md:text-6xl font-heading font-bold text-light-primary dark:text-dark-primary leading-tight"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
              >
                Shaping Ambitions.
                <br />
                Launching Global Careers.
              </motion.h1>

              <motion.p className="text-lg md:text-xl text-light-secondary dark:text-dark-secondary max-w-xl" variants={fadeUp}>
                At Atomica Career Academy, we empower students and professionals to unlock global opportunities through guidance, skill-building, and expert mentoring.
              </motion.p>

              <motion.div variants={fadeUp}>
                <a
                  href="#services"
                  className="inline-block mt-4 px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-light-background dark:text-dark-background shadow-xl transform transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  Get Started
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              ref={imgWrapRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="flex items-center justify-center"
            >
              <div
                className="relative rounded-3xl p-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/8 dark:border-black/20 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.6)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: transforms.imgTilt,
                  transition: "transform 220ms cubic-bezier(.2,.9,.2,1)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none -z-10" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }} />

                <img
                  src="/logo2.png"
                  alt="Atomica Logo"
                  className="w-full max-w-xs md:max-w-sm block rounded-xl mx-auto"
                  style={{ transform: "translateZ(24px)" }}
                />

                <div
                  className="absolute -top-6 right-6 px-3 py-2 rounded-lg text-sm font-medium shadow-md"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transform: "translateZ(28px)",
                  }}
                >
                  Career Support
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full h-12 -mt-6 md:-mt-12 transform rotate-[178deg] origin-top-left">
        <svg viewBox="0 0 1200 28" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 0 L1200 0 L1200 28 L0 0 Z" fill="currentColor" className="text-light-surface dark:text-dark-surface" />
        </svg>
      </div>

      <section id="services" className="py-20 md:py-28 px-6 md:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <h2 className="text-4xl font-heading font-bold text-light-primary dark:text-dark-primary">Our Mission</h2>
          <p className="text-lg text-light-secondary dark:text-dark-secondary leading-relaxed">
            We guide young minds toward academic excellence, career growth, and global exposure. From tutoring to international job placements, we are committed to personalized and future-ready solutions.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-[1.01]">
            <img src="/img1.jpg" alt="Mission" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -left-16 -top-10 w-56 h-56 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(250,200,160,0.18), rgba(250,120,50,0.02))", zIndex: -1 }} />
        </motion.div>
      </section>

<section className="bg-light-surface dark:bg-dark-surface py-24 px-6 md:px-16">
  <div className="max-w-7xl mx-auto">
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-4xl font-heading font-bold mb-10 text-center text-light-primary dark:text-dark-primary"
    >
      What We Do
    </motion.h3>

    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {[
        "Online Tutoring",
        "IT & Project Training",
        "Study Abroad (MBBS, Management)",
        "Postgraduate Admissions (Germany)",
        "Healthcare Job Placement",
        "International Career Consulting",
      ].map((service, idx) => (
        <motion.article
          key={service}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.6 }}
          className="relative rounded-2xl p-6 backdrop-blur-md bg-white/40 dark:bg-gray-900/40 border border-white/10 dark:border-black/20 hover:shadow-2xl transform transition-all duration-500"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #1A73E8 0%, #38BDF8 100%)",
                boxShadow: "0 6px 18px rgba(26,115,232,0.25)",
              }}
            />
            <h4 className="text-xl font-semibold text-light-primary dark:text-dark-primary">
              {service}
            </h4>
          </div>

          <p className="mt-4 text-light-secondary dark:text-dark-secondary">
            Comprehensive support to help you reach global education and employment goals.
          </p>

          <div
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(26,115,232,0.08), rgba(56,189,248,0.08))",
              zIndex: -1,
            }}
          />
        </motion.article>
      ))}
    </div>
  </div>
</section>

      <section className="py-20 md:py-28 px-6 md:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-2xl">
          <img src="/img2.jpg" alt="Global Careers" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <h3 className="text-4xl font-heading font-bold text-light-primary dark:text-dark-primary">Future-Ready. Globally Connected.</h3>
          <p className="text-lg text-light-secondary dark:text-dark-secondary">Our global approach ensures you're not just prepared for today, but for tomorrow's opportunities, anywhere in the world.</p>
        </motion.div>
      </section>

      <section className="relative text-center px-6 py-28 md:py-32 bg-gradient-to-tr from-light-gradient to-light-background dark:from-dark-gradient dark:to-dark-background overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.img initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} src="/logo2.png" alt="Career Support" className="w-36 h-36 rounded-2xl mx-auto shadow-xl" />
          <motion.h4 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.8 }} className="text-3xl md:text-4xl font-heading font-bold text-light-primary dark:text-dark-primary">Your Global Journey Starts Here</motion.h4>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }} className="text-lg text-light-secondary dark:text-dark-secondary">Whether you're aiming for a top university or your dream job overseas, Atomica is with you, every step of the way.</motion.p>

          <motion.a
            href="services"
            whileHover={{ translateY: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.18)" }}
            className="inline-block mt-4 px-12 py-4 rounded-full font-semibold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-light-background dark:text-dark-background shadow-lg transition-all"
          >
            Start Now
          </motion.a>
        </div>
      </section>
    </div>
  );
}
