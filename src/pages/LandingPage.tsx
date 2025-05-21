import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css';
import background from '../assets/background-landing-baru.jpg';
// import ClickSpark from './ClickSpark';
import logo from '../assets/LXRe.png';
import Navbar from './Navbar';

function LandingPage() {
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
      <div className="Landing-Wrapper">
        <Navbar />
        <section className="Landing-Content">
          <div className="All-Content">
            <p className="tagline">
              {'Transparent auctions using smart contracts'
                .split(' ')
                .map((word, i) => (
                  <span
                    key={i}
                    className="blur-word"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
            </p>
            <h1 className="blockchain-tagline">
              <span className="blur-animate">Blockchain-Based</span>
              <br />
              <span className="blur-animate">Bidding System for</span>
              <br />
              <span className="blur-animate">E-commerce</span>
            </h1>
            <div className="tagline-buttons">
              <button className="button-1">Explore</button>
              <button className="button-2">Docs</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
