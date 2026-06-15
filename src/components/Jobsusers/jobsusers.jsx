import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // for close icon

// const JOB_URL = "http://localhost:5000/api/job";
const JOB_URL = "https://atomicabackend.onrender.com/api/job";

const JobsUsers = () => {
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
    <div className="grain relative min-h-screen font-body transition-colors duration-500 text-light-text dark:text-dark-text bg-wash-light dark:bg-wash-dark overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="text-center mb-3">
          <span className="eyebrow justify-center">Global opportunities</span>
        </div>
        <h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold mb-5 tracking-[-0.02em] text-center leading-[1.04]">
          Explore global <span className="em-serif">careers</span>
        </h2>

        {/* Intro paragraph */}
        <p className="text-lg text-light-secondary dark:text-dark-secondary mb-12 leading-relaxed text-center max-w-3xl mx-auto">
          Discover the latest international job openings across multiple industries and destinations.
          Each listing includes key details like salary, benefits, and requirements.
          Use this dashboard to find the perfect opportunity that matches your profile and career goals.
        </p>

        {/* Jobs Table */}
        <div className="overflow-x-auto rounded-[1.4rem] border hairline bg-light-surface dark:bg-dark-surface shadow-card">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-light-primary dark:bg-pine-800 text-light-surface dark:text-dark-text sticky top-0">
              <tr>
                {[
                  "Country",
                  "Job Title",
                  "Qualification",
                  "Experience",
                  "Salary",
                  "Currency",
                  "Facilities",
                  "Processing Time",
                  "Exams",
                  "Service Fee",
                  "Payment Terms",
                  "Description",
                  "Poster",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, visibleCount).map((job, idx) => (
                <tr
                  key={job.id}
                  className={`border-b border-light-secondary/15 dark:border-white/10 transition ${
                    idx % 2 === 0
                      ? "bg-white/50 dark:bg-white/[0.03]"
                      : "bg-transparent"
                  } hover:bg-light-primary/10 dark:hover:bg-dark-primary/15`}
                >
                  <td className="px-4 py-3 font-semibold">{job.country_name}</td>
                  <td className="px-4 py-3">{job.job_name}</td>
                  <td className="px-4 py-3">{job.qualification || "—"}</td>
                  <td className="px-4 py-3">{job.min_experience || "—"}</td>
                  <td className="px-4 py-3">{job.salary || "—"}</td>
                  <td className="px-4 py-3">{job.salary_currency || "—"}</td>

                  <td className="px-4 py-3 text-sm">
                    {job.food && "Food "}
                    {job.accommodation && "Stay "}
                    {job.transportation && "Transport"}
                    {!(job.food || job.accommodation || job.transportation) && "—"}
                  </td>

                  <td className="px-4 py-3">{job.processing_time || "—"}</td>

                  <td className="px-4 py-3">
                    {Array.isArray(job.exams)
                      ? job.exams.join(", ")
                      : job.exams || "—"}
                  </td>

                  <td className="px-4 py-3">
                    {job.service_charge_lakhs
                      ? `${job.service_charge_lakhs} L + ${job.service_charge_thousands || 0} K`
                      : "—"}
                  </td>

                  <td className="px-4 py-3 truncate max-w-[180px]" title={job.payment_terms}>
                    {job.payment_terms || "—"}
                  </td>

                  <td className="px-4 py-3 truncate max-w-[250px]" title={job.job_description}>
                    {job.job_description || "—"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewPoster(job.id)}
                      className="px-4 py-1.5 bg-light-primary dark:bg-dark-primary text-light-surface dark:text-dark-background rounded-full text-xs font-semibold shadow-soft hover:-translate-y-0.5 transition"
                    >
                      View Poster
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
              className="px-10 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-light-surface dark:text-dark-background font-semibold shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
            >
              Show More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsUsers;