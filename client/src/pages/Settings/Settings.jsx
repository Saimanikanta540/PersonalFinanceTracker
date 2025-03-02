import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currency: 'INR',
    notifications: true,
    monthlyReport: true,
    weeklyReport: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the backend
    alert('Settings saved successfully!');
  };

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-grid">
        <div className="card profile-settings">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={settings.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleInputChange}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <button type="submit" className="button button-primary">
              Save Profile
            </button>
          </form>
        </div>

        <div className="card notification-settings">
          <h2>Notification Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                />
                Enable Notifications
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="monthlyReport"
                  checked={settings.monthlyReport}
                  onChange={handleInputChange}
                />
                Monthly Report Email
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="weeklyReport"
                  checked={settings.weeklyReport}
                  onChange={handleInputChange}
                />
                Weekly Report Email
              </label>
            </div>

            <button type="submit" className="button button-primary">
              Save Notifications
            </button>
          </form>
        </div>

        <div className="card danger-zone">
          <h2>Danger Zone</h2>
          <div className="danger-actions">
            <div className="danger-action">
              <div>
                <h3>Export Data</h3>
                <p>Download all your financial data as CSV</p>
              </div>
              <button className="button">Export Data</button>
            </div>

            <div className="danger-action">
              <div>
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all data</p>
              </div>
              <button className="button button-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 