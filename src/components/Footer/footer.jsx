import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-body">
      {/* CTA band */}
      <div className="grain relative overflow-hidden bg-light-primary dark:bg-pine-900 text-light-surface dark:text-dark-text">
        <svg
          viewBox="0 0 400 400"
          className="absolute -left-20 -bottom-28 w-[26rem] h-[26rem] text-white/10 animate-spinSlow"
          fill="none"
          aria-hidden
        >
          <g stroke="currentColor" strokeWidth="1">
            <ellipse cx="200" cy="200" rx="180" ry="70" />
            <ellipse cx="200" cy="200" rx="180" ry="70" transform="rotate(60 200 200)" />
            <ellipse cx="200" cy="200" rx="180" ry="70" transform="rotate(120 200 200)" />
          </g>
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-heading text-2xl md:text-4xl font-semibold leading-tight">
              Future-ready. Globally connected. Personally committed.
            </h3>
            <p className="mt-3 text-light-surface/80 dark:text-dark-text/75">
              That's the Atomica promise — guidance every step of the way.
            </p>
          </div>
          <Link
            to="/contact"
            className="group shrink-0 inline-flex items-center gap-2 bg-light-surface text-light-primary dark:bg-dark-text dark:text-dark-background font-semibold px-7 py-3.5 rounded-full hover:-translate-y-0.5 transition-all shadow-card"
          >
            Get in Touch
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border-t hairline">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo2.jpg"
                alt="Atomica"
                className="h-10 w-auto rounded-lg ring-1 ring-light-secondary/20 dark:ring-white/15"
              />
              <h2 className="font-heading text-2xl font-semibold">Atomica</h2>
            </div>
            <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
              Shaping ambitions. Launching global careers.
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-light-secondary dark:text-dark-secondary">
              <MapPin size={16} className="mt-0.5 shrink-0 text-light-primary dark:text-dark-primary" />
              Kodambakkam, Chennai, Tamil Nadu, India — 600 024
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-light-secondary dark:text-dark-secondary mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', to: '/' },
                { name: 'Services', to: '/services' },
                { name: 'Careers', to: '/jobs' },
                { name: 'About', to: '/about-us' },
                { name: 'Contact', to: '/contact' },
                { name: 'User Profile', to: '/profiles' },
                { name: 'Admin', to: '/admin/dashboard' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                  >
                    <span className="h-px w-4 bg-light-secondary/40 group-hover:w-6 group-hover:bg-light-primary dark:group-hover:bg-dark-primary transition-all" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-light-secondary dark:text-dark-secondary mb-5">
              Follow Us
            </h3>
            <p className="text-light-secondary dark:text-dark-secondary mb-5 leading-relaxed">
              Stay connected for the latest opportunities and updates.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100064605651888"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid place-items-center w-11 h-11 rounded-full border hairline text-light-primary dark:text-dark-primary hover:bg-light-primary hover:text-light-surface dark:hover:bg-dark-primary dark:hover:text-dark-background transition -translate-y-0 hover:-translate-y-1"
              >
                <Facebook size={19} />
              </a>
              <a
                href="https://www.instagram.com/atomicacareeracademy03/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid place-items-center w-11 h-11 rounded-full border hairline text-light-accent dark:text-dark-accent hover:bg-light-accent hover:text-light-surface dark:hover:bg-dark-accent dark:hover:text-dark-background transition hover:-translate-y-1"
              >
                <Instagram size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t hairline text-center py-5 text-xs text-light-secondary dark:text-dark-secondary">
          &copy; {new Date().getFullYear()} Atomica Career Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
