import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gradient dark:bg-dark-gradient px-4 py-12 font-body transition-colors duration-500">
      <div className="max-w-md w-full bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-light-text dark:text-dark-text">
        <div className="flex flex-col items-center mb-6 space-y-4">
          <img
            src="/logo.jpg"
            alt="Atomica Logo"
            className="w-20 h-20 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-2xl font-heading font-bold text-light-primary dark:text-dark-primary">
            User Login
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Welcome! Please enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-light-accent dark:hover:text-dark-accent"
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
