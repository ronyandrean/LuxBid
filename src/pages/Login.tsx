import React, { useState, useRef, useEffect } from 'react';
import '../style/Login.css';
import logo from '../assets/LXRe.png';
import arrowLeft from '../assets/arrow-narrow-left.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
    <div className="Login-Wrapper">
      <Navbar />
      <div className="main-container">
        <div className="container-outer">
          <Link to="/">
            {' '}
            <img src={logo} alt="luxure-logo" />{' '}
          </Link>
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
