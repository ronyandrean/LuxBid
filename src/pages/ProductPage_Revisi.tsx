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


const ProductPage: React.FC = () => {
  /* ── STATE ─────────────────────────────────────────── */
  const [bidAmount, setBidAmount] = useState<number>(18.6);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);

  const [bidHistory, setBidHistory] = useState<
    {
      id: number;
      user: string;
      amount: number;
      time: string;
      verified: boolean;
    }[]
  >([
    { id: 1, user: 'Alex M.', amount: 18.5, time: '2 h ago', verified: true },
    {
      id: 2,
      user: 'Sarah K.',
      amount: 18.2,
      time: '5 h ago',
      verified: true,
    },
    {
      id: 3,
      user: 'Michael R.',
      amount: 17.8,
      time: '8 h ago',
      verified: true,
    },
    {
      id: 4,
      user: 'Jessica T.',
      amount: 17.5,
      time: '10 h ago',
      verified: true,
    },
    {
      id: 5,
      user: 'David L.',
      amount: 17.0,
      time: '12 h ago',
      verified: true,
    },
    {
      id: 6,
      user: 'Emma W.',
      amount: 16.5,
      time: '15 h ago',
      verified: true,
    },
  ]);

  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 15,
    seconds: 30,
  });
  const progressTarget = 75;
  const [progress, setProgress] = useState(0);

  const relatedItems = [
    {
      id: 1,
      title: 'Jordan 1 Travis Scott',
      currentBid: 10.0,
      image: Jordanshoes,
    },
    {
      id: 2,
      title: 'Jordan 1 Travis Scott',
      currentBid: 20.0,
      image: Jordanshoes,
    },
    {
      id: 3,
      title: 'Jordan 1 Travis Scott',
      currentBid: 30.0,
      image: Jordanshoes,
    },
  ];

  /* ── EFFECTS ────────────────────────────────────────── */
  /* animate progress bar once page loads */
  useEffect(() => {
    const id = setTimeout(() => setProgress(progressTarget), 400);
    return () => clearTimeout(id);
  }, []);

  /* ticking countdown */
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(id);
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── HELPERS ────────────────────────────────────────── */
  const formatCountdown = () => {
    const { hours, minutes, seconds } = countdown;
    return [hours, minutes, seconds]
      .map((n) => n.toString().padStart(2, '0'))
      .join(':');
  };

  const handleBidSubmit = () => {
    setIsPlacingBid(true);
    setTimeout(() => {
      /* add new bid */
      const newBid = {
        id: bidHistory.length + 1,
        user: 'You',
        amount: bidAmount,
        time: 'just now',
        verified: true,
      };
      setBidHistory([newBid, ...bidHistory]);
      setBidPlaced(true);
      setIsPlacingBid(false);
    }, 1500);
  };

  /* ── RENDER ─────────────────────────────────────────── */
  return (
    <div className="product-page">
      <div className="page">
        <Navbar />

        {/* ░░ Breadcrumb ░░ */}
        <div className="breadcrumb">
          <div className="container-breadcrumb">
            <a href="#">Home</a>
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
            <a href="#">Auctions</a>
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
            <a href="#">Watches</a>
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
            <span>Jordan 1 Low Travis Scott x Fragment</span>
          </div>
        </div>

        {/* ░░ Main ░░ */}
        <main className="main container">
          <section className="grid-two">
            {/* ① GALLERY */}
            <div className="gallery">
              <figure className="hero">
                <img
                  src={Jordanshoes}
                  alt="Jordan 1 Low Travis Scott x Fragment"
                />
              </figure>

              <div className="thumb-row">
                {/* thumbs */}
                <img
                  src={Jordanshoes}
                  alt="Jordan 1 Low Travis Scott x Fragment"
                />
                <img
                  src={Jordanshoes}
                  alt="Jordan 1 Low Travis Scott x Fragment"
                />
                <img
                  src={Jordanshoes}
                  alt="Jordan 1 Low Travis Scott x Fragment"
                />
                <div className="thumb-video">
                  <img
                    src={Jordanshoes}
                    alt="Jordan 1 Low Travis Scott x Fragment"
                  />
                </div>
              </div>
            </div>

            {/* ② AUCTION CARD */}
            <article className="auction">
              <div className="auction-head">
                <Badge className="badge badge--live">Live Auction</Badge>
              </div>

              <h2 className="auction-title">
                Jordan 1 Low Travis Scott x Fragment
              </h2>
              <p className="lead">
                Limited edition timepiece with exquisite craftsmanship
              </p>

              {/* price card */}
              <div className="price-card">
                <div className="price-header">
                  <div className="price-left">
                    <small>Current Bid</small>
                    <br></br>
                    <div className="price-eth">
                      <span>18.5 ICP</span>
                    </div>
                    <small className="price-usd">≈ $42,550 USD</small>
                  </div>
                  <div className="price-right">
                    <small>Auction Ends In</small>
                    <br></br>
                    <span className="countdown">{formatCountdown()}</span>
                    <br></br>
                    <small>24 May 2025 at 20:30 UTC</small>
                  </div>
                </div>

                <Progress value={75} className="progress-bar" />
                <div className="price-meta">
                  <span>Starting Bid: 10.0 ICP</span>
                  <span>Fixed Price: 30.0 ICP</span>
                </div>

                <div className="bid-amount">
                  <label className="input-label">Your bid Amount (ICP):</label>
                  <div className="input-container">
                    <Input
                      className="number-input"
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                      min={18.6}
                      step={0.1}
                    />

                    <Button
                      variant="outline"
                      className="btn btn--primary"
                      onClick={() => setBidAmount(18.6)}
                    >
                      Min
                    </Button>
                  </div>

                  {bidPlaced && (
                    <p className="alert-success">✓ Bid placed successfully!</p>
                  )}

                  <div className="min-max">
                    <span>Min: 18.6 ETH</span>
                    <span>Max: 30.0 ETH</span>
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
                        {(bidAmount * 2300).toLocaleString()} USD) for Jordan 1
                        Low Travis Scott.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex justify-between">
                        <span className="text-white/70">Item:</span>
                        <span className="font-medium">
                          Jordan 1 Low Travis Scott
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
                          {(bidAmount * 0.025).toFixed(4)} ICP
                        </span>
                      </div>
                      <Separator className="my-2 bg-white/10" />
                      <div className="flex justify-between">
                        <span className="text-white/70">Total:</span>
                        <span className="font-bold">
                          {(bidAmount * 1.025).toFixed(4)} ICP
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer w-full"
                        onClick={handleBidSubmit}
                        disabled={isPlacingBid}
                      >
                        {isPlacingBid ? (
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

                {bidPlaced && (
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

              {/* seller */}
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
                  </Button>
                  <Button className="btn btn--small btn--outline">
                    Profile
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
                    <span>Vintage Chronograph</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Model: </strong>
                    <span>Chrono Classic</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Year: </strong>
                    <span>1975</span>
                  </div>
                  <Separator className="separator" />
                  <div className="detail-item">
                    <strong>Material: </strong>
                    <span>Stainless Steel</span>
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
                  <p>
                    {' '}
                    This item has been thoroughly examined by our team of watch
                    experts and certified as authentic. The serial numbers have
                    been verified against manufacturer records, and all
                    components have been confirmed as original or period-correct
                    replacements. This item has been thoroughly examined by our
                    team of watch experts and certified as authentic. The serial
                    numbers have been verified against manufacturer records, and
                    all components have been confirmed as original or
                    period-correct replacements. This item has been thoroughly
                    examined by our team of watch experts and certified as
                    authentic. The serial numbers have been verified against
                    manufacturer records, and all components have been confirmed
                    as original or period-correct replacements.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="history" className="tabs-content">
                <h3 className="section-heading-details">Bid History</h3>
                <div className="bid-history-container">
                  <table className="bid-history-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Bid Amount</th>
                        <th>Time</th>
                        <th>Verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="user-info">
                            <div className="bid-user-avatar">R</div>
                            <span className="bid-user-name">Rony Andrean</span>
                          </div>
                        </td>
                        <td>
                          <strong>0.42 ICP</strong>
                        </td>
                        <td className="bid-time">5 mins ago</td>
                        <td>
                          <span className="status-badge status-completed">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* ░░ RELATED ░░ */}
          <div className="related-items">
            <h3 className="section-heading">You May Also Like</h3>
            <div className="related">
              <BidCard />
              <BidCard2 />
              <BidCard />
            </div>
          </div>
        </main>

        {/* ░░ FOOTER ░░ */}
        <AboutFooter />
      </div>
    </div>
  );
};

export default ProductPage;
