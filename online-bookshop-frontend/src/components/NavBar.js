import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/NavBar.css';
import logo from "../assets/logo.png";
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} alt="BookZilla Logo" className="logo" style={{ height: '51px', marginRight: '0px' }} />
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '27px' }}>BookZilla</span>
        </Link>
      </div>
      
      <div className="navbar-search">
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search books..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {isAuthenticated ? (
          <ProfileMenu />
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;