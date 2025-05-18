import React, { useState, useRef, useEffect } from 'react';
import '../style/Login.css';
import logo from '../assets/LXRe.png';
import arrowLeft from '../assets/arrow-narrow-left.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Content on top of image */}
      <div className="Header">
        <div className="logo-image">
          <img src={logo} alt="" />
        </div>
        <nav className="nav">
          <div className="nav-item dropdown" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="dropdown-button"
              aria-expanded={isDropdownOpen}
            >
              Collection{' '}
              <span
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
              >
                ▼
              </span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu nav-item-dropdown">
                <Link to="/collection/luxury" className="dropdown-item">
                  Luxury
                </Link>
                <Link to="/collection/watches" className="dropdown-item">
                  Watches
                </Link>
                <Link to="/collection/jewelry" className="dropdown-item">
                  Jewelry
                </Link>
                <Link to="/collection/fashion" className="dropdown-item">
                  Fashion
                </Link>
              </div>
            )}
          </div>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/account" className="nav-item">
            Account
          </Link>
        </nav>
      </div>

      <div className="main-container">
        <div className="container-outer">
          <Link to="/"> <img src={logo} alt="luxure-logo" /> </Link>
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className="user-input-login">
            <p>Enter Identity to Continue</p>
            <input type="text" placeholder="Internet Identity" />
          </div>

          <div className="container-inner">
            <Link to="" className="button-green">
              Continue
            </Link>
            <Link to="" className="button-white">
              Continue with another device
            </Link>
          </div>
          <div>
            <div className="link-style">
              <Link to="/account" className="text-underline">
                ← Back
              </Link>
              <Link to="" className="text-underline-2">
                Lost Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
