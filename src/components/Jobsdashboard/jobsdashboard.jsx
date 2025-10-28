import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // for close icon

// const JOB_URL = "http://localhost:5000/api/job";
const JOB_URL = "https://atomicabackend.onrender.com/api/job";

const JobsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [editingJob, setEditingJob] = useState(null);
  const [jobPoster, setJobPoster] = useState(null);
  const [jobForm, setJobForm] = useState({});
  const [loading, setLoading] = useState(false);

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
    "BA", "BSc", "BCom", "MBBS", "MD", "BDS", "MDS",
    "BPharm", "BE", "BBA", "MBA", "10th", "12th", "Diploma", "IIT",
  ];
  const ageOptions = [
    "Less than 30 Years", "Up to 35 Years", "Up to 40 Years",
    "Up to 42 Years", "Up to 49 Years",
  ];
  const processingOptions = [
    "3 Months", "3 to 5 Months", "6 Months", "12 Months", "More than 12 Months",
  ];
  const examOptions = ["IELTS", "TOEFL", "PTE", "OET", "French", "German", "Other"];
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

  // Fetch jobs
  useEffect(() => {
    fetch(`${JOB_URL}s`)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job);
    setJobForm({ ...job });
    setJobPoster(null);
  };

  const handleClose = () => {
    setEditingJob(null);
    setJobForm({});
    setJobPoster(null);
  };

  const handleJobChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExamsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setJobForm((prev) => ({ ...prev, exams: selected }));
  };
const handleViewPoster = async (id) => {
  try {
    const response = await fetch(`${JOB_URL}/${id}/poster`);
    if (!response.ok) throw new Error("Failed to fetch poster");

    // Convert the binary image to an object URL
    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);

    // Open in a new tab
    window.open(imageURL, "_blank");
  } catch (err) {
    console.error(err);
    alert("Poster not available.");
  }
};

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    setLoading(true);

    const formData = new FormData();
    for (const key in jobForm) {
      if (key === "exams" && Array.isArray(jobForm[key])) {
        jobForm[key].forEach((ex) => formData.append("exams", ex));
      } else {
        formData.append(key, jobForm[key]);
      }
    }
    if (jobPoster) formData.append("poster", jobPoster);

    try {
      const res = await fetch(`${JOB_URL}/${editingJob.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update job");
      const data = await res.json();

      setJobs((prev) =>
        prev.map((j) => (j.id === editingJob.id ? data.job : j))
      );
      setEditingJob(null);
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Error updating job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${JOB_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting job");
    }
  };

  const showMore = () => setVisibleCount((prev) => prev + 20);

  return (

    <div className="min-h-screen font-body transition-colors duration-500 bg-light-gradient dark:bg-dark-gradient text-light-text dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Title */}
        <h2 className="text-4xl font-heading font-bold mb-8 text-light-primary dark:text-dark-primary tracking-tight drop-shadow-sm">
          Jobs Dashboard
        </h2>

        {/* Jobs Table */}
<div className="overflow-x-auto bg-white/30 dark:bg-dark-surface/40 backdrop-blur-md border border-white/40 dark:border-dark-primary/30 rounded-lg shadow-lg">
  <table className="w-full border-collapse text-sm">
    <thead className="bg-light-primary/90 dark:bg-dark-primary text-white sticky top-0 shadow-sm">
      <tr>
        {[
          "Country",
          "Qualification",
          "Job Name",
          "Experience",
          "Salary",
          "Currency",
          "Age Criteria",
          "Food",
          "Accommodation",
          "Transport",
          "Processing Time",
          "Exams",
          "Service (Lakhs)",
          "Service (Thousands)",
          "Payment Terms",
          "Job Description",
          "Actions",
        ].map((h) => (
          <th key={h} className="px-4 py-3 text-left font-semibold">
            {h}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {jobs.slice(0, visibleCount).map((job, idx) => (
        <tr
          key={job.id}
          className={`border-b border-gray-200/40 dark:border-gray-700/40 transition ${
            idx % 2 === 0
              ? "bg-white/40 dark:bg-dark-surface/30"
              : "bg-transparent"
          } hover:bg-light-primary/10 dark:hover:bg-dark-primary/20`}
        >
          <td className="px-4 py-3 font-semibold">{job.country_name}</td>
          <td className="px-4 py-3">{job.qualification}</td>
          <td className="px-4 py-3">{job.job_name}</td>
          <td className="px-4 py-3">{job.min_experience}</td>
          <td className="px-4 py-3">{job.salary}</td>
          <td className="px-4 py-3">{job.salary_currency}</td>
          <td className="px-4 py-3">{job.age_criteria}</td>
          <td className="px-4 py-3">{job.food ? "Yes" : "No"}</td>
          <td className="px-4 py-3">{job.accommodation ? "Yes" : "No"}</td>
          <td className="px-4 py-3">{job.transportation ? "Yes" : "No"}</td>
          <td className="px-4 py-3">{job.processing_time}</td>

        <td className="px-4 py-3">
        {Array.isArray(job.exams)
            ? job.exams.join(", ")
            : job.exams || "—"}
        </td>

          {/* Service Charges */}
          <td className="px-4 py-3">{job.service_charge_lakhs || "—"}</td>
          <td className="px-4 py-3">{job.service_charge_thousands || "—"}</td>

          {/* Payment Terms & Description */}
          <td className="px-4 py-3 truncate max-w-[200px]" title={job.payment_terms}>
            {job.payment_terms || "—"}
          </td>
          <td className="px-4 py-3 truncate max-w-[250px]" title={job.job_description}>
            {job.job_description || "—"}
          </td>

          {/* Actions */}
          <td className="px-4 py-3 flex gap-2 justify-center">
            <button
              onClick={() => handleViewPoster(job.id)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 transition"
            >
              View Poster
            </button>

            <button
              onClick={() => handleEdit(job)}
              className="px-3 py-1 bg-yellow-600 text-white rounded-md text-xs hover:bg-yellow-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(job.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Show More Button */}
        {visibleCount < jobs.length && (
          <div className="text-center mt-8">
            <button
              onClick={showMore}
              className="px-8 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-md hover:scale-105 transition transform"
            >
              Show More
            </button>
          </div>
        )}

        {/* Edit Job Modal */}
        {editingJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-3xl p-8 overflow-y-auto max-h-[90vh] relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center text-light-primary dark:text-dark-primary">
                Edit Job - {jobForm.job_name}
              </h2>

              <form onSubmit={handleJobSubmit} className="space-y-4">
                {/* Country */}
                <select
                  name="country_name"
                  required
                  value={jobForm.country_name || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  <option value="">Select Country</option>
                  {countryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Qualification */}
                <select
                  name="qualification"
                  value={jobForm.qualification || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  <option value="">Select Qualification</option>
                  {qualificationOptions.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>

                {/* Job */}
                <select
                  name="job_name"
                  value={jobForm.job_name || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  <option value="">Select Job</option>
                  {jobOptions.map((j) => (
                    <option key={j}>{j}</option>
                  ))}
                </select>

                {/* Inputs */}
                <input
                  type="number"
                  name="min_experience"
                  placeholder="Minimum Years of Experience"
                  value={jobForm.min_experience || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                />

                <input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  value={jobForm.salary || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                />

                <input
                  type="text"
                  name="salary_currency"
                  placeholder="Currency (AED, INR, etc.)"
                  value={jobForm.salary_currency || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                />

                {/* Age Criteria */}
                <select
                  name="age_criteria"
                  value={jobForm.age_criteria || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  <option value="">Select Age Criteria</option>
                  {ageOptions.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: "food", label: "Food" },
                    { name: "accommodation", label: "Accommodation" },
                    { name: "transportation", label: "Transportation" },
                  ].map((opt) => (
                    <label
                      key={opt.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        name={opt.name}
                        checked={jobForm[opt.name] || false}
                        onChange={handleJobChange}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>

                {/* Processing Time */}
                <select
                  name="processing_time"
                  value={jobForm.processing_time || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  <option value="">Select Processing Time</option>
                  {processingOptions.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>

                {/* Exams */}
                <select
                  name="exams"
                  multiple
                  value={jobForm.exams || []}
                  onChange={handleExamsChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                >
                  {examOptions.map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>

                {/* Textareas */}
                <textarea
                  name="payment_terms"
                  placeholder="Payment Terms"
                  value={jobForm.payment_terms || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                />

                <textarea
                  name="job_description"
                  placeholder="Job Description"
                  value={jobForm.job_description || ""}
                  onChange={handleJobChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-surface/60 text-black dark:text-gray-100"
                />

                {/* Poster Upload */}
                <label className="block font-semibold text-black dark:text-gray-200">
                  Upload Poster(if you want to add a new poster otherwise let it be)
                </label>
                <input
                  type="file"
                  name="poster"
                  accept="image/*"
                  onChange={(e) => setJobPoster(e.target.files[0])}
                  className="w-full p-3 border rounded-lg bg-white/70 dark:bg-dark-surface/60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {loading ? "Updating..." : "Update Job"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsDashboard;