import React, { useState, useRef, useEffect } from 'react';
import '../style/Register.css';
import logo from '../assets/LXRe.png';
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

const Register = () => {
  const [authClient, setAuthClient] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleRegister = async () => {
    if (authClient) {
      await authClient.login({
        identityProvider,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const actor = createActor(canisterId, {
            agentOptions: { identity },
          });
          // Optional: Redirect or update app state after registration
          console.log('Register success');
        },
      });
    }
  };

  return (
    <div className='register-body'>
      {/* Content on top of image */}
      <Navbar />

      <div className="main-container-register">
        <div className="container-outer">
          <img src={logo} alt="luxure-logo" />
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className="container-inner">
            <button className="button-green" onClick={handleRegister}>
              Create Internet Identity
            </button>
            <Link to="/login" className="button-white">
              Use Existing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
