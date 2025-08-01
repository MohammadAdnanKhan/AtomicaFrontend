import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/navbar';

export default function FormPage({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/');
  };

  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
    mobile: '',
    email: '',
    category: '',
    subcategory: '',
    resume: null,
  });

  const categories = ['MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef', 'Waiters', 'General Categories', 'Warehouse', 'Lab Technicians'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post('http://localhost:5000/api/submit', data);
      alert('Submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

return (
  <>
    <Navbar />
    <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient transition-colors duration-500 text-light-text dark:text-dark-text flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 transition-all">
        <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
          Candidate Information Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="State"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, state: e.target.value })}
          />
          <input
            placeholder="City"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            placeholder="Mobile"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <select
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            placeholder="Skills (comma-separated)"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
          />
          <input
            type="file"
            accept="application/pdf"
            className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-light-accent file:text-white hover:file:opacity-90 dark:file:bg-dark-accent"
            onChange={e => setFormData({ ...formData, resume: e.target.files[0] })}
          />

          <button
            type="submit"
            className="w-full py-3 font-headline bg-light-accent dark:bg-dark-accent text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-sm font-body text-light-primary dark:text-dark-primary hover:underline"
          >
            ← To Dashboard
          </button>
        </div>
      </div>
    </div>
  </>
);
}