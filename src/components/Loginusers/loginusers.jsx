import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Loginusers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('https://atomicabackend.onrender.com/login', {
        email,
        password: password.trim()
    });

      localStorage.setItem('userAuth', 'true');
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.name);

      navigate('/profiles');
    } catch (err) {
      console.error(err.response?.data || err.message); 
      alert(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4 py-12 animate-fadeIn transition-colors duration-500 font-body">
      <div className="bg-light-surface dark:bg-dark-surface shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md text-light-text dark:text-dark-text space-y-6">

        <div className="flex flex-col items-center space-y-4">
          <img
            src="/logo.jpg"
            alt="Atomica Logo"
            className="w-20 h-20 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-3xl font-bold font-heading text-light-primary dark:text-dark-primary">
            User Login
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary text-sm text-center">
            Welcome! Please enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            required
          />
          <button
            type="submit"
            className="w-full bg-light-primary dark:bg-dark-primary text-white font-semibold py-3 rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
