import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Mainnavbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔧 Hide navbar on admin routes
  if (location.pathname.startsWith('/admin')) return null;

  // ✅ Theme toggle
  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem('isAuth');
    navigate('/admin/login');
  };

  return (
    <nav className="sticky top-0 z-50 font-heading bg-light-surface dark:bg-dark-surface shadow-md text-light-text dark:text-dark-text transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Logo"
            title="Online Education and Career Services"
            className="h-9 w-9 rounded-full shadow-md"
          />
          <Link
            to="/home"
            title="Online Education and Career Services"
            className="text-2xl font-bold tracking-wide text-light-primary dark:text-dark-primary"
          >
            Atomica
          </Link>
        </div>

        <div className="hidden md:flex gap-4 items-center text-sm font-medium">
          <Link
            to="/home"
            className="bg-light-primary dark:bg-dark-primary text-white px-4 py-1.5 rounded-md hover:scale-105 transition-transform shadow-sm"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="hover:underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            About
          </Link>

          <button
            onClick={toggleDark}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-light-surface dark:bg-dark-surface px-6 pb-4 flex flex-col gap-3 text-sm font-medium border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/form"
            onClick={() => setIsOpen(false)}
            className="hover:text-light-accent dark:hover:text-dark-accent transition"
          >
            Form
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="bg-light-accent dark:bg-dark-accent text-white px-4 py-1.5 rounded-md mt-1 w-fit"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
