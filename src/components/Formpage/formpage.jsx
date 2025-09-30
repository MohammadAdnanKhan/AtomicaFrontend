import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Key } from "lucide-react";

export default function FormPage() {
  const navigate = useNavigate();
  
  const API_URL ="https://atomicabackend.onrender.com/api/submit";
  // const API_URL="http://localhost:5000/api/submit";
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    state: '',
    city: '',
    country: '',
    mobile: '',
    mobile_whatsapp: '',
    email: '',
    category: '',
    main_subcategory: '',
    subcategory: '',
    qualification: '',
    experience: '',
    fresher: 'No',
    referredby: '',
    enteredby: '',
    resume: null
  });
  
  const jobOptions = [
    "Nurses",
    "Administrative Manager",
    "Accountant",
    "Senior Accountant",
    "Software Professional",
    "Drivers",
    "Helpers",
  ];
  const qualificationOptions = [
    "BA",
    "BSc",
    "BCom",
    "MBBS",
    "MD",
    "BDS",
    "MDS",
    "BPharm",
    "BE",
    "BBA",
    "MBA",
    "10th",
    "12th",
    "Diploma",
    "IIT",
  ];
  const ageOptions = [
    "Less than 30 Years",
    "Up to 35 Years",
    "Up to 40 Years",
    "Up to 42 Years",
    "Up to 49 Years",
  ];
  const processingOptions = [
    "3 Months",
    "3 to 5 Months",
    "6 Months",
    "12 Months",
    "More than 12 Months"
  ];
  const examOptions = ["IELTS", "TOEFL", "PTE", "OET", "French", "German","Other"];
  
  // Job Form state
  const [jobForm, setJobForm] = useState({
    country_name: "",
    qualification: "",
    job_name: "",
    min_experience: "",
    salary: "",
    salary_currency: "",
    age_criteria: "",
    food: false,
    accommodation: false,
    processing_time: "",
    exams: "",
    transportation: false,
    service_charge_lakhs: "",
    service_charge_thousands: "",
    payment_terms: "",
    job_description: "",
  });

  const [jobPoster, setJobPoster] = useState(null);
const countryList = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
  "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan",
  "Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
  "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
  "Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
  "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia",
  "Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
  "Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
  "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

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

  const categories = Object.keys(categoryToMainSubcategories);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else if (name === 'category') {
      setFormData({ ...formData, category: value, main_subcategory: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\+?[0-9\s\-()]{7,20}$/; // matches backend
  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const {
    name, age, gender, state, city, country,
    mobile, mobile_whatsapp, email, category, main_subcategory, resume,
    subcategory, qualification, experience, fresher, referredby, enteredby
  } = formData;

  // Validations
  if (!resume) return alert('Please upload a resume.');
  if (!allowedFileTypes.includes(resume.type)) return alert('Resume must be a PDF or Word document (DOC/DOCX).');
  if (!emailRegex.test(email)) return alert('Please enter a valid email address.');
  if (!mobileRegex.test(mobile)) return alert('Please enter a valid mobile number (7–20 digits, +, spaces, -, () allowed).');
  if (mobile_whatsapp && mobile_whatsapp !== '00' && !mobileRegex.test(mobile_whatsapp)) 
    return alert('Please enter a valid WhatsApp number (or 00 if not available).');
  if (!main_subcategory) return alert('Please select a main subcategory.');

  // Prepare form data for backend
  const data = new FormData();
  data.append('name', name);
  data.append('age', age || ''); // backend handles null
  data.append('gender', gender);
  data.append('state', state);
  data.append('city', city);
  data.append('country', country);
  data.append('mobile', mobile);
  data.append('mobile_whatsapp', mobile_whatsapp || ''); 
  data.append('email', email);
  data.append('category', category);
  data.append('main_subcategory', main_subcategory);
  data.append('subcategory', subcategory || '');
  data.append('qualification', qualification || '');
  data.append('experience', experience || '');
  data.append('fresher', fresher); // backend converts to boolean
  data.append('referredby', referredby || '');
  data.append('enteredby', enteredby || '');
  data.append('resume', resume);

  try {
    await axios.post(API_URL, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Submitted successfully!');

    // Reset form
    setFormData({
      name: '', age: '', gender: '', state: '', city: '', country: '',
      mobile: '', mobile_whatsapp: '', email: '',
      category: '', main_subcategory: '', subcategory: '',
      qualification: '', experience: '', fresher: 'No',
      referredby: '', enteredby: '', resume: null
    });
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || 'Submission failed.');
  }
};

  // Job Handlers
  const handleJobChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobForm({
      ...jobForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // const JOB_URL="http://localhost:5000/api/job";
  const JOB_URL="https://atomicabackend.onrender.com/api/job";
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(jobForm).forEach((key) => data.append(key, jobForm[key]));
    if (jobPoster) data.append("poster", jobPoster);

    try {
      await axios.post(JOB_URL, data);
      alert("Job form submitted!");
      setJobForm({
        country_name: "",
        qualification: "",
        job_name: "",
        min_experience: "",
        salary: "",
        salary_currency: "",
        age_criteria: "",
        food: false,
        accommodation: false,
        processing_time: "",
        exams: "",
        transportation: false,
        service_charge_lakhs: "",
        service_charge_thousands: "",
        payment_terms: "",
        job_description: "",
      });
      setJobPoster(null);
    } catch (err) {
      console.error(err);
      alert('Job submission failed.');
    }
  };

  return (
    <>
      <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient transition-colors duration-500 text-light-text dark:text-dark-text flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Form */}
          <div className="bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
              Candidate Information Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                type="number"
                placeholder="Age"
                name="age"
                onChange={handleChange}
                value={formData.age}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <select
                required
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                required
                placeholder="Country"
                name="country"
                onChange={handleChange}
                value={formData.country}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                placeholder="State"
                name="state"
                onChange={handleChange}
                value={formData.state}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                placeholder="City"
                name="city"
                onChange={handleChange}
                value={formData.city}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />

              <input
                required
                placeholder="Mobile (+CountryCode)"
                name="mobile"
                onChange={handleChange}
                value={formData.mobile}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                placeholder="WhatsApp Number (00 if NA)"
                name="mobile_whatsapp"
                onChange={handleChange}
                value={formData.mobile_whatsapp}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />

              <select
                required
                name="category"
                onChange={handleChange}
                value={formData.category}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                required
                name="main_subcategory"
                disabled={!formData.category}
                onChange={handleChange}
                value={formData.main_subcategory}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Main Subcategory</option>
                {formData.category &&
                  categoryToMainSubcategories[formData.category]?.map(
                    (msc) => <option key={msc}>{msc}</option>
                  )}
              </select>
              <input
                placeholder="Skills (comma-separated)"
                name="subcategory"
                onChange={handleChange}
                value={formData.subcategory}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                placeholder="Qualification"
                name="qualification"
                onChange={handleChange}
                value={formData.qualification}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                placeholder="Experience (years)"
                name="experience"
                type="number"
                onChange={handleChange}
                value={formData.experience}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <select
                name="fresher"
                onChange={handleChange}
                value={formData.fresher}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="No">Not a Fresher</option>
                <option value="Yes">Fresher</option>
              </select>
              <input
                placeholder="Referred by"
                name="referredby"
                onChange={handleChange}
                value={formData.referredby}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                required
                placeholder="Entered by"
                name="enteredby"
                onChange={handleChange}
                value={formData.enteredby}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Upload Resume (PDF)
              </label>
              <input
                required
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold  file:bg-light-primary file:text-white hover:file:opacity-90 dark:file:bg-dark-primary"
              />

              <button
                type="submit"
                className="w-full py-3 font-headline bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Job Form */}
          <div className="bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
              Job Information Form
            </h2>

            <form onSubmit={handleJobSubmit} className="space-y-4">
              <select 
              required 
              name="country_name" 
              onChange={handleJobChange} 
              value={jobForm.country_name} 
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" > 
              <option value="">Select Country</option> 
              {countryList.map((c) => ( 
                <option key={c} value={c}> {c} </option> 
                ))} 
                </select>
              <select
                name="qualification"
                onChange={handleJobChange}
                value={jobForm.qualification}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Qualification</option>
                {qualificationOptions.map((q) => (
                  <option key={q}>{q}</option>
                ))}
              </select>
              <select
                name="job_name"
                onChange={handleJobChange}
                value={jobForm.job_name}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Job</option>
                {jobOptions.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>

              <input
                type="number"
                name="min_experience"
                placeholder="Minimum Years of Experience"
                onChange={handleJobChange}
                value={jobForm.min_experience}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                onChange={handleJobChange}
                value={jobForm.salary}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                type="text"
                name="salary_currency"
                placeholder="Currency (AED, INR, etc.)"
                onChange={handleJobChange}
                value={jobForm.salary_currency}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />

              <select
                name="age_criteria"
                onChange={handleJobChange}
                value={jobForm.age_criteria}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Age Criteria</option>
                {ageOptions.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="food"
                  checked={jobForm.food}
                  onChange={handleJobChange}
                />
                Food Provided
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="accommodation"
                  checked={jobForm.accommodation}
                  onChange={handleJobChange}
                />
                Accommodation Provided
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="transportation"
                  checked={jobForm.transportation}
                  onChange={handleJobChange}
                />
                Transportation Provided
              </label>

              <select
                name="processing_time"
                onChange={handleJobChange}
                value={jobForm.processing_time}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                <option value="">Select Processing Time</option>
                {processingOptions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <select
                name="exams"
                multiple
                onChange={handleJobChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              >
                {examOptions.map((ex) => (
                  <option key={ex}>{ex}</option>
                ))}
              </select>

              <input
                type="number"
                name="service_charge_lakhs"
                placeholder="Service Charge (Lakhs)"
                onChange={handleJobChange}
                value={jobForm.service_charge_lakhs}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <input
                type="number"
                name="service_charge_thousands"
                placeholder="Service Charge (Thousands)"
                onChange={handleJobChange}
                value={jobForm.service_charge_thousands}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />

              <textarea
                name="payment_terms"
                placeholder="Payment Terms"
                onChange={handleJobChange}
                value={jobForm.payment_terms}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />
              <textarea
                name="job_description"
                placeholder="Job Description"
                onChange={handleJobChange}
                value={jobForm.job_description}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              />

          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Upload Poster (Image file only: JPG, PNG)
          </label>
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={(e) => setJobPoster(e.target.files[0])}
            className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                      file:text-sm file:font-semibold file:bg-light-primary file:text-white 
                      hover:file:opacity-90 dark:file:bg-dark-primary"
          />
              <button
                type="submit"
        
                className="w-full py-3 font-headline bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit Job
              </button>
            </form>
          </div>
        </div>

        {/* Change Password Button */}
        <button
          onClick={() => (window.location.href = "/admin/change-password")}
          className="fixed bottom-6 right-6 bg-light-primary dark:bg-dark-primary text-white p-4 rounded-full shadow-lg hover:opacity-90 transition flex items-center justify-center"
          aria-label="Change Password"
        >
          <Key size={20} />
        </button>
      </div>
    </>
  );
}