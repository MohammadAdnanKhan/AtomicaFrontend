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
    <section className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text px-6 py-16 font-body">
      <div className="max-w-7xl mx-auto text-center animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-light-primary dark:text-dark-primary mb-4">
          Our Services
        </h2>
        <p className="text-lg md:text-xl text-light-secondary dark:text-dark-secondary mb-12 max-w-3xl mx-auto">
          Empowering your academic and professional journey with future-ready support.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-md transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 mx-auto text-white bg-light-primary dark:bg-dark-primary rounded-full shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-105">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">{service.title}</h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
