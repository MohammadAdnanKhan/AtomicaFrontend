// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BASE = 'https://atomicabackend.onrender.com/api';

// const categories = [
//   'All', 'MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef',
//   'Waiters', 'General Categories', 'Warehouse', 'Lab Technicians'
// ];

// const genders = ['All', 'Male', 'Female', 'Other'];

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedGender, setSelectedGender] = useState('All');
//   const [candidates, setCandidates] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [minAge, setMinAge] = useState('');
//   const [maxAge, setMaxAge] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch candidates with filters applied
//   useEffect(() => {
//     const source = axios.CancelToken.source();
//     const fetchCandidates = async () => {
//       setLoading(true);
//       try {
//         const params = {};

//         if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
//         if (selectedGender && selectedGender !== 'All') params.gender = selectedGender;
//         if (minAge) params.min = minAge;
//         if (maxAge) params.max = maxAge;
//         params.limit = 200;
//         params.page = 1;

//         const res = await axios.get(`${BASE}/candidates`, {
//           params,
//           cancelToken: source.token,
//           timeout: 15000
//         });

//         setCandidates(Array.isArray(res.data) ? res.data : []);
//         setVisibleCount(5);
//       } catch (err) {
//         if (!axios.isCancel(err)) {
//           console.error('Error fetching candidates:', err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCandidates();

//     return () => {
//       source.cancel('Cancelled due to new request.');
//     };
//   }, [selectedCategory, selectedGender, minAge, maxAge]);

//   // Client side filter for age (extra guard)
//   const filteredCandidates = candidates.filter(candidate => {
//     const age = candidate.age ?? null;
//     return (
//       (!minAge || (age !== null && age >= Number(minAge))) &&
//       (!maxAge || (age !== null && age <= Number(maxAge)))
//     );
//   });

//   // Export filtered list without resume file blobs
//   const exportFilteredToExcel = () => {
//     if (filteredCandidates.length === 0) {
//       alert('No candidates to export!');
//       return;
//     }
//     const dataToExport = filteredCandidates.map(({ resume, ...rest }) => rest);
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'filtered_candidates.xlsx');
//   };

//   // Export single candidate
//   const exportSingleCandidate = (candidate) => {
//     const { resume, ...data } = candidate;
//     const worksheet = XLSX.utils.json_to_sheet([data]);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidate');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), `candidate_${candidate.id}.xlsx`);
//   };

//   const showMore = () => setVisibleCount(prev => prev + 5);

//   return (
//     <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight">
//           Dashboard
//         </h2>

//         {/* Filters */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           {/* Category filter */}
//           <div>
//             <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
//               Filter by Category
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           {/* Age range filter */}
//           <div>
//             <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
//               Filter by Age Range
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 placeholder="Min Age"
//                 value={minAge}
//                 onChange={e => setMinAge(e.target.value)}
//                 className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
//               />
//               <input
//                 type="number"
//                 placeholder="Max Age"
//                 value={maxAge}
//                 onChange={e => setMaxAge(e.target.value)}
//                 className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
//               />
//             </div>
//           </div>

//           {/* Gender filter */}
//           <div>
//             <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
//               Search by Gender
//             </label>
//             <select
//               value={selectedGender}
//               onChange={e => setSelectedGender(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
//             >
//               {genders.map(g => <option key={g} value={g}>{g}</option>)}
//             </select>
//           </div>
//         </div>

//         {/* Export Button */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={exportFilteredToExcel}
//             className="px-5 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-white font-semibold hover:opacity-90 transition"
//           >
//             Export Filtered to Excel
//           </button>
//         </div>

//         {loading && <p className="text-center mb-4">Loading...</p>}

//         {/* Candidates Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCandidates.slice(0, visibleCount).map(candidate => (
//             <div
//               key={candidate.id}
//               className="p-6 rounded-2xl bg-white/70 dark:bg-dark-surface/60 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-2xl"
//             >
//               <h3 className="text-xl font-bold text-light-primary dark:text-dark-primary mb-2">{candidate.name}</h3>

//               {selectedCategory === 'All' && candidate.category && (
//                 <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
//                   Category: {candidate.category}
//                 </p>
//               )}
//               {candidate.id && <p>🪪 Id: {candidate.id}</p>}
//               {candidate.main_subcategory && <p>📋 Main Subcategory: {candidate.main_subcategory}</p>}
//               {candidate.subcategory && <p>🛠 Skills: {candidate.subcategory}</p>}
//               {candidate.age && <p>🎂 Age: {candidate.age}</p>}
//               {candidate.gender && <p>🚻 Gender: {candidate.gender}</p>}
//               {(candidate.city || candidate.state) && (
//                 <p>📍 {candidate.city}{candidate.city && candidate.state ? ', ' : ''}{candidate.state}</p>
//               )}
//               {candidate.mobile && <p>📞 Mobile: {candidate.mobile}</p>}
//               {candidate.mobile_whatsapp && <p>💬 WhatsApp: {candidate.mobile_whatsapp}</p>}
//               {candidate.email && <p>✉️ Email: {candidate.email}</p>}
//               {candidate.enteredby && <p>✍️ Details Entered By: {candidate.enteredby}</p>}

//               <div className="mt-4 flex flex-wrap items-center gap-4">
//                 <a
//                   href={`${BASE}/resume/${candidate.id}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md font-medium text-sm hover:opacity-90 transition"
//                 >
//                   View Resume
//                 </a>
//                 <button
//                   onClick={() => exportSingleCandidate(candidate)}
//                   className="px-4 py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition"
//                 >
//                   Export to Excel
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         {visibleCount < filteredCandidates.length && (
//           <div className="text-center mt-10">
//             <button
//               onClick={showMore}
//               className="px-6 py-2 rounded-full bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-md hover:scale-105 transition"
//             >
//               Show More
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE = 'https://atomicabackend.onrender.com/api';

const categories = [
  'All', 'MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef',
  'Waiters', 'GeneralCategories', 'Warehouse', 'Lab Technicians'
];

const genders = ['All', 'Male', 'Female', 'Other'];

const categoryToMainSubcategories = {
  MD: [
    'Internal Medicine',
    'General Surgeon',
    'Pediatrician',
    'Obstetrician and Gynaecologist',
    'Psychiatrist',
    'Neurologist',
    'Dermatologist',
    'Radiologist',
    'Pathologist',
    'Emergency Medicine',
    'Anesthetist',
    'Geriatrician',
    'Gastroenterologist',
    'General Practitioner'
  ],
  MBBS: [
    'House Surgeon',
    'Medical Officer',
    'General Practitioner',
    'Resident Doctor',
    'Junior Doctor',
    'Clinical Assistant',
    'Emergency Medical Officer',
    'Rural Medical Officer',
    'Medical Intern'
  ],
  BDS: [
    'General Dentist',
    'Oral Surgeon',
    'Orthodontist',
    'Prosthodontist',
    'Pedodontist',
    'Periodontist',
    'Endodontist',
    'Oral Pathologist',
    'Public Health Dentist'
  ],
  MDS: [
    'Oral and Maxillofacial Surgery',
    'Orthodontics',
    'Prosthodontics',
    'Periodontics',
    'Endodontics',
    'Pedodontics',
    'Oral Medicine and Radiology',
    'Oral Pathology',
    'Community Dentistry'
  ],
  IT: [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'AI/ML Engineer',
    'Cybersecurity Specialist',
    'Database Administrator',
    'QA Tester',
    'UI/UX Designer',
    'IT Support Specialist',
    'Cloud Engineer'
  ],
  Chef: [
    'Executive Chef',
    'Sous Chef',
    'Pastry Chef',
    'Commis Chef',
    'Chef de Partie',
    'Line Cook',
    'Prep Cook',
    'Garde Manger',
    'Kitchen Manager'
  ],
  Waiters: [
    'Head Waiter',
    'Server',
    'Food Runner',
    'Busser',
    'Bartender',
    'Host/Hostess',
    'Banquet Server',
    'Room Service Attendant'
  ],
  GeneralCategories: [
    'Receptionist',
    'Admin Assistant',
    'Data Entry Operator',
    'Customer Service Representative',
    'Call Center Agent',
    'Office Boy',
    'Cleaner',
    'Security Guard',
    'Driver'
  ],
  Warehouse: [
    'Warehouse Manager',
    'Forklift Operator',
    'Inventory Clerk',
    'Material Handler',
    'Packer',
    'Picker',
    'Shipping and Receiving Clerk',
    'Logistics Coordinator',
    'Loader/Unloader'
  ],
  "Lab Technicians": [
    'Medical Lab Technician',
    'Pathology Technician',
    'Radiology Technician',
    'Microbiology Technician',
    'Biochemistry Technician',
    'Hematology Technician',
    'Cytogenetic Technician',
    'Phlebotomist',
    'X-Ray Technician'
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMainSubcategory, setSelectedMainSubcategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [candidates, setCandidates] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset main subcategory when category changes
  useEffect(() => {
    setSelectedMainSubcategory('All');
  }, [selectedCategory]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const params = {};

        if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedGender && selectedGender !== 'All') params.gender = selectedGender;
        if (selectedMainSubcategory && selectedMainSubcategory !== 'All') params.main_subcategory = selectedMainSubcategory;
        if (minAge) params.min = minAge;
        if (maxAge) params.max = maxAge;
        params.limit = 200;
        params.page = 1;

        const res = await axios.get(`${BASE}/candidates`, {
          params,
          cancelToken: source.token,
          timeout: 15000
        });

        setCandidates(Array.isArray(res.data) ? res.data : []);
        setVisibleCount(5);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error fetching candidates:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();

    return () => {
      source.cancel('Cancelled due to new request.');
    };
  }, [selectedCategory, selectedGender, selectedMainSubcategory, minAge, maxAge]);

  // Client side filter for age (extra guard)
  const filteredCandidates = candidates.filter(candidate => {
    const age = candidate.age ?? null;
    return (
      (!minAge || (age !== null && age >= Number(minAge))) &&
      (!maxAge || (age !== null && age <= Number(maxAge)))
    );
  });

  // Export filtered list without resume file blobs
  const exportFilteredToExcel = () => {
    if (filteredCandidates.length === 0) {
      alert('No candidates to export!');
      return;
    }
    const dataToExport = filteredCandidates.map(({ resume, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'filtered_candidates.xlsx');
  };

  // Export single candidate
  const exportSingleCandidate = (candidate) => {
    const { resume, ...data } = candidate;
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidate');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), `candidate_${candidate.id}.xlsx`);
  };

  const showMore = () => setVisibleCount(prev => prev + 5);

  // Derive mainSubcategory options based on selected category
  const mainSubcategoryOptions = selectedCategory !== 'All' && categoryToMainSubcategories[selectedCategory]
    ? ['All', ...categoryToMainSubcategories[selectedCategory]]
    : [];

return (
  <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight">
        Dashboard
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Category filter */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedMainSubcategory('All'); // reset mainSubcategory on category change
            }}
            className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Main Subcategory filter */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Filter by Main Skill
          </label>
          <select
            value={selectedMainSubcategory}
            onChange={e => setSelectedMainSubcategory(e.target.value)}
            disabled={selectedCategory === 'All' || !categoryToMainSubcategories[selectedCategory]}
            className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
          >
            <option value="All">All</option>
            {selectedCategory !== 'All' && categoryToMainSubcategories[selectedCategory]?.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>

        {/* Age range filter */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Filter by Age Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={e => setMinAge(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
            />
            <input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={e => setMaxAge(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
            />
          </div>
        </div>

        {/* Gender filter */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Search by Gender
          </label>
          <select
            value={selectedGender}
            onChange={e => setSelectedGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text"
          >
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={exportFilteredToExcel}
          className="px-5 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-white font-semibold hover:opacity-90 transition"
        >
          Export Filtered to Excel
        </button>
      </div>

      {loading && <p className="text-center mb-4">Loading...</p>}

      {/* Candidates Grid */}
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
            {candidate.main_subcategory && <p>📋 Main Subcategory: {candidate.main_subcategory}</p>}
            {candidate.subcategory && <p>🛠 Skills: {candidate.subcategory}</p>}
            {candidate.age && <p>🎂 Age: {candidate.age}</p>}
            {candidate.gender && <p>🚻 Gender: {candidate.gender}</p>}
            {(candidate.city || candidate.state) && (
              <p>📍 {candidate.city}{candidate.city && candidate.state ? ', ' : ''}{candidate.state}</p>
            )}
            {candidate.mobile && <p>📞 Mobile: {candidate.mobile}</p>}
            {candidate.mobile_whatsapp && <p>💬 WhatsApp: {candidate.mobile_whatsapp}</p>}
            {candidate.email && <p>✉️ Email: {candidate.email}</p>}
            {candidate.enteredby && <p>✍️ Details Entered By: {candidate.enteredby}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href={`${BASE}/resume/${candidate.id}`}
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
        ))}
      </div>

      {/* Show More Button */}
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
