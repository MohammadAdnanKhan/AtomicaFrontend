import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (name === 'ATOMICAADMIN' && password === 'ADMIN@atomica$$$') {
      localStorage.setItem('isAuth', 'true');
      navigate('/admin/form');
    } else {
      alert('Invalid credentials entered! Retry again...');
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(isDarkClass);
  }, []);

  return (
    <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient flex items-center justify-center px-4 py-10 transition-colors duration-500 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/70 dark:bg-dark-surface/70 hover:bg-white dark:hover:bg-dark-surface shadow-lg transition"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="max-w-md w-full bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-10 border border-gray-300 dark:border-gray-700 text-center">
        <img
          src="/logo.jpg"
          alt="Atomica Logo"
          className="w-20 h-20 mx-auto mb-6 rounded-full shadow-md border border-light-accent dark:border-dark-accent"
        />

        <h2 className="text-2xl font-heading font-bold text-light-primary dark:text-dark-primary mb-4 tracking-wider">
          Atomica Admin Panel
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Online Education & Career Services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-light-accent dark:hover:text-dark-accent"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}