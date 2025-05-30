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
import { useNavigate } from 'react-router-dom';
import '../style/BidCard.css';

import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from '../declarations/backend';

const backend = createActor(canisterId);
// Define types for the component props
interface LandingPageProps {
  onSelectProduct: (id: number) => void;
}

// Define types for the product
interface Product {
  id: number;
  productName: string;
  startPrice: bigint;
  fixPrice: bigint;
  deadline: bigint;
  description: string;
  image: string;
  history: any[]; // You can define a more specific type for bid history if needed
  highestBid: bigint;
  highestBidder: Principal;
}

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showPopup, setShowPopup] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('active');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      let result;
      if (filter === 'active') {
        result = await backend.getActiveProducts();
      } else if (filter === 'completed') {
        result = await backend.getCompletedAuctions();
      } else if (filter === 'highest') {
        result = await backend.getAuctionsByHighestBid();
      } else {
        result = await backend.getAllProducts();
      }
      setProducts(
        result.map((item: any) => ({
          ...item,
          id: Number(item.id),
        })),
      );
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format time remaining
  const formatTimeRemaining = (deadline: bigint): string => {
    const now = BigInt(Date.now() * 1000000); // Convert to nanoseconds
    if (deadline <= now) return 'Auction ended';

    const diff = Number(deadline - now) / 1000000000; // Convert to seconds
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

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
                {'Experience the future of luxury auctions with our secure, transparent, and AI-powered platform. Every transaction is verified on the blockchain for ultimate peace of mind.'
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
            </div>
            <div className="tagline-buttons">
              <button
                className="button-1"
                onClick={() => navigate('/collection')}
              >
                Explore <span className="arrow">›</span>
              </button>
              <button className="button-2" onClick={() => navigate('/about')}>
                Learn More
              </button>
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
                {[
                  { label: 'All', value: 'all' },
                  { label: 'Auction', value: 'active' },
                  { label: 'Completed', value: 'completed' },
                  { label: 'Highest Bid', value: 'highest' },
                ].map((tab) => (
                  <div
                    key={tab.value}
                    className={`tab ${filter === tab.value ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.label);
                      setFilter(tab.value);
                    }}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="BidCard-Wrapper">
            {loading ? (
              <div className="text-center py-10">
                <p>Loading auctions...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10">
                <p>No auctions found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="BidCard">
                    {/* Gambar Produk */}
                    {product.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Konten Card */}
                    <div className="Content-Card-2">
                      {/* Judul dan Tombol Live */}
                      <div className="product-title">
                        <div className="product-header">
                          <div className="bid-text-1">
                            <h3>{product.productName}</h3>
                          </div>
                          <div
                            className={`button-bid-1 ${
                              product.deadline > BigInt(Date.now() * 1000000)
                                ? '#31996B'
                                : '#993133'
                            }`}
                          >
                            <button>
                              {product.deadline > BigInt(Date.now() * 1000000)
                                ? 'Live'
                                : 'End'}
                            </button>
                          </div>
                        </div>

                        <div className="product-footer">
                          <p>{product.description}</p>
                        </div>
                      </div>

                      {/* Info Bidding */}
                      <div className="bid-info">
                        <div>
                          <p className="label">Current Bid</p>
                          <p className="value">
                            {product.highestBid.toString()} ICP
                          </p>
                        </div>
                        <div>
                          <p className="label">Ends in</p>
                          <p
                            className="value"
                            style={{
                              color:
                                product.deadline > BigInt(Date.now() * 1000000)
                                  ? '#31996B'
                                  : '#993133',
                            }}
                          >
                            {formatTimeRemaining(product.deadline)}
                          </p>
                        </div>
                      </div>

                      {/* Footer: Jumlah Bid dan Tombol */}
                      <div className="footer-info">
                        <p className="bids-count">
                          {product.history.length} bids
                        </p>
                        <button
                          className="place-bid-btn"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* <BidCard />
            <BidCard2 />
            <BidCard />
            <BidCard /> */}
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
          <button className="Content-4-btn" onClick={() => navigate('/selling-contact')}>Get Started Now</button>
        </section>
        <AboutFooter />
      </div>
    </>
  );
};

export default LandingPage;
