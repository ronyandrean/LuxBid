import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import background from '../assets/background-landing-baru.jpg';
import logo from '../assets/LXRe.png';
import { Button } from '@/components/ui/button';
import LandingPage from './LandingPage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="brand">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              <span>LX</span>Re
            </Link>
          </div>

          {/* Responsive Menu */}
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          </button>

          {/* Dekstop Menu */}
          <ul className="nav-links desktop-menu">
            <li>
              <Link className="nav-link" to="/collection">
                Collections
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li>
              <div className="nav-link">
                <div className="dialog">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="nav-link-btn">
                        How it Works
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="content">
                      <DialogHeader>
                        <DialogTitle className="title-text">
                          <div className="brand-dialog">
                            How <span>LX</span>Re Works
                          </div>
                          <p className="text">
                            Our blockchain-based platform ensures transparency
                            and security at every step of the auction process.
                          </p>
                        </DialogTitle>
                        <DialogDescription className="text-lg mb-2">
                          <div className="circle-container">
                            <div className="circle-1">
                              <div className="circle">
                                <h1>1</h1>
                              </div>
                              <h1 className="circle-title">Connect Wallet</h1>
                              <p className="circle-text">
                                Link your cryptocurrency wallet to access the
                                platform and participate in auctions.
                              </p>
                            </div>

                            <div className="circle-1">
                              <div className="circle">
                                <h1>2</h1>
                              </div>
                              <h1 className="circle-title">Browse Auction</h1>
                              <p className="circle-text">
                                Explore curated luxury items verified for
                                authenticity by our expert team.
                              </p>
                            </div>

                            <div className="circle-1">
                              <div className="circle">
                                <h1>3</h1>
                              </div>
                              <h1 className="circle-title">
                                Place Secure Bids
                              </h1>
                              <p className="circle-text">
                                Participate in transparent auctions with
                                real-time updates and AI fraud protection.
                              </p>
                            </div>

                            <div className="circle-1">
                              <div className="circle">
                                <h1>4</h1>
                              </div>
                              <h1 className="circle-title">
                                Receive NFT Certificate
                              </h1>
                              <p className="circle-text">
                                Winners get an NFT ownership certificate along
                                with their purchased item.
                              </p>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </li>
            <li>
              <div className="button">
                <Button
                  className="btn btn--outline"
                  onClick={() => navigate(`/login`)}
                >
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

          {/* Mobile Slide Menu */}
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/collection" onClick={closeMenu}>
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="nav-link-btn"
                      onClick={closeMenu}
                    >
                      How it Works
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="content">
                    <DialogHeader>
                      <DialogTitle className="title-text">
                        <div className="brand-dialog">
                          How <span>LX</span>Re Works
                        </div>
                        <p className="text">
                          Our blockchain-based platform ensures transparency and
                          security at every step of the auction process.
                        </p>
                      </DialogTitle>
                      <DialogDescription className="text-lg mb-2">
                        <div className="circle-container">
                          <div className="circle-1">
                            <div className="circle">
                              <h1>1</h1>
                            </div>
                            <h1 className="circle-title">Connect Wallet</h1>
                            <p className="circle-text">
                              Link your cryptocurrency wallet to access the
                              platform and participate in auctions.
                            </p>
                          </div>

                          <div className="circle-1">
                            <div className="circle">
                              <h1>2</h1>
                            </div>
                            <h1 className="circle-title">Browse Auction</h1>
                            <p className="circle-text">
                              Explore curated luxury items verified for
                              authenticity by our expert team.
                            </p>
                          </div>

                          <div className="circle-1">
                            <div className="circle">
                              <h1>3</h1>
                            </div>
                            <h1 className="circle-title">Place Secure Bids</h1>
                            <p className="circle-text">
                              Participate in transparent auctions with real-time
                              updates and AI fraud protection.
                            </p>
                          </div>

                          <div className="circle-1">
                            <div className="circle">
                              <h1>4</h1>
                            </div>
                            <h1 className="circle-title">
                              Receive NFT Certificate
                            </h1>
                            <p className="circle-text">
                              Winners get an NFT ownership certificate along
                              with their purchased item.
                            </p>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>

              <Button
                className="btn btn--outline"
                onClick={() => {
                  navigate('/login');
                  closeMenu();
                }}
              >
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
            </ul>
          </div>

          {/* Overlay */}
          {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
