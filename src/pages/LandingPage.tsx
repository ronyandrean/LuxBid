import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css';
import background from '../assets/background-landing-baru.jpg';
// import ClickSpark from './ClickSpark';
import logo from '../assets/LXRe.png';
import Navbar from './Navbar';
import StatsSection from './statsSection';
import { Lock } from 'lucide-react';
import { Cpu } from 'lucide-react';
import { CircleStop } from 'lucide-react';
import AboutFooter from './Footer';
import BidCard from './BidCard';
import BidCard2 from './BidCard-2';

function LandingPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <>
      <div className="Landing-Content">
        <section className="Landing-content-1">
          <Navbar />

          <div className="animation-text-content">
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
            <div className="text-polos-1">
              <p className="Text-Landing-1">
                {'Experience the future of luxury auctions with our'
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
              <p className="Text-Landing-2">
                {'secure, transparent, and AI-powered platform. Every'
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
              <p className="Text-Landing-3">
                {'transaction is verified on the blockchain for ultimate'
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
              <p className="Text-Landing-4">
                {'peace of mind.'.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="blur-word"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>
            </div>
            <div className="tagline-buttons">
              <button className="button-1">
                Explore <span className="arrow">›</span>
              </button>
              <button className="button-2">Learn More</button>
            </div>
          </div>
          <div className="stats-section">
            <StatsSection />
          </div>
        </section>

        <section className="Landing-content-2">
          <h1 className="Features">Revolutionary Features</h1>
          <div className="Content2-Text-1">
            <p className="Content2-text-1">
              Our platform combines luxury with cutting-edge blockchain
              technology to create a secure and
            </p>
            <p className="Content2-text-2">transparent bidding experience.</p>
          </div>
          <div className="Content-2-Box-Content">
            <div className="Content-2-Box-1">
              <Lock size={50} color="#0AC99A" />
              <h2 className="Security">Smart Contract Security</h2>
              <p className="Box-1-Text">
                Our platform combines luxury with cutting-edge blockchain
                technology to create a secure and transparent bidding
                experience.
              </p>
            </div>
            <div className="Content-2-Box-2">
              <Cpu size={50} color="#0AC99A" />
              <h2 className="AI">AI Fraud Detection</h2>
              <p className="Box-1-Text-2">
                Advanced AI algorithms monitor bidding patterns in real-time to
                detect and prevent fraudulent activities.
              </p>
            </div>
            <div className="Content-2-Box-3">
              <CircleStop size={50} color="#0AC99A" />
              <h2 className="NFT">NFT Ownership Certificates</h2>
              <p className="Box-1-Text-3">
                Winning bidders receive NFT certificates as proof of ownership,
                adding a new layer of authenticity.
              </p>
            </div>
          </div>
        </section>

        <section className="Landing-Content-3">
          <div className="Top-Content">
            <div className="left-side">
              <h2 className="Auctions">Feature Actions</h2>
              <p>Discover exclusive luxury items available for bidding</p>
            </div>

            <div className="right-side">
              <div className="tab-wrapper">
                {['All', 'Auction', 'Completed', 'Highest Bid'].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="BidCard-Wrapper">
            <BidCard />
            <BidCard2 />
            <BidCard />
            <BidCard />
          </div>
        </section>

        <section className="Landing-content-4">
          <h1 className="Content-4-text-1">
            Ready to Experience the Future of Luxury Auctions?
          </h1>
          <div className="Content-4-Text-2">
            <p>
              Join thousands of luxury enthusiasts who have already discovered
              the security and
            </p>
            <p>transparency of blockchain-based bidding.</p>
          </div>
          <button className="Content-4-btn">Get Started Now</button>
        </section>
        <AboutFooter />
      </div>
    </>
  );
}

export default LandingPage;
