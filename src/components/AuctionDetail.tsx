import React, { useState, useEffect } from 'react';
// import { backend } from '../declarations/backend';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from "../declarations/backend";

const backend = createActor(canisterId);

// Define types for the component props
interface AuctionDetailProps {
  productId: number;
  onBack: () => void;
}

// Define types for the bid object
interface Bid {
  bidder: Principal;
  amount: bigint;
  timestamp: bigint;
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
  history: Bid[];
  highestBid: bigint;
  highestBidder: Principal;
}

const AuctionDetail: React.FC<AuctionDetailProps> = ({ productId, onBack }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidStatus, setBidStatus] = useState<string>('');
  const [bidding, setBidding] = useState<boolean>(false);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await backend.getProductById(BigInt(productId));
      if ('length' in result && result.length > 0) {
        const backendProduct = result[0];
        if (backendProduct) {
          const mappedProduct: Product = {
            id: Number(backendProduct.id),
            firstName: backendProduct.firstName,
            lastName: backendProduct.lastName,
            email: backendProduct.email,
            phone: backendProduct.phone,
            productName: backendProduct.productName,
            startPrice: backendProduct.startPrice,
            fixPrice: backendProduct.fixPrice,
            deadline: backendProduct.deadline,
            description: backendProduct.description,
            image: backendProduct.image,
            history: backendProduct.history,
            highestBid: backendProduct.highestBid,
            highestBidder: backendProduct.highestBidder,
          };
          setProduct(mappedProduct);
          setBidAmount((Number(mappedProduct.highestBid) + 1).toString());
        } else {
          setProduct(null);
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (): Promise<void> => {
    if (!bidAmount || isNaN(Number(bidAmount))) {
      setBidStatus('Please enter a valid bid amount');
      return;
    }

    setBidding(true);
    setBidStatus('');
    
    try {
      // Place bid with required arguments only
      const result = await backend.placeBid(BigInt(productId), BigInt(Number(bidAmount)));
      setBidStatus(result);
      if (typeof result === 'string' && (result.includes('success') || result.includes('Congratulations'))) {
        fetchProductDetails(); // Refresh product details after successful bid
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      setBidStatus('Error placing bid. Please try again.');
    } finally {
      setBidding(false);
    }
  };

  // Helper function to format time
  const formatTime = (timestamp: bigint): string => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading auction details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p>Auction not found</p>
        <button 
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Auctions
        </button>
      </div>
    );
  }

  const isActive = product.deadline > BigInt(Date.now() * 1000000);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        Back to Auctions
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.productName} 
              className="w-full h-auto rounded-lg"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          ) : (
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Seller</p>
            <p>{product.firstName} {product.lastName}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Starting Price</p>
            <p>{product.startPrice.toString()} ICP</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Buy Now Price</p>
            <p>{product.fixPrice.toString()} ICP</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Current Highest Bid</p>
            <p className="text-xl font-bold">{product.highestBid.toString()} ICP</p>
            {product.highestBidder && (
              <p className="text-sm text-gray-500">
                by {product.highestBidder.toString().substring(0, 10)}...
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500">Auction Ends</p>
            <p className={isActive ? "text-green-600" : "text-red-600"}>
              {formatTime(product.deadline)}
              {isActive ? " (Active)" : " (Ended)"}
            </p>
          </div>
          
          {isActive && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Place a Bid</h3>
              <div className="flex items-center">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBidAmount(e.target.value)}
                  className="border rounded-l-md px-3 py-2 w-full"
                  placeholder="Enter bid amount"
                  min={Number(product.highestBid) + 1}
                />
                <button
                  onClick={handleBid}
                  disabled={bidding}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {bidding ? "Bidding..." : "Place Bid"}
                </button>
              </div>
              {bidStatus && (
                <p className={`mt-2 text-sm ${bidStatus.includes('success') || bidStatus.includes('Congratulations') ? 'text-green-600' : 'text-red-600'}`}>
                  {bidStatus}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Bid History</h3>
        {product.history && product.history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Bidder</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {product.history.map((bid, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b">{bid.bidder.toString().substring(0, 10)}...</td>
                    <td className="py-2 px-4 border-b">{bid.amount.toString()} ICP</td>
                    <td className="py-2 px-4 border-b">{formatTime(bid.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No bids yet</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;