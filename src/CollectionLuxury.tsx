import React from "react";
import { useState, useEffect, useRef } from "react";
import CollectionBackground from './assets/background-landing-baru.jpg'
import {Link} from "react-router-dom";


const CollectionPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [openFaq, setOpenFaq] = useState<number | null>(null)
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
        <div className="Collection-content">
            <div className="Header-Luxury">
                <div className="Luxury-Image">
                    <img src={CollectionBackground} alt="" />
                    <h1 className="Luxury-title">Collection</h1>
                </div>
                <div className="Collection-text-logo">LXRe</div>
                <nav className="collection">
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
        </div>
    )
}

export default CollectionPage;