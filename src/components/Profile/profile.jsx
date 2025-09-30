import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  
  // const API_BASE = "http://localhost:5000/api";
  // const PASSWORD_BASE = "http://localhost:5000/api";
  const API_BASE = "https://atomicabackend.onrender.com/api";
  const PASSWORD_BASE = "https://atomicabackend.onrender.com/api";

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
const [resumeFile, setResumeFile] = useState(null);
const [resumeName, setResumeName] = useState("");
const [resumeUrl, setResumeUrl] = useState(null);

const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");

const [profileLoading, setProfileLoading] = useState(false);
const [profileMessage, setProfileMessage] = useState("");

const [passwordLoading, setPasswordLoading] = useState(false);
const [passwordMessage, setPasswordMessage] = useState("");

useEffect(() => {
  if (!userId) {
    navigate("/login");
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/candidates/${userId}`);
      setProfile({
        ...res.data,
        fresher: res.data.fresher ?? false,
      });

      // Fetch resume only if available
      const resumeRes = await axios.get(`${API_BASE}/resume/${userId}`, {
        responseType: "blob",
      });

      if (resumeRes.data) {
        const file = new Blob([resumeRes.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setResumeUrl(fileURL);
        setResumeName("Existing Resume");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      alert("Failed to fetch profile data.");
    }
  };

  fetchProfile();
}, [userId, navigate]);

// 🔹 Handle input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setProfile((prev) => ({ ...prev, [name]: value }));
};

// 🔹 Fresher toggle
const handleFresherChange = (e) => {
  setProfile((prev) => ({ ...prev, fresher: e.target.value === "Yes" }));
};

// 🔹 File change
const handleFileChange = (e) => {
  const file = e.target.files[0];
  setResumeFile(file || null);
  setResumeName(file ? file.name : "");
};

// 🔹 Submit profile update
const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setProfileLoading(true);
  setProfileMessage("");
  try {
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    const res = await axios.put(`${API_BASE}/candidates/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setProfileMessage(res.data.message || "Profile updated successfully");

    // Refresh resume preview if new file uploaded
    if (resumeFile) {
      const fileURL = URL.createObjectURL(resumeFile);
      setResumeUrl(fileURL);
      setResumeName(resumeFile.name);
    }
  } catch (err) {
    console.error("Profile update error:", err);
    setProfileMessage(err.response?.data?.error || "Failed to update profile");
  }
  setProfileLoading(false);
};

// 🔹 Submit password update
const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  setPasswordLoading(true);
  setPasswordMessage("");

  if (!oldPassword || !newPassword) {
    alert("Please fill both old and new password fields");
    setPasswordLoading(false);
    return;
  }

  try {
    const res = await axios.put(`${PASSWORD_BASE}/update-password/${userId}`, {
      oldPassword,
      newPassword,
    });

    setPasswordMessage(res.data.message || "Password updated successfully! Kindly remember your new password");
    setOldPassword("");
    setNewPassword("");
  } catch (err) {
    console.error("Password update error:", err);
    setPasswordMessage(err.response?.data?.error || "Failed to update password");
  }

  setPasswordLoading(false);
};

// 🔹 Logout
const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

  return (
    <>
      <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient transition-colors duration-500 text-light-text dark:text-dark-text flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700 transition-all">
          <h1 className="text-3xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
            Welcome, {userName}
          </h1>

          {/* Profile Section */}
          <div className="text-black">
            <h2 className="text-2xl font-heading font-semibold text-light-primary dark:text-dark-primary mb-4">
              Update Profile
            </h2>
            <form
              onSubmit={handleProfileSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
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

              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-3 rounded-lg border"
              />

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
                className={`w-full p-3 rounded-lg border ${
                  !profile.category ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                placeholder="Experience (years in decimal)"
                className="w-full p-3 rounded-lg border"
              />
            <select
              name="fresher"
              value={profile.fresher ? "Yes" : "No"}
              onChange={handleFresherChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
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

              {/* Read-only fields */}
              <input
                type="text"
                value={profile.enteredby}
                readOnly
                placeholder="Entered By"
                className="w-full p-3 rounded-lg border bg-gray-100"
              />

              <input
                type="text"
                value={
                  profile.dataofentry
                    ? new Date(profile.dataofentry).toLocaleDateString()
                    : ""
                }
                readOnly
                placeholder="Date of Entry"
                className="w-full p-3 rounded-lg border bg-gray-100"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                required
              />
              <button
                type="submit"
                disabled={profileLoading}
                className="w-full py-3 font-heading bg-light-primary text-white rounded-lg"
              >
                {profileLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>

            {profileMessage && (
              <p className="mt-3 text-center text-green-600">{profileMessage}</p>
            )}
          </div>

          <hr className="my-8 border-gray-300" />

          {/* Change Password Section */}
          <div>
            <h2 className="text-2xl font-heading font-semibold text-light-primary dark:text-dark-primary mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Old Password"
                className="w-full p-3 rounded-lg border"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
                className="w-full p-3 rounded-lg border"
              />

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-3 font-heading bg-light-primary text-white rounded-lg"
              >
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </form>

            {passwordMessage && (
              <p className="mt-3 text-center text-green-600">
                {passwordMessage}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleLogout}
              className="py-2 px-6 font-heading bg-red-600 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
