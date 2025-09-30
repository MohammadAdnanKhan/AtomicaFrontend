import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  // const PASS_URL= "http://localhost:5000/api/admin-password";
  const PASS_URL= "https://atomicabackend.onrender.com/api/admin-password";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(PASS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("username", name);
        navigate("/admin/form");
      } else {
        alert(data.error || "Invalid credentials entered! Retry again...");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, try again later.");
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(isDarkClass);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gradient dark:bg-dark-gradient px-4 py-10 font-body transition-colors duration-500 relative">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/70 dark:bg-dark-surface/70 hover:bg-white dark:hover:bg-dark-surface shadow-lg transition"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Login Box */}
      <div className="max-w-md w-full bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-10 border border-gray-300 dark:border-gray-700">
        <img
          src="/logo.jpg"
          alt="Atomica Logo"
          className="w-20 h-20 mx-auto mb-6 rounded-full shadow-md border border-light-accent dark:border-dark-accent"
        />

        <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary mb-4 tracking-wider">
          Atomica Admin Panel
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
          Online Education & Career Services
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-light-accent dark:hover:text-dark-accent"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-light-primary dark:bg-dark-primary text-white rounded-2xl font-semibold hover:opacity-90 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}