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
    main_subcategory: '',
    subcategory: '',
    resume: null,
    enteredby: ''
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

  const categories = ['MBBS', 'MD', 'BDS', 'MDS', 'IT', 'Chef', 'Waiters', 'GeneralCategories', 'Warehouse', 'Lab Technicians'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else if (name === 'category') {
      setFormData({ ...formData, category: value, main_subcategory: '' });  // reset main_subcategory on category change
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
      mobile, mobile_whatsapp, email, category, main_subcategory, resume
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

    if (!main_subcategory) {
      alert('Please select a main subcategory.');
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
        category: '', main_subcategory: '', subcategory: '', resume: null,
        enteredby: ''
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
            <input
              required
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.name}
            />

            <input
              required
              type="number"
              placeholder="Age"
              onChange={handleChange}
              name="age"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.age}
            />

            <select
              required
              name="gender"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              required
              placeholder="State"
              name="state"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.state}
            />

            <input
              required
              placeholder="City"
              name="city"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.city}
            />

            <input
              required
              placeholder="Mobile"
              name="mobile"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.mobile}
            />

            <input
              required
              placeholder="WhatsApp Number(Enter 00 if not available)"
              name="mobile_whatsapp"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.mobile_whatsapp}
            />

            <input
              required
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.email}
            />

            <select
              required
              name="category"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              value={formData.category}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Main Subcategory dropdown added */}
            <select
              required
              name="main_subcategory"
              value={formData.main_subcategory}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface"
              disabled={!formData.category} // disable if no category selected
            >
              <option value="">Select Main Subcategory</option>
              {formData.category && categoryToMainSubcategories[formData.category]?.map((msc) => (
                <option key={msc} value={msc}>
                  {msc}
                </option>
              ))}
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
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
