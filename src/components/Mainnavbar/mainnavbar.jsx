import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, User } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Careers", path: "/jobs" },
  { name: "About", path: "/about-us" },
  { name: "Contact", path: "/contact" },
];

export default function Mainnavbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin")) return null;

  const toggleDark = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-light-background/85 dark:bg-dark-background/85 backdrop-blur-md border-b border-light-secondary/15 dark:border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group text-left"
        >
          <span className="relative grid place-items-center">
            {/* orbit ring around the mark — the Atomica motif */}
            <span className="absolute inset-[-7px] rounded-full border border-light-primary/30 dark:border-dark-primary/30" />
            <span className="absolute inset-[-7px] rounded-full border-t border-light-accent/60 dark:border-dark-accent/60 animate-spinSlow" />
            <img
              src="/logo2.jpg"
              alt="Atomica Logo"
              className="relative h-10 w-auto rounded-lg ring-1 ring-light-secondary/20 dark:ring-white/15 group-hover:-rotate-3 transition-transform duration-500"
            />
          </span>
          <span className="leading-none">
            <span className="block font-heading text-[22px] font-semibold tracking-tight text-light-text dark:text-dark-text">
              Atomica
            </span>
            <span className="block mt-1 text-[10px] uppercase tracking-eyebrow text-light-secondary dark:text-dark-secondary">
              Career Academy
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-light-text dark:text-dark-text">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 transition-colors duration-300 group/link ${
                  active
                    ? "text-light-primary dark:text-dark-primary"
                    : "text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-light-accent dark:bg-dark-accent transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="p-2.5 rounded-full text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/8 dark:hover:bg-dark-primary/10 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/profiles"
            className="p-2.5 rounded-full text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-primary/8 dark:hover:bg-dark-primary/10 transition"
            title="User Profile"
          >
            <User size={18} />
          </Link>
          <Link
            to="/jobs"
            className="ml-1 inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-light-surface dark:text-dark-background bg-light-primary dark:bg-dark-primary hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
          >
            Find Jobs
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1.5">
          <button
            onClick={toggleDark}
            className="p-2.5 rounded-full text-light-secondary dark:text-dark-secondary"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/profiles"
            className="p-2.5 rounded-full text-light-secondary dark:text-dark-secondary"
            title="User Profile"
          >
            <User size={18} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg text-light-primary dark:text-dark-primary border border-light-secondary/20 dark:border-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-light-secondary/15 dark:border-white/10 bg-light-background dark:bg-dark-background animate-slideDown">
          <div className="px-6 py-4 flex flex-col">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 border-b border-light-secondary/10 dark:border-white/5 text-[15px] flex items-center justify-between ${
                    active
                      ? "text-light-primary dark:text-dark-primary font-semibold"
                      : "text-light-text dark:text-dark-text"
                  }`}
                >
                  {link.name}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent" />}
                </Link>
              );
            })}
            <Link
              to="/jobs"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center px-5 py-3 rounded-full text-sm font-semibold text-light-surface dark:text-dark-background bg-light-primary dark:bg-dark-primary"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
