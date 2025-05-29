import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import '../style/ProductPage_Revisi.css';
import Navbar from './Navbar';
import Jordanshoes from '../assets/jordanXtravisscott.png';
import { T } from 'vitest/dist/chunks/reporters.d.DG9VKi4m';
import BidCard from './BidCard';
import BidCard2 from './BidCard-2';
import AboutFooter from './Footer';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from '../declarations/backend';
import { useNavigate } from 'react-router-dom';

const backend = createActor(canisterId);

interface ProductPageProps {
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

const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack }) => {
  /* ── STATE ─────────────────────────────────────────── */
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidStatus, setBidStatus] = useState<string>('');
  const [bidding, setBidding] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [bidAmount, setBidAmount] = useState<number>(18.6);
  // const [isPlacingBid, setIsPlacingBid] = useState(false);
  // const [bidPlaced, setBidPlaced] = useState(false);

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
      const result = await backend.placeBid(
        BigInt(productId),
        BigInt(Number(bidAmount)),
      );
      setBidStatus(result);
      if (
        typeof result === 'string' &&
        (result.includes('success') || result.includes('Congratulations'))
      ) {
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
      <div className="checking-auction">
        <p>Auction not found</p>
        <button onClick={onBack} className="btn btn--primary">
          Back to Auctions
        </button>
      </div>
    );
  }

  const isActive = product.deadline > BigInt(Date.now() * 1000000);

  return (
    <div className="product-page">
      <div className="page">
        <Navbar />

        <div className="breadcrumb">
          <div className="container-breadcrumb">
            <a href="/">Home</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
            <a href="/collection">Auctions</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
            <span>{product.productName}</span>
          </div>
        </div>

        <main className="main container">
          <section className="grid-two">
            <div className="gallery">
              <div>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-auto rounded-lg"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>,
                    ) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              <div className="thumb-row">
                <img src={product.image} alt={product.productName} />
                <img src={product.image} alt={product.productName} />
                <img src={product.image} alt={product.productName} />
                <div className="thumb-video">
                  <img src={product.image} alt={product.productName} />
                </div>
              </div>
            </div>

            <article className="auction">
              <div className="auction-head">
                <Badge className="badge badge--live">Live Auction</Badge>
              </div>

              <h2 className="auction-title">{product.productName}</h2>
              <p className="lead">{product.description}</p>

              <div className="price-card">
                <div className="price-header">
                  <div className="price-left">
                    <small>Current Bid</small>
                    <br></br>
                    <div className="price-eth">
                      <span>{product.highestBid.toString()} ICP</span>
                    </div>
                    <small className="price-usd">≈ $42,550 USD</small>
                  </div>
                  <div className="price-right">
                    <small>Auction Ends In</small>
                    <br></br>
                    <span
                      className={isActive ? 'text-green-600' : 'text-red-600'}
                    >
                      {formatTime(product.deadline)}
                      {isActive ? ' (Active)' : ' (Ended)'}
                    </span>
                    <br></br>
                  </div>
                </div>

                <Progress value={75} className="progress-bar" />
                <div className="price-meta">
                  <span>Starting Bid: {product.startPrice.toString()} ICP</span>
                  <span>Fixed Price: {product.fixPrice.toString()} ICP</span>
                </div>

                <div className="bid-amount">
                  <label className="input-label">Your bid Amount (ICP):</label>
                  <div className="input-container">
                    <Input
                      className="number-input"
                      type="number"
                      value={bidAmount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setBidAmount(e.target.value)
                      }
                      min={Number(product.highestBid) + 1}
                      placeholder="Enter bid amount"
                      // step={0.1}
                    />

                    <Button
                      variant="outline"
                      className="btn btn--primary"
                      onClick={() =>
                        setBidAmount(
                          (Number(product.highestBid) + 1).toString(),
                        )
                      }
                      disabled={bidding}
                    >
                      Min
                    </Button>
                  </div>

                  {bidStatus && (
                    <p
                      className={`alert-success ${bidStatus.includes('success') || bidStatus.includes('Congratulations') ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {bidStatus}
                    </p>
                  )}

                  <div className="min-max">
                    <span>Min: {product.highestBid.toString()} ICP</span>
                    <span>Max: {product.fixPrice.toString()} ICP</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="btn btn--primary">
                      Place Bid Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="popup-content">
                    <DialogHeader>
                      <DialogTitle>Confirm Your Bid</DialogTitle>
                      <DialogDescription className="text-white/70">
                        You are about to place a bid of {bidAmount} ICP (≈ $
                        {(Number(bidAmount) * 2300).toLocaleString()} USD) for{' '}
                        {product.productName}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex justify-between">
                        <span className="text-white/70">Item:</span>
                        <span className="font-medium">
                          {product.productName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Your bid:</span>
                        <span className="font-medium">{bidAmount} ICP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">
                          Service fee (2.5%):
                        </span>
                        <span className="font-medium">
                          {(Number(bidAmount) * 0.025).toFixed(4)} ICP
                        </span>
                      </div>
                      <Separator className="my-2 bg-white/10" />
                      <div className="flex justify-between">
                        <span className="text-white/70">Total:</span>
                        <span className="font-bold">
                          {(Number(bidAmount) * 1.025).toFixed(4)} ICP
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer w-full"
                        onClick={handleBid}
                        disabled={bidding}
                      >
                        {bidding ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Processing...
                          </>
                        ) : (
                          'Confirm Bid'
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {bidStatus && (
                  <Alert className="bg-emerald-500/20 border-emerald-500 text-white">
                    <i className="fas fa-check-circle text-emerald-400 mr-4"></i>
                    <div className="success-message">
                      <AlertTitle>Bid Placed Successfully!</AlertTitle>
                      <AlertDescription>
                        Your bid of {bidAmount} ICP has been recorded on the
                        blockchain.
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
              </div>

              <div className="seller-card">
                <div className="seller-info">
                  <div className="avatar">RA</div>
                  <div>
                    <strong>Seller: Rony Andrean</strong>
                    <br />
                    <small className="verified">
                      Verified • member since 2023
                    </small>
                  </div>
                </div>
                <div className="seller-actions">
                  <Button className="btn btn--small btn--outline">
                    Contact
                    <Button
                      className="btn btn--small btn--outline"
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </Button>
                  </Button>
                </div>
              </div>
            </article>
          </section>

          <section className="item-details">
            <Tabs defaultValue="details" className="tabs">
              <TabsList className="tabs-list">
                <TabsTrigger value="details" className="tabs-trigger">
                  {' '}
                  Item Details
                </TabsTrigger>
                <TabsTrigger value="description" className="tabs-trigger">
                  Description
                </TabsTrigger>
                <TabsTrigger value="history" className="tabs-trigger">
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="tabs-content">
                <div className="details-grid">
                  <h3 className="section-heading-details">
                    Product Specification
                  </h3>
                  <div className="detail-item">
                    <strong>Brand: </strong>
                    <span>Nike</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Model: </strong>
                    <span>Jordan 1</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Year: </strong>
                    <span>2023</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Material: </strong>
                    <span>Leather</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Size: </strong>
                    <span>42</span>
                  </div>
                  <Separator className="separator" />
                </div>
              </TabsContent>
              <TabsContent value="description" className="tabs-content">
                <h3 className="section-heading-details">Description</h3>
                <div className="item-description">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="history" className="tabs-content">
                <h3 className="section-heading-details">Bid History</h3>
                {product.history && product.history.length > 0 ? (
                  <div className="bid-history-container">
                    <table className="bid-history-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Bid Amount</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.history.map((bid, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-gray-10' : ''}
                          >
                            <td className="py-2 px-4 border-b">
                              {bid.bidder.toString().substring(0, 10)}...
                            </td>
                            <td className="py-2 px-4 border-b">
                              {bid.amount.toString()} ICP
                            </td>
                            <td className="py-2 px-4 border-b">
                              {formatTime(bid.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No bids yet</p>
                )}
              </TabsContent>
            </Tabs>
          </section>

          <div className="related-items">
            <h3 className="section-heading">You May Also Like</h3>
            <div className="related">
              <BidCard />
              <BidCard2 />
              <BidCard />
            </div>
          </div>
        </main>

        <AboutFooter />
      </div>
    </div>
  );
};

export default ProductPage;
