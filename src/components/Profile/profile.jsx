import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const API_BASE = 'https://atomicabackend.onrender.com/api';
  const PASSWORD_BASE = 'https://atomicabackend.onrender.com/api';

  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    state: '',
    city: '',
    mobile: '',
    mobile_whatsapp: '',
    email: '',
    category: '',
    subcategory: '',
    main_subcategory: '',
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

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidates/${userId}`);
        setProfile({
          name: res.data.name || '',
          age: res.data.age || '',
          gender: res.data.gender || '',
          state: res.data.state || '',
          city: res.data.city || '',
          mobile: res.data.mobile || '',
          mobile_whatsapp: res.data.mobile_whatsapp || '',
          email: res.data.email || '',
          category: res.data.category || '',
          subcategory: res.data.subcategory || '',
          main_subcategory: res.data.main_subcategory || '',
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        alert('Failed to fetch profile data.');
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0] || null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage('');
    try {
      const formData = new FormData();
      for (const key in profile) {
        formData.append(key, profile[key]);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await axios.put(`${API_BASE}/candidates/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfileMessage(res.data.message || 'Profile updated successfully');
    } catch (err) {
      console.error('Profile update error:', err);
      setProfileMessage(err.response?.data?.error || 'Failed to update profile');
    }
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage('');

    if (!oldPassword || !newPassword) {
      alert('Please fill both old and new password fields');
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await axios.put(`${PASSWORD_BASE}/update-password/${userId}`, {
        oldPassword,
        newPassword,
      });

      setPasswordMessage(res.data.message || 'Password updated successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      console.error('Password update error:', err);
      setPasswordMessage(err.response?.data?.error || 'Failed to update password');
    }

    setPasswordLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

return (
  <>
    <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient transition-colors duration-500 text-light-text dark:text-dark-text flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700 transition-all">
        <h1 className="text-3xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
          Welcome, {userName}
        </h1>

        <div>
          <h2 className="text-2xl font-heading font-semibold text-light-primary dark:text-dark-primary mb-4">
            Update Profile
          </h2>
          <form onSubmit={handleProfileSubmit} encType="multipart/form-data" className="space-y-4">

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
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
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="text"
              name="mobile_whatsapp"
              value={profile.mobile_whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp Mobile"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <select
              name="category"
              value={profile.category}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
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
              className={`w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition ${
                !profile.category ? 'opacity-50 cursor-not-allowed' : ''
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
              placeholder="Subcategory (Skills, comma-separated)"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-light-primary file:text-white hover:file:opacity-90 dark:file:bg-dark-primary transition"
            />

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-3 font-heading bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              {profileLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {profileMessage && (
            <p className="mt-3 text-center text-green-600 dark:text-green-400">{profileMessage}</p>
          )}
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-600" />

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
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New Password"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-3 font-heading bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              {passwordLoading ? 'Updating...' : 'Change Password'}
            </button>
          </form>

          {passwordMessage && (
            <p className="mt-3 text-center text-green-600 dark:text-green-400">{passwordMessage}</p>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="py-2 px-6 font-heading bg-red-600 dark:bg-red-700 text-white rounded-lg font-semibold hover:bg-red-700 dark:hover:bg-red-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </>
);

}