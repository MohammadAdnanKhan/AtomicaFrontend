import React from 'react';
import { Briefcase, Globe, GraduationCap, Heart, Target, Users } from 'lucide-react';

export default function About() {
  const services = [
    {
      title: 'Online Tutoring',
      description: 'Tailored academic help across subjects to help students excel.',
      icon: <GraduationCap size={32} />,
    },
    {
      title: 'Project Support',
      description: 'Guidance for college projects in engineering, IT, and more.',
      icon: <Target size={32} />,
    },
    {
      title: 'IT Training',
      description: 'Skill-focused training to match real-world industry needs.',
      icon: <Briefcase size={32} />,
    },
    {
      title: 'Study Abroad Pathways',
      description: 'Support for MBBS, management & more at global universities.',
      icon: <Globe size={32} />,
    },
    {
      title: 'Career Consulting (Germany)',
      description: 'Postgraduate admission support to German public & private universities.',
      icon: <Users size={32} />,
    },
    {
      title: 'Healthcare & IT Job Placement',
      description: 'Expert help for job seekers aiming to work in Germany.',
      icon: <Heart size={32} />,
    },
  ];

  return (
    <section className="min-h-screen bg-light-background animate-fadeIn dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500">
      <div className="bg-light-gradient animate-fadeIn dark:bg-dark-gradient py-20 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-light-primary dark:text-dark-primary">
          Shaping Ambitions. Launching Global Careers.
        </h1>
        <p className="text-lg md:text-xl animate-fadeIn font-body max-w-3xl mx-auto text-light-secondary*5 dark:text-dark-secondary*5">
          At Atomica Career Academy, we're not just educators<br></br><strong>We're mentors, guides, and global career architects.</strong>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-light-primary dark:text-dark-primary mb-4">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed font-body text-light-secondary dark:text-dark-secondary">
            Our mission is simple: empower students and young professionals to unlock opportunities worldwide through expert guidance,
            skill-building, and personalized support. We are especially proud to support students from India in their journeys to
            study and work abroad.
          </p>
        </div>
        <img
          src="/logo.jpg"
          alt="Atomica"
          className="w-40 sm:w-52 md:w-60 lg:w-48 xl:w-40 h-auto mx-auto rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 animate-fadeIn"
        />
      </div>

      <div className="bg-light-surface dark:bg-dark-surface py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-light-primary dark:text-dark-primary">
          What We Specialize In
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-light-background dark:bg-dark-background rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-light-primary dark:text-dark-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold font-heading mb-2">{service.title}</h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}