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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 w-full border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 w-full border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
      
    </div>
  );
}
