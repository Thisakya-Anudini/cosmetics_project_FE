import { useState, useEffect } from "react";

export default function SettingsPageAdmin() {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email") || "admin@example.com";
  const name = localStorage.getItem("name") || "Admin User";

  // When the component mounts, load the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light if no theme is saved
    setTheme(savedTheme);

    // Apply the theme class to the body element based on the saved theme
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleSaveSettings = () => {
    // Save settings logic (e.g., save to localStorage or an API)
    localStorage.setItem("theme", theme); // Save the theme preference
    localStorage.setItem("notificationsEnabled", notificationsEnabled);
    localStorage.setItem("language", language);

    alert("Settings saved successfully!");
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Switch between light and dark
    setTheme(newTheme);

    // Apply the new theme to the body element
    document.body.classList.toggle("dark", newTheme === "dark");

    // Save the selected theme to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Settings</h2>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="text-lg font-semibold">Profile Info</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Token:</strong> {token ? "✔️ Present" : "❌ Missing"}</p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="text-lg font-semibold">Preferences</h3>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable Notifications
        </label>

        <label className="flex items-center gap-2">
          <span>Theme:</span>
          <button
            onClick={toggleTheme}
            className="p-2 border rounded"
          >
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
        </label>

        <label className="flex items-center gap-2">
          <span>Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more languages if needed */}
          </select>
        </label>
      </div>

      <button
        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleSaveSettings}
      >
        Save Settings
      </button>
    </div>
  );
}
