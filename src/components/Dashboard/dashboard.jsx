import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

const categories = [
  'All', 'MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef',
  'Waiters', 'General Categories', 'Warehouse', 'Lab Technicians'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [candidates, setCandidates] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates', {
          params: selectedCategory !== 'All' ? { category: selectedCategory } : {}
        });
        setCandidates(response.data);
        setVisibleCount(5); 
      } catch (err) {
        console.error('Failed to fetch candidates:', err);
      }
    };

    fetchCandidates();
  }, [selectedCategory]);

  const showMore = () => setVisibleCount(prev => prev + 5);

  return (
    <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight">
          Dashboard
        </h2>

        <div className="mb-10">
          <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-white dark:bg-dark-surface text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.slice(0, visibleCount).map(candidate => (
            <div
              key={candidate.id}
              className="p-6 rounded-2xl bg-white/70 dark:bg-dark-surface/60 backdrop-blur-md shadow-lg transition hover:shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-light-primary dark:text-dark-primary">{candidate.name}</h3>
              {selectedCategory === 'All' && (
                <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
                  Category: {candidate.category}
                </p>
              )}
              {candidate.subcategory && <p>🛠 &nbsp;Skills: {candidate.subcategory}</p>}
              <p>📍 {candidate.city}, {candidate.state}</p>
              <p>📞 {candidate.mobile}</p>
              <p>✉️ {candidate.email}</p>
              <a
                href={`http://localhost:5000/api/resume/${candidate.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition"
              >
                View Resume ↗
              </a>
            </div>
          ))}
        </div>

        {visibleCount < candidates.length && (
          <div className="text-center mt-10">
            <button
              onClick={showMore}
              className="px-6 py-2 rounded-full bg-light-accent dark:bg-dark-accent text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;