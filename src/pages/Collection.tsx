import React from 'react';
import { useState, useEffect } from 'react';
import { createActor, canisterId } from '../declarations/backend';
import { Principal } from '@dfinity/principal';
import '../style/Collection.css';
import '../style/BidCard.css';
import BidCard from './BidCard';
import BidCard2 from './BidCard-2';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import AboutFooter from './Footer';

const backend = createActor(canisterId);
// const navigate = useNavigate();
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

const Collection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showPopup, setShowPopup] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('active'); // active, completed, all
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
      <Navbar />
      <section className="collection-page">
        <div className="top-section">
          <div className="top-left-side">
            <h2 className="collection-title">Collections</h2>
            <p>Explore our curated collection of luxury items</p>
          </div>

          <div className="top-right-side">
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
      <AboutFooter />
    </>
  );
};

export default Collection;
