import React, { useState, useRef, useEffect } from 'react';
import '../style/Login.css';
import logo from '../assets/LXRe.png';
import arrowLeft from '../assets/arrow-narrow-left.png';
import { Link } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../declarations/backend';
import { canisterId } from '../declarations/backend/index.js';
import Navbar from './Navbar';

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
      <Navbar />

      <div className="main-container">
        <div className="container-outer">
          <Link to="/"> <img src={logo} alt="luxure-logo" /> </Link>
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className="user-input-login">
            <p>Enter Identity to Continue</p>
            <input type="text" placeholder="Internet Identity"/>
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
