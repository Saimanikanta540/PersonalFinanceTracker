import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand-logo">
        <div className="brand-icon"><span>B</span></div>
        BudgetBuddy
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" className={({ isActive }) => isActive ? 'active' : ''}>
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink to="/budget" className={({ isActive }) => isActive ? 'active' : ''}>
            Budget
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            Settings
          </NavLink>
        </li>
      </ul>
      <div className="account-section">
        <div className="account-avatar online" onClick={toggleDropdown}>
          SM
        </div>
        {isDropdownOpen && (
          <div className="account-dropdown">
            <div className="account-info">
              <div className="account-name">Sai Manikanta</div>
              <div className="account-email">test@gmail.com</div>
            </div>
            <div className="account-menu-item">
              <i className="fas fa-user"></i>
              My Profile
            </div>
            <div className="account-menu-item">
              <i className="fas fa-wallet"></i>
              My Wallet
            </div>
            <div className="account-menu-item">
              <i className="fas fa-cog"></i>
              Account Settings
            </div>
            <div className="account-menu-item">
              <i className="fas fa-bell"></i>
              Notifications
            </div>
            <div className="account-menu-item">
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 