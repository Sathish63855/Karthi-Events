import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="container">
        <button className="menu-btn" onClick={onMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="logo">
          Karthi Events
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link admin-link">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;