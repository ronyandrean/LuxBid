import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../style/Collection.css';
import CollectionBackground from '../assets/background-landing-baru.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import AboutFooter from './Footer';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from '../declarations/backend';
import dummyProducts from '../dataItems/dataProduct';

const backend = createActor(canisterId);

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

const CollectionPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Auction');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('active'); // active, completed, all

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const now = BigInt(Date.now() * 1_000_000);
      let filtered: Product[] = [];

      switch (filter) {
        case 'active':
          filtered = dummyProducts.filter((p) => p.deadline > now);
          break;
        case 'completed':
          filtered = dummyProducts.filter((p) => p.deadline <= now);
          break;
        case 'highest':
          filtered = [...dummyProducts].sort((a, b) => {
            return Number(b.highestBid) - Number(a.highestBid);
          });

          console.log('🔽 Sorted Products by highestBid DESC:');
          filtered.forEach((p) =>
            console.log(`ID: ${p.id}, Bid: ${Number(p.highestBid)}`),
          );
          break;
        default:
          filtered = dummyProducts;
          break;
      }
      setProducts(filtered);
    } catch (err) {
      console.error('Error filtering dummy data:', err);
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
  type DropdownProps = {
    label: string;
    options: string[];
  };

  console.log('DEBUG: Current products state:', products);
  console.log('DEBUG: Loading state:', loading);
  return (
    <div className="Collection-Wrapper">
      <div className="Collection-content">
        <div className="Navbar-Collection">
          <Navbar />
        </div>

        <div className="Filtering">
          <div className="Filtering-1">
            <h1 className="collection-title">Collection</h1>
            <h3>Explore our curated collection of luxury items</h3>
          </div>
          <div className="Filtering-2">
            <div className="tab-wrapper">
              {['All', 'Auction', 'Completed', 'Highest'].map((tab) => (
                <div
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab);
                    const lower = tab.toLowerCase();
                    setFilter(lower === 'auction' ? 'active' : lower);
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Brand-Collection">
          <h1 className="Our-Collections">Our Collection</h1>
          {loading && <p>Loading products...</p>}

          {!loading && products.length === 0 && (
            <p>No products available for the selected filter.</p>
          )}
          <div className="product-grid">
            {products.map((product) => (
              <div className="item-Luxury" key={product.id}>
                <img src={product.image} alt={product.productName} />
                <h2 className="Brand-text">
                  {product.productName}
                  <span
                    className={`product-status ${
                      product.deadline > BigInt(Date.now() * 1_000_000)
                        ? ''
                        : 'completed'
                    }`}
                  >
                    {product.deadline > BigInt(Date.now() * 1_000_000)
                      ? 'Active'
                      : 'Completed'}
                  </span>
                </h2>
                <p className="product-description">{product.description}</p>
                <div className="Pricing">
                  <h2 className="Bid">Current Highest Bid</h2>
                  <h2 className="Price">
                    IDR{' '}
                    {Number(product.highestBid.toString()).toLocaleString(
                      'id-ID',
                    )}
                  </h2>
                </div>
                <Link
                  to={`/Clicked/Page/${product.id}`}
                  className="button-Luxury"
                >
                  Place Bid
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-collection">
          <AboutFooter />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
