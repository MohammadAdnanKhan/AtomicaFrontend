import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Loginusers() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LOGIN_URL = "https://atomicabackend.onrender.com/login";
  // const LOGIN_URL = "http://localhost:5000/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, {
        email,
        password: password.trim(),
      });

      localStorage.setItem("userAuth", "true");
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);

      navigate("/profiles");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl border border-light-secondary/25 dark:border-white/10 bg-light-background/60 dark:bg-white/5 text-light-text dark:text-dark-text placeholder:text-light-secondary/70 focus:outline-none focus:border-light-primary dark:focus:border-dark-primary focus:ring-2 focus:ring-light-primary/20 dark:focus:ring-dark-primary/20 transition";

  return (
    <div className="grain relative min-h-screen flex items-center justify-center px-4 py-12 bg-wash-light dark:bg-wash-dark overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-24 -top-24 w-[26rem] h-[26rem] text-light-primary/10 dark:text-dark-primary/10 animate-spinSlow"
        fill="none"
        aria-hidden
      >
        <g stroke="currentColor" strokeWidth="1">
          <ellipse cx="200" cy="200" rx="180" ry="70" />
          <ellipse cx="200" cy="200" rx="180" ry="70" transform="rotate(60 200 200)" />
          <ellipse cx="200" cy="200" rx="180" ry="70" transform="rotate(120 200 200)" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full rounded-[1.6rem] border hairline bg-light-surface dark:bg-dark-surface shadow-card p-8"
      >
        <div className="flex flex-col items-center mb-7 space-y-4 text-center">
          <img
            src="/logo.jpg"
            alt="Atomica Logo"
            className="h-20 w-auto rounded-2xl bg-light-background dark:bg-dark-background p-2 ring-1 ring-light-secondary/20 dark:ring-white/10 shadow-soft"
          />
          <div>
            <span className="eyebrow justify-center">Welcome back</span>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              User <span className="em-serif">login</span>
            </h2>
          </div>
          <p className="text-sm text-light-secondary dark:text-dark-secondary">
            Please enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase}
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputBase} pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-light-surface dark:text-dark-background bg-light-primary dark:bg-dark-primary hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
