import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const API_BASE = "https://atomicabackend.onrender.com/api"; 
// const API_BASE = "http://localhost:5000/api"; 

export default function EditCandidateModal({ candidateId, onClose, onUpdated }) {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    city: "",
    country: "",
    mobile: "",
    mobile_whatsapp: "",
    email: "",
    category: "",
    subcategory: "",
    main_subcategory: "",
    qualification: "",
    experience: "",
    preferredCountry: "",
    fresher: false,
    referredby: "",
    enteredby: "",
    dataofentry: "",
  });

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

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [resumeUrl, setResumeUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!candidateId) return;

    const fetchCandidate = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidates/${candidateId}`);
        const data = res.data;
        setProfile({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          state: data.state || "",
          city: data.city || "",
          country: data.country || "",
          mobile: data.mobile || "",
          mobile_whatsapp: data.mobile_whatsapp || "",
          email: data.email || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          main_subcategory: data.main_subcategory || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          preferredCountry: data.preferredCountry || "",
          fresher: data.fresher ?? false,
          referredby: data.referredby || "",
          enteredby: data.enteredby || "",
          dataofentry: data.dataofentry || "",
        });

        // Try to fetch resume (if present)
        try {
          const resumeRes = await axios.get(`${API_BASE}/resume/${candidateId}`, {
            responseType: "blob",
          });
          if (resumeRes.data) {
            const file = new Blob([resumeRes.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            setResumeUrl(fileURL);
            setResumeName("Existing Resume");
          }
        } catch (err) {
          // no resume or failed; ignore
          setResumeUrl(null);
          setResumeName("");
        }
      } catch (err) {
        console.error("Error fetching candidate:", err);
        alert("Failed to fetch candidate details.");
        onClose();
      }
    };

    fetchCandidate();
  }, [candidateId, onClose]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFresherChange = (e) => {
    setProfile((prev) => ({ ...prev, fresher: e.target.value === "Yes" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file || null);
    setResumeName(file ? file.name : "");
    if (file) {
      setResumeUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const fd = new FormData();
      // append all fields matching your backend expectation
      fd.append("name", profile.name);
      fd.append("age", profile.age);
      fd.append("gender", profile.gender);
      fd.append("state", profile.state);
      fd.append("city", profile.city);
      fd.append("country", profile.country);
      fd.append("mobile", profile.mobile);
      fd.append("mobile_whatsapp", profile.mobile_whatsapp);
      fd.append("email", profile.email);
      fd.append("category", profile.category);
      fd.append("subcategory", profile.subcategory);
      fd.append("main_subcategory", profile.main_subcategory);
      fd.append("enteredby", profile.enteredby);
      fd.append("qualification", profile.qualification);
      fd.append("experience", profile.experience);
      fd.append("preferredCountry", profile.preferredCountry);
      // fresher expected on backend as boolean or "yes"/"no" — keep boolean
      fd.append("fresher", profile.fresher ? "true" : "false");
      fd.append("referredby", profile.referredby);

      if (resumeFile) {
        fd.append("resume", resumeFile);
      }

      const res = await axios.put(`${API_BASE}/candidates/${candidateId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Updated successfully");
      onUpdated && onUpdated(); // notify parent to refresh list
      // keep modal open for review or close automatically:
      // onClose();
    } catch (err) {
      console.error("Update candidate error:", err);
      setMessage(err.response?.data?.error || "Failed to update candidate");
    } finally {
      setLoading(false);
    }
  };

  // resume download/view
  const handleOpenResume = () => {
    if (resumeUrl) window.open(resumeUrl, "_blank");
    else window.open(`${API_BASE}/resume/${candidateId}`, "_blank");
  };

  if (!candidateId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-6 overflow-auto max-h-[90vh] relative border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary mb-4">
          Edit Candidate - {profile.name}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 dark:text-black">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-3 rounded-lg border"
          />

          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="state"
            value={profile.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-3 rounded-lg border"
          />

          <select
            name="country"
            value={profile.country}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
            >
            <option value="">Select Country</option>
            {countryList.map((c) => (
                <option key={c} value={c}>
                {c}
                </option>
            ))}
            </select>

          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="text"
            name="mobile_whatsapp"
            value={profile.mobile_whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Mobile"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-3 rounded-lg border"
          />

          <select
            name="category"
            value={profile.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border"
          >
            <option value="">Select Category</option>
            {Object.keys(categoryToMainSubcategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="main_subcategory"
            value={profile.main_subcategory}
            onChange={handleChange}
            disabled={!profile.category}
            required={!!profile.category}
            className={`w-full p-3 rounded-lg border ${!profile.category ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <option value="">Select Main Subcategory</option>
            {profile.category &&
              categoryToMainSubcategories[profile.category]?.map((msc) => (
                <option key={msc} value={msc}>
                  {msc}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="subcategory"
            value={profile.subcategory}
            onChange={handleChange}
            placeholder="Enter your skills"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="text"
            name="qualification"
            value={profile.qualification}
            onChange={handleChange}
            placeholder="Qualification"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="text"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            className="w-full p-3 rounded-lg border"
          />

            <select
            name="preferredCountry"
            value={profile.preferredCountry}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
            >
            <option value="">Select Preferred Country</option>
            {countryList.map((c) => (
                <option key={c} value={c}>
                {c}
                </option>
            ))}
            </select>

          <select
            name="fresher"
            value={profile.fresher ? "Yes" : "No"}
            onChange={handleFresherChange}
            className="w-full p-3 rounded-lg border"
          >
            <option value="" disabled>
              Are you a fresher?
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <input
            type="text"
            name="referredby"
            value={profile.referredby}
            onChange={handleChange}
            placeholder="Referred By"
            className="w-full p-3 rounded-lg border"
          />

          <input
            type="text"
            value={profile.enteredby}
            readOnly
            placeholder="Entered By"
            className="w-full p-3 rounded-lg border bg-gray-100"
          />

          <input
            type="text"
            value={profile.dataofentry ? new Date(profile.dataofentry).toLocaleDateString() : ""}
            readOnly
            placeholder="Date of Entry"
            className="w-full p-3 rounded-lg border bg-gray-100"
          />

          <label className="block mb-2 text-sm font-medium dark:text-white">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg border"
          />

          <div className="flex gap-3 items-center dark:text-white">
            {resumeName && <div className="text-sm">{resumeName}</div>}
            {resumeUrl && (
              <button type="button" onClick={handleOpenResume} className="text-xs px-3 py-1 bg-blue-600 text-white rounded">
                View Resume
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-heading bg-light-primary text-white rounded-lg"
          >
            {loading ? "Updating..." : "Update Candidate"}
          </button>

          {message && <p className="mt-2 text-center text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}
