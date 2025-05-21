import React, { useState, useRef, useEffect } from 'react';
import '../style/Register.css';
import logo from '../assets/LXRe.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
    <div className='Register-Wrapper'>
      <Navbar />

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
