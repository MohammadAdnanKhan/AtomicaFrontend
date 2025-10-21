import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, User } from "lucide-react";

export default function Mainnavbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 font-heading bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border-b border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo + Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.jpg"
            alt="Atomica Logo"
            className="h-11 w-11 rounded-full shadow-lg ring-2 ring-light-primary/40 dark:ring-dark-primary/40 group-hover:scale-110 transition-transform duration-300"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-light-primary dark:text-dark-primary">
              Atomica
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
              Career & Education Services
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium text-[15px]">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              location.pathname === "/"
                ? "bg-light-primary text-white dark:bg-dark-primary shadow-md"
                : "hover:text-light-primary dark:hover:text-dark-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="hover:text-light-primary dark:hover:text-dark-primary transition-all"
          >
            Services
          </Link>
          <Link
            to="/about-us"
            className="hover:text-light-primary dark:hover:text-dark-primary transition-all"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-light-primary dark:hover:text-dark-primary transition-all"
          >
            Contact
          </Link>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <Link
              to="/profiles"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="User Profile"
            >
              <User size={18} />
            </Link>
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/profiles"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="User Profile"
          >
            <User size={18} />
          </Link>

          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-light-surface dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700 px-6 pb-5 flex flex-col gap-4 text-base font-medium animate-slideDown">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about-us" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="hover:text-light-primary dark:hover:text-dark-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
