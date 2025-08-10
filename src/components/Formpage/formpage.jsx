import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    resume: null,
    enteredby: ''
  });

  const categories = ['MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef', 'Waiters', 'General Categories', 'Warehouse', 'Lab Technicians'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const {
      name, age, gender, state, city,
      mobile, mobile_whatsapp, email, category, resume
    } = formData;

    if (!resume) {
      alert('Please upload a resume.');
      return;
    }

    if (!allowedFileTypes.includes(resume.type)) {
      alert('Resume must be a PDF or Word document (DOC/DOCX).');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!mobileRegex.test(mobile)) {
      alert('Mobile number must be 10 digits.');
      return;
    }

    if (mobile_whatsapp !== '00' && !mobileRegex.test(mobile_whatsapp)) {
      alert('WhatsApp number must be 10 digits or "00".');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post('https://atomicabackend.onrender.com/api/submit', data);
      alert('Submitted successfully!');
      setFormData({
        name: '', age: '', gender: '', state: '', city: '',
        mobile: '', mobile_whatsapp: '', email: '',
        category: '', subcategory: '', resume: null
      });
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <>
      <div className="min-h-screen font-body bg-light-gradient dark:bg-dark-gradient transition-colors duration-500 text-light-text dark:text-dark-text flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 transition-all">
          <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary">
            Candidate Information Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Name" onChange={handleChange} name="name" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />

            <input required type="number" placeholder="Age" onChange={handleChange} name="age" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />

            <select required name="gender" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input required placeholder="State" name="state" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />
            <input required placeholder="City" name="city" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />
            <input required placeholder="Mobile" name="mobile" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />
            <input required placeholder="WhatsApp Number(Enter 00 if not available)" name="mobile_whatsapp" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />
            <input required placeholder="Email" name="email" type="email" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />

            <select required name="category" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <input placeholder="Skills (comma-separated)" name="subcategory" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface" />
            <input
              required
              placeholder="Entered by"
              name="enteredby"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
            />
            <input required 
              type="file"
              name="resume"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold  file:bg-light-primary  file:text-white hover:file:opacity-90 dark:file:bg-dark-primary"
            />

            <button type="submit" className="w-full py-3 font-headline bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition">
              Submit
            </button>
          </form>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="mt-4 text-sm font-body text-light-primary dark:text-dark-primary hover:underline"
            >
              ← To Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}