import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Karthi Events</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link to="/" className="sidebar-link" onClick={onClose}>
              <span className="link-icon">🏠</span>
              Home
            </Link>
            <Link to="/admin" className="sidebar-link" onClick={onClose}>
              <span className="link-icon">🔧</span>
              Admin Panel
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;