import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', state: '', city: '',
    mobile: '', mobile_whatsapp: '', email: '', category: '', subcategory: '',
  });

  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`https://atomicabackend.onrender.com/api/candidates/${userId}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }

    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      console.log("✅ Update response:", response.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      setMessage("Update failed.");
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.replace('_', ' ').toUpperCase()}
            className="w-full p-2 border rounded"
          />
        ))}
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
        <button
  onClick={() => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/'); 
  }}
  className="mt-4 bg-red-600 text-white py-2 px-4 rounded w-full"
>
  Logout
</button>

      </form>
    </div>
  );
}
