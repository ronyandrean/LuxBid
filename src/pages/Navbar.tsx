import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import background from '../assets/background-landing-baru.jpg';
import logo from '../assets/LXRe.png';
import { Button } from '@/components/ui/button';
import LandingPage from './LandingPage';

interface NavbarProps {
  onHowItWorksClick: () => void;
}

const Navbar : React.FC<NavbarProps> = ({ onHowItWorksClick }) => {
  
  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="brand">
            <Link className="nav-link" to="/">
              <span>LX</span>Re
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link className="nav-link" to="/collection/luxury">
                Collections
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li>
              <button onClick={onHowItWorksClick} className="nav-link-btn">
                How it Works
              </button>
            </li>
            <li>
              <div className="button">
                <Button className="btn btn--outline">
                  Connect Wallet
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-wallet2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                  </svg>
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      </header>


    </>
  );
};

export default Navbar;
