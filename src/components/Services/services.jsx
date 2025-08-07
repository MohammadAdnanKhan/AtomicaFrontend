import React from 'react';
import { Briefcase, Globe, GraduationCap, HeartPulse, Code, BookOpen } from 'lucide-react';

const services = [
  {
    title: 'Online Tutoring',
    icon: <BookOpen size={32} />,
    description: 'For school and college students across various subjects, tailored for academic success.',
  },
  {
    title: 'IT Training',
    icon: <Code size={32} />,
    description: 'Industry-focused programs delivered online by experienced IT professionals.',
  },
  {
    title: 'MBBS & Higher Education (Russia)',
    icon: <GraduationCap size={32} />,
    description: 'Study MBBS and other specialized courses in top universities across Russia.',
  },
  {
    title: 'Postgraduate Admissions (Germany)',
    icon: <Briefcase size={32} />,
    description: 'Admissions consulting for public and private universities in Germany.',
  },
  {
    title: 'Healthcare Employment (Germany)',
    icon: <HeartPulse size={32} />,
    description: 'Placement support for healthcare professionals aiming to work in Germany.',
  },
  {
    title: 'Global Job Consulting',
    icon: <Globe size={32} />,
    description: 'Career consulting across multiple countries in IT, healthcare, and more.',
  },
];

export default function Services() {
return (
  <section className="min-h-screen bg-light-background animate-fadeIn dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500">
    <div className="bg-light-gradient animate-fadeIn dark:bg-dark-gradient py-20 px-6 md:px-16 text-center">
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-light-primary dark:text-dark-primary">
        Our Services
      </h1>
      <p className="text-lg md:text-xl font-body max-w-3xl mx-auto text-light-secondary*5 dark:text-dark-secondary*5">
        Empowering your academic and professional journey<br />
        <strong>with future-ready support tailored for global success.</strong>
      </p>
    </div>

    <div className="bg-light-surface dark:bg-dark-surface py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-light-primary dark:text-dark-primary">
          What We Offer
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-light-background dark:bg-dark-background rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 mx-auto text-white bg-light-primary dark:bg-dark-primary rounded-full shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2 text-light-primary dark:text-dark-primary">
                {service.title}
              </h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
