import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, GraduationCap, Heart, Target, Users } from 'lucide-react';

export default function About() {
  const services = [
    { title: 'Online Tutoring', description: 'Tailored academic help across subjects to help students excel.', icon: GraduationCap },
    { title: 'Project Support', description: 'Guidance for college projects in engineering, IT, and more.', icon: Target },
    { title: 'IT Training', description: 'Skill-focused training to match real-world industry needs.', icon: Briefcase },
    { title: 'Study Abroad Pathways', description: 'Support for MBBS, management & more at global universities.', icon: Globe },
    { title: 'Career Consulting — Germany', description: 'Postgraduate admission support to German public & private universities.', icon: Users },
    { title: 'Healthcare & IT Placement', description: 'Expert help for job seekers aiming to work in Germany.', icon: Heart },
  ];

  return (
    <section className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 overflow-hidden">
      {/* Hero */}
      <div className="grain relative bg-wash-light dark:bg-wash-dark border-b hairline">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            About Atomica
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-heading text-4xl md:text-6xl xl:text-7xl font-semibold leading-[1.04] tracking-[-0.02em] max-w-4xl"
          >
            Not just educators — <span className="em-serif">mentors</span>, guides &amp; global career architects.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg md:text-xl max-w-2xl text-light-secondary dark:text-dark-secondary leading-relaxed"
          >
            Shaping ambitions and launching global careers, one personalised journey at a time.
          </motion.p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="eyebrow">Our mission</span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.01em]">
            Unlocking opportunities <span className="em-serif">worldwide</span>
          </h2>
          <p className="text-lg leading-relaxed text-light-secondary dark:text-dark-secondary">
            Our mission is simple: empower students and young professionals to unlock
            opportunities worldwide through expert guidance, skill-building, and
            personalized support. We are especially proud to support students from
            India in their journeys to study and work abroad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            <span className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-light-accent/60 dark:border-dark-accent/60 rounded-tl-3xl" />
            <span className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-light-primary/40 dark:border-dark-primary/40 rounded-br-3xl" />
            <img
              src="/logo.jpg"
              alt="Atomica"
              className="w-52 sm:w-64 h-auto rounded-[1.4rem] bg-light-surface dark:bg-dark-surface p-3 shadow-card transition-transform duration-500 hover:-rotate-2"
            />
          </div>
        </motion.div>
      </div>

      {/* Specialities — bordered grid */}
      <div className="grain relative bg-light-surface dark:bg-dark-surface border-y hairline">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="mb-12 space-y-4">
            <span className="eyebrow">What we specialize in</span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.01em] max-w-2xl">
              Six ways we move your career forward
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t hairline">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="group border-r border-b hairline p-8 md:p-10 transition-colors duration-300 hover:bg-light-primary/[0.04] dark:hover:bg-dark-primary/[0.06]"
                >
                  <span className="grid place-items-center w-14 h-14 mb-6 rounded-full border border-light-secondary/20 dark:border-white/10 text-light-primary dark:text-dark-primary group-hover:border-light-primary dark:group-hover:border-dark-primary group-hover:-translate-y-1 transition-all duration-300">
                    <Icon size={26} />
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-medium leading-snug mb-3">
                    {service.title}
                  </h3>
                  <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
