import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', state: '', city: '',
    mobile: '', mobile_whatsapp: '', email: '', category: '', subcategory: '',
  });

  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`https://atomicabackend.onrender.com/api/candidates/${userId}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file && !allowedTypes.includes(file.type)) {
      setMessage("Invalid file type. Only PDF or DOC/DOCX allowed.");
      setResume(null);
    } else {
      setResume(file);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      setMessage("Invalid email format.");
      return;
    }

    if (!mobileRegex.test(formData.mobile) || !mobileRegex.test(formData.mobile_whatsapp)) {
      setMessage("Mobile numbers must be 10 digits.");
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    if (resume) {
      data.append("resume", resume);
    }

    try {
      const response = await axios.put(`https://atomicabackend.onrender.com/api/candidates/${userId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setMessage("Update failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text animate-fadeIn px-6 md:px-10 py-12 transition-colors duration-500 font-body">
      <div className="max-w-4xl mx-auto bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8 md:p-10 space-y-8">
        
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
          Edit Profile
        </h2>

        {message && (
          <p className="text-center text-light-primary dark:text-dark-primary font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={key.replace('_', ' ').toUpperCase()}
                className="w-full px-4 py-3 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
              />
            ))}
          </div>

          <div>
            <label className="block mb-2 font-medium text-light-secondary dark:text-dark-secondary font-heading">
              Upload Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-light-text dark:text-dark-text file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 file:bg-light-primary dark:file:bg-dark-primary file:text-white hover:file:bg-light-accent dark:hover:file:bg-dark-accent"
            />
            {resume && (
              <p className="text-sm text-light-secondary dark:text-dark-secondary mt-2">
                Selected: {resume.name}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </form>

        <div className="border-t border-light-secondary dark:border-dark-secondary pt-8">
          <h3 className="text-2xl font-heading font-semibold mb-5 text-light-primary dark:text-dark-primary">
            Change Password
          </h3>

          {passwordMessage && (
            <p className="text-light-primary dark:text-dark-primary font-medium mb-4">
              {passwordMessage}
            </p>
          )}

          <div className="space-y-5">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
            />

            <button
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `https://atomicabackend.onrender.com/api/update-password/${userId}`,
                    { oldPassword, newPassword }
                  );
                  setPasswordMessage(res.data.message);
                  setOldPassword('');
                  setNewPassword('');
                } catch (err) {
                  const msg = err.response?.data?.error || 'Password update failed';
                  setPasswordMessage(msg);
                }
              }}
              className="w-full bg-light-primary dark:bg-dark-primary text-white py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-dark-accent transition duration-200"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
