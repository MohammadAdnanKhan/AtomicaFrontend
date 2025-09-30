import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    // const URL = "http://localhost:5000/api/update-admins-password";
    const URL = "https://atomicabackend.onrender.com/api/update-admins-password";

    try {
      const res = await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        alert(data.error || "❌ Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gradient dark:bg-dark-gradient px-4 py-10 font-body transition-colors duration-500">
      <div className="w-full max-w-md bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-heading font-bold text-center text-light-primary dark:text-dark-primary mb-6">
          Update Admin Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
          Keep your account secure by updating your password regularly.
        </p>

        <form onSubmit={handleChangePassword} className="space-y-5">
          {/* Old Password */}
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
            />
            <button
              type="button"
              onClick={() => setShowOld((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-light-accent dark:hover:text-dark-accent"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition"
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-light-accent dark:hover:text-dark-accent"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-light-primary dark:bg-dark-primary text-white rounded-2xl font-semibold hover:opacity-90 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Make sure you remember your password.
        </p>
      </div>
    </div>
  );
}
