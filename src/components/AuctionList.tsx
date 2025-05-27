import React, { useState, useEffect } from 'react';
// import  backend from '../declarations/backend';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from "../declarations/backend";

const backend = createActor(canisterId);
// Define types for the component props
interface AuctionListProps {
  onSelectProduct: (id: number) => void;
}

// Define types for the product
interface Product {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

const AuctionList: React.FC<AuctionListProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('active'); // active, completed, all

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
        }))
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
    if (deadline <= now) return "Auction ended";
    
    const diff = Number(deadline - now) / 1000000000; // Convert to seconds
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Auctions</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilter('highest')}
            className={`px-4 py-2 rounded-md ${filter === 'highest' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Highest Bids
          </button>
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading auctions...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p>No auctions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectProduct(product.id)}
            >
              {product.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.productName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Current bid</p>
                    <p className="font-bold">{product.highestBid.toString()} ICP</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.deadline > BigInt(Date.now() * 1000000) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {formatTimeRemaining(product.deadline)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;