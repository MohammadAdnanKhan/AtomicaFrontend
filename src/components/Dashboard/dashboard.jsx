import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const categories = [
  'All', 'MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef',
  'Waiters', 'General Categories', 'Warehouse', 'Lab Technicians'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [candidates, setCandidates] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://atomicabackend.onrender.com/api/candidates', {
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

  const exportFilteredToExcel = () => {
    if (filteredCandidates.length === 0) {
      alert('No candidates to export!');
      return;
    }

    const dataToExport = filteredCandidates.map(({ resume, ...rest }) => rest); // Exclude resume (binary)
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'filtered_candidates.xlsx');
  };
  const exportSingleCandidate = (candidate) => {
    const { resume, ...data } = candidate; // Exclude binary resume
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidate');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `candidate_${candidate.id}.xlsx`);
  };

  const showMore = () => setVisibleCount(prev => prev + 5);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesAge =
      (!minAge || candidate.age >= Number(minAge)) &&
      (!maxAge || candidate.age <= Number(maxAge));
    const matchesId = !searchId || candidate.id === Number(searchId);
    return matchesAge && matchesId;
  });

 return (
  <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Filter by Age Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Age"
              onChange={e => setMinAge(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
            />
            <input
              type="number"
              placeholder="Max Age"
              onChange={e => setMaxAge(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Search by Candidate ID
          </label>
          <input
            type="number"
            placeholder="Enter ID"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
          />
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={exportFilteredToExcel}
          className="px-5 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-white font-semibold hover:opacity-90 transition"
        >
          Export Filtered to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.slice(0, visibleCount).map(candidate => (
          <div
            key={candidate.id}
            className="p-6 rounded-2xl bg-white/70 dark:bg-dark-surface/60 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold text-light-primary dark:text-dark-primary mb-2">{candidate.name}</h3>

            {selectedCategory === 'All' && candidate.category && (
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
                Category: {candidate.category}
              </p>
            )}
            {candidate.id && <p>🪪 Id: {candidate.id}</p>}
            {candidate.subcategory && <p>🛠 Skills: {candidate.subcategory}</p>}
            {candidate.age && <p>🎂 Age: {candidate.age}</p>}
            {candidate.gender && <p>🚻 Gender: {candidate.gender}</p>}
            {(candidate.city || candidate.state) && (
              <p>📍 {candidate.city}{candidate.city && candidate.state ? ', ' : ''}{candidate.state}</p>
            )}
            {candidate.mobile && <p>📞 Mobile: {candidate.mobile}</p>}
            {candidate.mobile_whatsapp && <p>💬 WhatsApp: {candidate.mobile_whatsapp}</p>}
            {candidate.email && <p>✉️ Email: {candidate.email}</p>}

            <div className="mt-4 flex flex-col gap-1">
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`https://atomicabackend.onrender.com/api/resume/${candidate.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md font-medium text-sm hover:opacity-90 transition"
                >
                  View Resume
                </a>
                <button
                  onClick={() => exportSingleCandidate(candidate)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition"
                >
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredCandidates.length && (
        <div className="text-center mt-10">
          <button
            onClick={showMore}
            className="px-6 py-2 rounded-full bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-md hover:scale-105 transition"
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