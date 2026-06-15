import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, GraduationCap, HeartPulse, Code, BookOpen, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Online Tutoring', icon: BookOpen, description: 'For school and college students across various subjects, tailored for academic success.' },
  { title: 'IT Training', icon: Code, description: 'Industry-focused programs delivered online by experienced IT professionals.' },
  { title: 'MBBS & Higher Education — Russia', icon: GraduationCap, description: 'Study MBBS and other specialized courses in top universities across Russia.' },
  { title: 'Postgraduate Admissions — Germany', icon: Briefcase, description: 'Admissions consulting for public and private universities in Germany.' },
  { title: 'Healthcare Employment — Germany', icon: HeartPulse, description: 'Placement support for healthcare professionals aiming to work in Germany.' },
  { title: 'Global Job Consulting', icon: Globe, description: 'Career consulting across multiple countries in IT, healthcare, and more.' },
];

export default function Services() {
  return (
    <section className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 overflow-hidden">
      {/* Hero */}
      <div className="grain relative bg-wash-light dark:bg-wash-dark border-b hairline">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            What we offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-heading text-5xl md:text-7xl font-semibold leading-[1.02] tracking-[-0.02em] max-w-3xl"
          >
            Our <span className="em-serif">services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg md:text-xl max-w-2xl text-light-secondary dark:text-dark-secondary leading-relaxed"
          >
            Empowering your academic and professional journey with future-ready
            support, tailored for global success.
          </motion.p>
        </div>
      </div>

      {/* Bordered service grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t hairline">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="group relative border-r border-b hairline p-8 md:p-10 transition-colors duration-300 hover:bg-light-primary/[0.04] dark:hover:bg-dark-primary/[0.06]"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="grid place-items-center w-14 h-14 rounded-full border border-light-secondary/20 dark:border-white/10 text-light-primary dark:text-dark-primary group-hover:border-light-primary dark:group-hover:border-dark-primary group-hover:-translate-y-1 transition-all duration-300">
                    <Icon size={26} />
                  </span>
                  <span className="font-heading text-2xl font-semibold text-light-secondary/40 dark:text-dark-secondary/40 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug mb-3">
                  {service.title}
                </h3>
                <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                  {service.description}
                </p>
                <ArrowUpRight
                  size={20}
                  className="mt-6 text-light-secondary/40 dark:text-dark-secondary/40 group-hover:text-light-primary dark:group-hover:text-dark-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-[1.4rem] bg-light-primary dark:bg-pine-800 text-light-surface dark:text-dark-text">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold">Not sure where to start?</h3>
            <p className="text-light-surface/80 dark:text-dark-text/80 mt-1">Talk to an advisor and map your path.</p>
          </div>
          <Link
            to="/contact"
            className="group shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold bg-light-surface text-light-primary dark:bg-dark-text dark:text-dark-background hover:-translate-y-0.5 transition-all duration-300 shadow-card"
          >
            Talk to an advisor
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
