import React,{useState, useRef, useEffect} from "react";
import {Link} from 'react-router-dom'
import '../style/LandingPage.css'
import background from '../assets/background-landing-baru.jpg'
import ClickSpark from "./ClickSpark";
import logo from '../assets/LXRe.png'

function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="Landing-Wrapper">
      
      <div className="content-image">
        <img src={background} alt="Background" />
      </div>

      
      <div className="Header">
        <div className="logo-image">
          <img src={logo} alt="" />
        </div>
        <nav className="nav">
          <div className="nav-item dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-button" aria-expanded={isDropdownOpen}>
              Collection <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu nav-item-dropdown">
                <Link to="/collection/luxury" className="dropdown-item">Luxury</Link>
                <Link to="/collection/watches" className="dropdown-item">Watches</Link>
                <Link to="/collection/jewelry" className="dropdown-item">Jewelry</Link>
                <Link to="/collection/fashion" className="dropdown-item">Fashion</Link>
              </div>
            )}
          </div>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/account" className="nav-item">Account</Link>
        </nav>
      </div>

      <section className="Landing-Content">
        <div className="All-Content">
          <p className="tagline">
            {"Transparent auctions using smart contracts".split(" ").map((word, i) => (
              <span key={i} className="blur-word" style={{ animationDelay: `${i * 0.2}s` }}>
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
  );
}

export default LandingPage;