import React, { useState, useRef, useEffect } from 'react';
import '../style/Register.css';
import logo from '../assets/LXRe.png';
import { Link } from 'react-router-dom';
import ClickSpark from './ClickSpark';

const Register = () => {
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
          <Link to="/"><img src={logo} alt="" /></Link>
          
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

      <div className="main-container-register">
        <div className="container-outer">
          <img src={logo} alt="luxure-logo" />
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className="container-inner">
            <Link to="" className="button-green">
              Create Internet Identity
            </Link>
            <Link to="/login" className="button-white">
              Use Existing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
