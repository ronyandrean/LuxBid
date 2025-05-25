import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import background from '../assets/background-landing-baru.jpg';
// import ClickSpark from "./ClickSpark";
import logo from '../assets/LXRe.png';
import { Button } from '@/components/ui/button';
import LandingPage from './LandingPage';

const Navbar = () => {
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
    <>
      <div className="Header">
        <div className="logo-image">
          <Link to="/">
          <img src={logo} alt="" />
          </Link>
        </div>
        <nav className="nav">
          {/* <div className="nav-item dropdown" ref={dropdownRef}>
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
                <Link to="/collection/Watches" className="dropdown-item">
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
          </div> */}
          <Link to="" className="nav-item">
            Collections
          </Link>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="" className="nav-item">
            How it Works
          </Link>
          <Link to="" className="nav-wallet">
            Connect Wallet
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
