import React from 'react';

export default function Home() {
  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500 font-body">
      <section className="bg-light-gradient dark:bg-dark-gradient py-20 px-6 md:px-16 text-center animate-fadeIn">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/logo.jpg"
            alt="Atomica Logo"
            className="w-24 h-24 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-light-primary dark:text-dark-primary">
            Shaping Ambitions. Launching Global Careers.
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-light-secondary dark:text-dark-secondary">
            At Atomica Career Academy, we empower students and professionals to unlock global opportunities through guidance, skill-building, and expert mentoring.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-light-primary dark:text-dark-primary mb-4">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed text-light-secondary dark:text-dark-secondary">
            We guide young minds toward academic excellence, career growth, and global exposure. From tutoring to international job placements, we are committed to personalized and future-ready solutions.
          </p>
        </div>
        <img
          src="/img1.jpg"
          alt="Mission"
          className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </section>

      <section className="bg-light-surface dark:bg-dark-surface py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-light-primary dark:text-dark-primary">
          What We Do
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Online Tutoring',
            'IT & Project Training',
            'Study Abroad (MBBS, Management)',
            'Postgraduate Admissions (Germany)',
            'Healthcare Job Placement',
            'International Career Consulting',
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-light-background dark:bg-dark-background rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold font-heading mb-2 text-light-primary dark:text-dark-primary">
                {service}
              </h3>
              <p className="text-sm text-light-secondary dark:text-dark-secondary">
                Comprehensive support to help you reach global education and employment goals.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <img
          src="/img2.jpg"
          alt="Global Careers"
          className="w-full max-w-[500px] aspect-video object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <div>
          <h2 className="text-3xl font-heading font-bold text-light-primary dark:text-dark-primary mb-4">
            Future-Ready. Globally Connected.
          </h2>
          <p className="text-base text-light-secondary dark:text-dark-secondary">
            Our global approach ensures you're not just prepared for today, but for tomorrow's opportunities, anywhere in the world.
          </p>
        </div>
      </section>

      <section className="text-center px-6 py-20 bg-light-gradient dark:bg-dark-gradient">
        <div className="max-w-3xl mx-auto space-y-6">
          <img
            src="/logo2.png"
            alt="Career Support"
            className="w-full max-w-[500px] mx-auto aspect-video object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-light-primary dark:text-dark-primary">
            Your Global Journey Starts Here
          </h3>
          <p className="text-base text-light-secondary dark:text-dark-secondary">
            Whether you're aiming for a top university or your dream job overseas, Atomica is with you, every step of the way.
          </p>
        </div>
      </section>
    </div>
  );
}
