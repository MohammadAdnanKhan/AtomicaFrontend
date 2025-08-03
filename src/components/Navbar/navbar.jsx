import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const logout = () => {
    localStorage.removeItem('isAuth');
    navigate('/admin/login');
  };

  if (location.pathname === '/admin/login') return null;

  return (
    <nav className="flex font-heading justify-between items-center px-6 py-3 shadow-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Logo" title='Online Education and Career Services' className="h-9 w-9 rounded-full shadow-md" />
        <Link to="/home" title='Online Education and Career Services' className="text-2xl font-bold tracking-wide text-light-primary dark:text-dark-primary">
          Atomica
        </Link>
      </div>

      <div className="flex gap-4 items-center text-sm font-medium">
        <Link
          to="/admin/dashboard"
          className="hover:underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/form"
          className="hover:underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition"
        >
          Form
        </Link>

        <button
          onClick={logout}
          className="bg-light-accent dark:bg-dark-accent text-white px-4 py-1.5 rounded-md hover:scale-105 transition-transform shadow-sm"
        >
          Logout
        </button>

        <button
          onClick={toggleDark}
          className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
