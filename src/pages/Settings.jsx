import { useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Freeshopps",
    email: "admin@freeshopps.com",
    contactNumber: "+91 9876543210",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally call an API to save settings
    toast.success("Settings updated successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-semibold">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={settings.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
