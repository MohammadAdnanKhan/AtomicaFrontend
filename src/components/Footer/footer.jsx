import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="font-body">
      <div className="bg-light-primary dark:bg-dark-primary text-white py-12 px-6 md:px-16 text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 animate-fadeIn">
          Future-ready. Globally connected. Personally committed.
        </h3>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-6 animate-fadeIn">
          Whether you're aiming for a top university or your dream job overseas, we’re here to guide you in every step of the way.
          <br />
          <strong>That's the Atomica promise!</strong>
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-light-primary dark:text-dark-primary font-semibold px-6 py-3 rounded-md hover:scale-105 transition-transform shadow-md"
        >
          Get in Touch
        </Link>
      </div>

      <div className="bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-light-primary dark:text-dark-primary mb-3">
              Atomica
            </h2>
            <p className="text-sm text-light-secondary dark:text-dark-secondary">
              Shaping Ambitions. Launching Global Careers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-light-primary dark:hover:text-dark-primary transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-light-primary dark:hover:text-dark-primary transition">Services</Link></li>
              <li><Link to="/about-us" className="hover:text-light-primary dark:hover:text-dark-primary transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-light-primary dark:hover:text-dark-primary transition">Contact</Link></li>
              <li><Link to="/profiles" className="hover:text-light-primary dark:hover:text-dark-primary transition">User Profile</Link></li>
              <li><Link to="/admin/" className="hover:text-light-primary dark:hover:text-dark-primary transition">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064605651888"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition shadow-md"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/atomicacareeracademy03/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition shadow-md"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-light-background dark:bg-dark-background text-center py-4 text-xs text-light-secondary dark:text-dark-secondary">
          &copy; {new Date().getFullYear()} Atomica Career Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}