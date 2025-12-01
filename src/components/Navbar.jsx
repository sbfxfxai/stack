import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Home, BarChart3, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="site-nav">
      <div className="nav-container">
        <div className="nav-brand">Stackbank</div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={16} />
            <span>Home</span>
          </Link>
          <Link to="/wallet" className={`nav-link ${isActive('/wallet') ? 'active' : ''}`}>
            <Wallet size={16} />
            <span>Wallet Connect</span>
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <BarChart3 size={16} />
            <span>Dashboard</span>
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
