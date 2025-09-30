import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE = 'https://atomicabackend.onrender.com/api';
// const BASE = "http://localhost:5000/api";

const categories = [
  "All",
  "MBBS",
  "MD",
  "BDS",
  "MDS",
  "IT",
  "Chef",
  "Waiters",
  "GeneralCategories",
  "Warehouse",
  "Lab Technicians",
  "Engineering - Traditional",
  "Engineering - Modern",
  "Engineering - Future Focussed",
  "10th",
  "12th",
  "Diploma",
  "ITI"
];

const genders = ["All", "Male", "Female", "Other"];

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
    "Engineering - Traditional": [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering (ECE)",
    "Chemical Engineering",
    "Industrial Engineering",
    "Textile Engineering",
    "Agricultural Engineering",
    "Mining Engineering",
    "Metallurgical Engineering",
    "Marine Engineering",
    "Automobile Engineering",
    "Aerospace Engineering",
    "Petroleum Engineering"
  ],

  "Engineering - Modern": [
    "Computer Science and Engineering (CSE)",
    "Information Technology (IT)",
    "Software Engineering",
    "Robotics Engineering",
    "Mechatronics Engineering",
    "Biomedical Engineering",
    "Biotechnology Engineering",
    "Environmental Engineering",
    "Instrumentation Engineering",
    "Nanotechnology Engineering",
    "Energy Engineering",
    "Structural Engineering",
    "Telecommunications Engineering",
    "Industrial Design Engineering",
    "Systems Engineering"
  ],

  "Engineering - Future Focussed": [
    "Artificial Intelligence and Machine Learning (AI/ML) Engineering",
    "Data Science and Big Data Engineering",
    "Cybersecurity Engineering",
    "Quantum Computing Engineering",
    "Space and Satellite Engineering",
    "Smart Manufacturing and Industry 4.0",
    "Autonomous Vehicles Engineering",
    "Augmented Reality and Virtual Reality (AR/VR) Engineering",
    "Brain-Computer Interface (BCI) Engineering",
    "Genetic Engineering and Bioinformatics",
    "Sustainable and Green Technology Engineering",
    "Renewable Energy Systems (Solar, Wind, Hydro, Hydrogen)",
    "Smart Cities and Infrastructure Engineering",
    "Advanced Materials Engineering",
    "Climate and Disaster Resilience Engineering"
  ],
    "10th": [
    "General Studies",
    "Science",
    "Mathematics",
    "Social Studies",
    "Languages (English, Hindi, Regional)"
  ],

  "12th": [
    "Science - PCM (Physics, Chemistry, Mathematics)",
    "Science - PCB (Physics, Chemistry, Biology)",
    "Commerce (Accounts, Business Studies, Economics)",
    "Arts/Humanities (History, Political Science, Geography, Sociology, Psychology)",
    "Vocational Streams"
  ],

  "Diploma": [
    "Diploma in Civil Engineering",
    "Diploma in Mechanical Engineering",
    "Diploma in Electrical Engineering",
    "Diploma in Electronics & Communication",
    "Diploma in Computer Science",
    "Diploma in Automobile Engineering",
    "Diploma in Chemical Engineering",
    "Diploma in Architecture",
    "Diploma in Textile Engineering",
    "Diploma in Agriculture",
    "Diploma in Hotel Management",
    "Diploma in Fashion Designing",
    "Diploma in Pharmacy",
    "Diploma in Nursing"
  ],

  "ITI": [
    "Fitter",
    "Electrician",
    "Welder",
    "Machinist",
    "Turner",
    "Plumber",
    "Carpenter",
    "Diesel Mechanic",
    "Motor Vehicle Mechanic",
    "Refrigeration and Air Conditioning Mechanic",
    "Electronics Mechanic",
    "Information Technology (COPA - Computer Operator & Programming Assistant)",
    "Instrument Mechanic",
    "Wireman",
    "Surveyor"
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMainSubcategory, setSelectedMainSubcategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [enteredBy, setEnteredBy] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset main subcategory when category changes
  useEffect(() => {
    setSelectedMainSubcategory("All");
  }, [selectedCategory]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const params = {};

        if (selectedCategory && selectedCategory !== "All")
          params.category = selectedCategory;
        if (selectedGender && selectedGender !== "All")
          params.gender = selectedGender;
        if (
          selectedMainSubcategory &&
          selectedMainSubcategory !== "All"
        )
          params.main_subcategory = selectedMainSubcategory;
        if (enteredBy) params.enteredby = enteredBy;
        if (minAge) params.min = minAge;
        if (maxAge) params.max = maxAge;
        if (minExp) params.minExp = minExp;
        if (maxExp) params.maxExp = maxExp;
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        
        params.limit = 200;
        params.page = 1;

        const res = await axios.get(`${BASE}/candidates`, {
          params,
          cancelToken: source.token,
          timeout: 15000,
        });

        setCandidates(Array.isArray(res.data) ? res.data : []);
        setVisibleCount(5);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching candidates:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();

    return () => {
      source.cancel("Cancelled due to new request.");
    };
  }, [
    selectedCategory,
    selectedGender,
    selectedMainSubcategory,
    enteredBy,
    minAge,
    maxAge,
    minExp,
    maxExp,
    startDate,
    endDate,
  ]);

  // Client side filter for extra safety
  const filteredCandidates = candidates.filter((candidate) => {
    const age = candidate.age ?? null;
    const exp = candidate.experience ?? null;
    const entryDate = candidate.dataofentry
      ? new Date(candidate.dataofentry)
      : null;

    return (
      (!minAge || (age !== null && age >= Number(minAge))) &&
      (!maxAge || (age !== null && age <= Number(maxAge))) &&
      (!minExp || (exp !== null && exp >= Number(minExp))) &&
      (!maxExp || (exp !== null && exp <= Number(maxExp))) &&
      (!startDate ||
        (entryDate && entryDate >= new Date(startDate))) &&
      (!endDate || (entryDate && entryDate <= new Date(endDate)))
    );
  });

  // Export filtered list without resume file blobs
  const exportFilteredToExcel = () => {
    if (filteredCandidates.length === 0) {
      alert("No candidates to export!");
      return;
    }
    const dataToExport = filteredCandidates.map(({ resume, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "filtered_candidates.xlsx"
    );
  };

  // Export single candidate
  const exportSingleCandidate = (candidate) => {
    const { resume, ...data } = candidate;
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidate");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      `candidate_${candidate.id}.xlsx`
    );
  };

  const showMore = () => setVisibleCount((prev) => prev + 5);

  // Derive mainSubcategory options based on selected category
  const mainSubcategoryOptions =
    selectedCategory !== "All" &&
    categoryToMainSubcategories[selectedCategory]
      ? ["All", ...categoryToMainSubcategories[selectedCategory]]
      : [];

return (
  <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight drop-shadow-sm">
        Dashboard
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {/* Category filter */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedMainSubcategory("All");
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Main Subcategory filter */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Main Skill
          </label>
          <select
            value={selectedMainSubcategory}
            onChange={(e) => setSelectedMainSubcategory(e.target.value)}
            disabled={
              selectedCategory === "All" ||
              !categoryToMainSubcategories[selectedCategory]
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            <option value="All">All</option>
            {mainSubcategoryOptions.map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>

        {/* Age Range */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Age Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Gender
          </label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Experience (Years)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minExp}
              onChange={(e) => setMinExp(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxExp}
              onChange={(e) => setMaxExp(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
          </div>
        </div>

        {/* Entered By */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Entered By
          </label>
          <input
            type="text"
            placeholder="Username / Admin"
            value={enteredBy}
            onChange={(e) => setEnteredBy(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
          />
        </div>

        {/* Date of Entry */}
        <div className="bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-sm p-3">
          <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-200">
            Date of Entry
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={exportFilteredToExcel}
          className="px-6 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-md hover:opacity-90 hover:scale-[1.02] transition transform backdrop-blur-md"
        >
          Export Filtered to Excel
        </button>
      </div>

      {loading && <p className="text-center mb-4">Loading...</p>}

      {/* Candidates Table */}
      <div className="overflow-x-auto bg-white/40 dark:bg-dark-surface/60 backdrop-blur-lg rounded-lg shadow-xl border border-white/40 dark:border-dark-primary/30">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-light-primary/90 dark:bg-dark-primary text-white sticky top-0 shadow-sm">
            <tr>
              {[
                "Name","Category","Sub Category","Skills","Qualification",
                "Experience","Fresher","Age","Gender","City","State",
                "Country","Mobile","WhatsApp Number","Email",
                "Referred By","Entered By","Date of Entry","Actions"
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.slice(0, visibleCount).map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b border-gray-200/40 dark:border-gray-700/40 transition ${
                  idx % 2 === 0
                    ? "bg-white/50 dark:bg-dark-surface/40"
                    : "bg-transparent"
                } hover:bg-light-primary/10 dark:hover:bg-dark-primary/20`}
              >
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3">{c.category}</td>
                <td className="px-4 py-3">{c.main_subcategory}</td>
                <td className="px-4 py-3">{c.subcategory}</td>
                <td className="px-4 py-3">{c.qualification}</td>
                <td className="px-4 py-3">{c.experience ? `${c.experience} yrs` : "—"}</td>
                <td className="px-4 py-3">
                  {c.fresher === true ? "Yes" : c.fresher === false ? "No" : "—"}
                </td>
                <td className="px-4 py-3">{c.age || "—"}</td>
                <td className="px-4 py-3">{c.gender}</td>
                <td className="px-4 py-3">{c.city}</td>
                <td className="px-4 py-3">{c.state}</td>
                <td className="px-4 py-3">{c.country}</td>
                <td className="px-4 py-3">{c.mobile}</td>
                <td className="px-4 py-3">{c.mobile_whatsapp}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.referredby}</td>
                <td className="px-4 py-3">{c.enteredby}</td>
                <td className="px-4 py-3">
                  {c.dataofentry && new Date(c.dataofentry).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <a
                    href={`${BASE}/resume/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-light-primary dark:bg-dark-primary text-white rounded-md text-xs hover:opacity-90 transition"
                  >
                    Resume
                  </a>
                  <button
                    onClick={() => exportSingleCandidate(c)}
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-xs hover:bg-green-700 transition"
                  >
                    Excel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More */}
      {visibleCount < filteredCandidates.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMore}
            className="px-8 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-md hover:scale-105 transition transform"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default Dashboard;
