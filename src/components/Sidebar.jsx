import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Elite Events</h3>
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
          
          {/* <div className="contact-info">
            <h4>📞 Contact Us</h4>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <p>123 Event Street</p>
                <p>City, State 12345</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <p>info@eliteevents.com</p>
                <p>bookings@eliteevents.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⏰</span>
              <div>
                <p>Mon-Sun: 9:00 AM - 9:00 PM</p>
                <p>Emergency: 24/7 Available</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;