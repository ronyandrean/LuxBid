import React, { useState, useRef, useEffect } from 'react';
import '../style/Login.css';
import logo from '../assets/LXRe.png';
import arrowLeft from '../assets/arrow-narrow-left.png';
import { Link } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../declarations/backend';
import { canisterId } from '../declarations/backend/index.js';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

const Login = () => {
  const [authClient, setAuthClient] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
    };
    initAuth();

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

  const handleLogin = async () => {
    if (authClient) {
      await authClient.login({
        identityProvider,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const actor = createActor(canisterId, {
            agentOptions: { identity },
          });
          // Optional: Redirect or update app state after login
          console.log('Login success');
        },
      });
    }
  };

  return (
    <div className='login-body'>
      {/* Content on top of image */}
      <div className="Header">
        <div className="logo-image">
          <img src={logo} alt="" />
        </div>
        <nav className="nav">
          <div className="nav-item dropdown" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
            <input type="text" placeholder="Internet Identity" disabled />
          </div>

          <div className="container-inner">
            <button className="button-green" onClick={handleLogin}>
              Continue
            </button>
            <button className="button-white" onClick={handleLogin}>
              Continue with another device
            </button>
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
