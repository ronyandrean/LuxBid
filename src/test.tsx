// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
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
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const App: React.FC = () => {
  const [bidAmount, setBidAmount] = useState<number>(18.75);
  const [bidHistory, setBidHistory] = useState([
    {
      id: 1,
      user: 'Alex M.',
      amount: 18.5,
      time: '2 hours ago',
      verified: true,
    },
    {
      id: 2,
      user: 'Sarah K.',
      amount: 18.2,
      time: '5 hours ago',
      verified: true,
    },
    {
      id: 3,
      user: 'Michael R.',
      amount: 17.8,
      time: '8 hours ago',
      verified: true,
    },
    {
      id: 4,
      user: 'Jessica T.',
      amount: 17.5,
      time: '10 hours ago',
      verified: true,
    },
    {
      id: 5,
      user: 'David L.',
      amount: 17.0,
      time: '12 hours ago',
      verified: true,
    },
    {
      id: 6,
      user: 'Emma W.',
      amount: 16.5,
      time: '15 hours ago',
      verified: true,
    },
  ]);
  const [activeTab, setActiveTab] = useState('details');
  const [progress, setProgress] = useState(0);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 15,
    seconds: 30,
  });
  const [relatedItems, setRelatedItems] = useState([
    {
      id: 1,
      title: 'Vintage Omega Watch',
      currentBid: 15.2,
      image:
        'https://readdy.ai/api/search-image?query=Luxury%20vintage%20Omega%20watch%20with%20intricate%20mechanical%20details%20on%20dark%20background%2C%20professional%20product%20photography%20highlighting%20premium%20materials%20and%20craftsmanship%2C%20elegant%20composition%20with%20subtle%20lighting&width=300&height=300&seq=20&orientation=squarish',
    },
    {
      id: 2,
      title: 'Rolex Submariner',
      currentBid: 22.8,
      image:
        'https://readdy.ai/api/search-image?query=Luxury%20Rolex%20Submariner%20watch%20with%20premium%20stainless%20steel%20and%20blue%20details%20on%20dark%20background%2C%20professional%20product%20photography%20highlighting%20premium%20materials%20and%20craftsmanship%2C%20elegant%20composition%20with%20subtle%20lighting&width=300&height=300&seq=21&orientation=squarish',
    },
    {
      id: 3,
      title: 'Patek Philippe',
      currentBid: 35.4,
      image:
        'https://readdy.ai/api/search-image?query=Luxury%20Patek%20Philippe%20watch%20with%20gold%20details%20and%20leather%20strap%20on%20dark%20background%2C%20professional%20product%20photography%20highlighting%20premium%20materials%20and%20craftsmanship%2C%20elegant%20composition%20with%20subtle%20lighting&width=300&height=300&seq=22&orientation=squarish',
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        clearInterval(interval);
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize price history chart
    const chartDom = document.getElementById('price-history-chart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [
            'May 18',
            'May 19',
            'May 20',
            'May 21',
            'May 22',
            'May 23',
            'May 24',
          ],
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            formatter: '{value} ETH',
          },
        },
        series: [
          {
            name: 'Bid Price',
            type: 'line',
            data: [12.5, 13.8, 15.2, 16.0, 16.8, 17.5, 18.5],
            lineStyle: {
              color: '#10b981',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#10b981',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
                  { offset: 1, color: 'rgba(16, 185, 129, 0.05)' },
                ],
              },
            },
          },
        ],
      };
      myChart.setOption(option);

      const handleResize = () => {
        myChart.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, []);

  const handleBidSubmit = () => {
    setIsPlacingBid(true);
    setTimeout(() => {
      setIsPlacingBid(false);
      setBidPlaced(true);

      // Add the new bid to history
      const newBid = {
        id: bidHistory.length + 1,
        user: 'You',
        amount: bidAmount,
        time: 'Just now',
        verified: true,
      };

      setBidHistory([newBid, ...bidHistory]);
    }, 2000);
  };

  const formatCountdown = () => {
    const { hours, minutes, seconds } = countdown;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <header className="px-8 py-6 border-b border-white/10">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-emerald-400">LX</span>Re
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Collections
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Auctions
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all !rounded-button whitespace-nowrap cursor-pointer"
            >
              Connect Wallet
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i className="fas fa-bars text-lg"></i>
          </Button>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-800/30 py-3 px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-white/60">
          <a
            href="#"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </a>
          <i className="fas fa-chevron-right text-xs mx-2"></i>
          <a
            href="#"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Auctions
          </a>
          <i className="fas fa-chevron-right text-xs mx-2"></i>
          <a
            href="#"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Watches
          </a>
          <i className="fas fa-chevron-right text-xs mx-2"></i>
          <span className="text-white">Vintage Chronograph</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Product Images */}
            <div>
              <div className="bg-gray-800/30 rounded-xl overflow-hidden mb-6">
                <img
                  src="https://readdy.ai/api/search-image?query=Luxury%20vintage%20chronograph%20watch%20with%20intricate%20mechanical%20details%20on%20dark%20background%2C%20professional%20product%20photography%20with%20dramatic%20lighting%20highlighting%20the%20premium%20materials%2C%20gold%20accents%2C%20and%20leather%20strap%2C%20elegant%20composition%20with%20subtle%20reflections&width=700&height=700&seq=16&orientation=squarish"
                  alt="Vintage Chronograph"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-800/30 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src="https://readdy.ai/api/search-image?query=Luxury%20vintage%20chronograph%20watch%20face%20closeup%20on%20dark%20background%2C%20professional%20macro%20photography%20highlighting%20intricate%20dial%20details%20and%20premium%20craftsmanship&width=150&height=150&seq=17&orientation=squarish"
                    alt="Watch Face"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gray-800/30 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src="https://readdy.ai/api/search-image?query=Luxury%20vintage%20chronograph%20watch%20side%20view%20on%20dark%20background%2C%20professional%20product%20photography%20highlighting%20crown%20details%20and%20case%20profile%20with%20premium%20craftsmanship&width=150&height=150&seq=18&orientation=squarish"
                    alt="Watch Side"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gray-800/30 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src="https://readdy.ai/api/search-image?query=Luxury%20vintage%20chronograph%20watch%20strap%20closeup%20on%20dark%20background%2C%20professional%20product%20photography%20highlighting%20premium%20leather%20texture%20and%20stitching%20details&width=150&height=150&seq=19&orientation=squarish"
                    alt="Watch Strap"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-gray-800/30 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
                  <i className="fas fa-play-circle text-3xl text-emerald-400"></i>
                </div>
              </div>
            </div>

            {/* Right Column - Auction Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-emerald-500 text-white !rounded-button whitespace-nowrap">
                  Live Auction
                </Badge>
                <div className="flex items-center space-x-4">
                  <button className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    <i className="far fa-heart text-lg"></i>
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    <i className="fas fa-share-alt text-lg"></i>
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Vintage Chronograph
              </h1>
              <p className="text-white/70 mb-6">
                Limited edition 1960s mechanical chronograph with original
                leather strap and gold accents. Fully serviced and in excellent
                working condition.
              </p>

              <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/50">Current Bid</p>
                    <p className="text-3xl font-bold text-emerald-400">
                      18.5 ETH
                    </p>
                    <p className="text-sm text-white/50">≈ $42,550 USD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/50">Auction Ends In</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCountdown()}
                    </p>
                    <p className="text-sm text-white/50">
                      May 24, 2025 at 8:30 PM UTC
                    </p>
                  </div>
                </div>
                <Progress
                  value={75}
                  className="h-2 mb-2 bg-white/10"
                  indicatorClassName="bg-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/50 mb-6">
                  <span>Starting Bid: 10.0 ETH</span>
                  <span>Reserve Price: 25.0 ETH</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Bid Amount (ETH)
                    </label>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={bidAmount}
                        onChange={(e) =>
                          setBidAmount(parseFloat(e.target.value))
                        }
                        className="bg-gray-800 border-white/20 text-white focus:border-emerald-500 focus:ring-emerald-500"
                        min={18.6}
                        step={0.1}
                      />
                      <Button
                        variant="outline"
                        className="ml-2 border-white/20 text-white hover:bg-white/10 !rounded-button whitespace-nowrap cursor-pointer"
                        onClick={() => setBidAmount(18.6)}
                      >
                        Min
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Slider
                        defaultValue={[18.75]}
                        max={30}
                        min={18.6}
                        step={0.1}
                        onValueChange={(value) => setBidAmount(value[0])}
                      />
                      <div className="flex justify-between text-xs text-white/50 mt-1">
                        <span>Min: 18.6 ETH</span>
                        <span>Max: 30.0 ETH</span>
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg !rounded-button whitespace-nowrap cursor-pointer">
                        Place Bid Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Confirm Your Bid</DialogTitle>
                        <DialogDescription className="text-white/70">
                          You are about to place a bid of {bidAmount} ETH (≈ $
                          {(bidAmount * 2300).toLocaleString()} USD) for Vintage
                          Chronograph.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between">
                          <span className="text-white/70">Item:</span>
                          <span className="font-medium">
                            Vintage Chronograph
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Your bid:</span>
                          <span className="font-medium">{bidAmount} ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">
                            Service fee (2.5%):
                          </span>
                          <span className="font-medium">
                            {(bidAmount * 0.025).toFixed(4)} ETH
                          </span>
                        </div>
                        <Separator className="my-2 bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Total:</span>
                          <span className="font-bold">
                            {(bidAmount * 1.025).toFixed(4)} ETH
                          </span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer"
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
                      <i className="fas fa-check-circle text-emerald-400 mr-2"></i>
                      <AlertTitle>Bid Placed Successfully!</AlertTitle>
                      <AlertDescription>
                        Your bid of {bidAmount} ETH has been recorded on the
                        blockchain.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fas fa-shield-alt text-emerald-400 mr-2"></i>
                      <span className="text-sm text-white/70">
                        Secure Blockchain Transaction
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-certificate text-emerald-400 mr-2"></i>
                      <span className="text-sm text-white/70">
                        NFT Certificate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Seller: James Donovan</p>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="text-xs border-emerald-500 text-emerald-400 mr-2 !rounded-button whitespace-nowrap"
                      >
                        Verified
                      </Badge>
                      <span className="text-xs text-white/50">
                        Member since 2023
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="far fa-comment-alt mr-2"></i> Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="far fa-user mr-2"></i> View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-gray-800/50 border border-white/10 w-full justify-start">
                <TabsTrigger
                  value="details"
                  onClick={() => setActiveTab('details')}
                  className={`${activeTab === 'details' ? 'bg-emerald-500 text-white' : 'text-white/70'} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  Item Details
                </TabsTrigger>
                <TabsTrigger
                  value="bids"
                  onClick={() => setActiveTab('bids')}
                  className={`${activeTab === 'bids' ? 'bg-emerald-500 text-white' : 'text-white/70'} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  Bid History
                </TabsTrigger>
                <TabsTrigger
                  value="price"
                  onClick={() => setActiveTab('price')}
                  className={`${activeTab === 'price' ? 'bg-emerald-500 text-white' : 'text-white/70'} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  Price History
                </TabsTrigger>
                <TabsTrigger
                  value="provenance"
                  onClick={() => setActiveTab('provenance')}
                  className={`${activeTab === 'provenance' ? 'bg-emerald-500 text-white' : 'text-white/70'} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  Provenance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="bg-gray-800/30 border-white/10 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">
                        Product Specifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Brand</span>
                          <span className="font-medium">Lemania</span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Model</span>
                          <span className="font-medium">
                            Chronograph Ref. 105.012
                          </span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Year</span>
                          <span className="font-medium">1965</span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Case Material</span>
                          <span className="font-medium">
                            Stainless Steel with Gold Accents
                          </span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Movement</span>
                          <span className="font-medium">
                            Manual Wind Caliber 321
                          </span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Diameter</span>
                          <span className="font-medium">39mm</span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between">
                          <span className="text-white/70">Strap</span>
                          <span className="font-medium">Original Leather</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Description</h3>
                      <p className="text-white/80 mb-4">
                        This rare vintage chronograph from the 1960s represents
                        the pinnacle of Swiss watchmaking from the golden era of
                        mechanical timepieces. The watch features a stunning
                        black dial with gold indices and hands, three sub-dials
                        for chronograph functions, and a tachymeter scale on the
                        bezel.
                      </p>
                      <p className="text-white/80 mb-4">
                        The watch has been fully serviced by a certified master
                        watchmaker and is in excellent working condition. The
                        movement has been cleaned, oiled, and calibrated to
                        ensure accurate timekeeping. The case shows light signs
                        of wear consistent with its age, adding to its vintage
                        character and authenticity.
                      </p>
                      <p className="text-white/80">
                        This timepiece comes with its original box, papers, and
                        service history documentation. A rare opportunity to own
                        a piece of horological history with impeccable
                        provenance.
                      </p>

                      <h3 className="text-xl font-bold mt-8 mb-4">
                        Authentication
                      </h3>
                      <div className="flex items-center mb-4">
                        <Badge className="bg-emerald-500 text-white mr-3 !rounded-button whitespace-nowrap">
                          Verified Authentic
                        </Badge>
                        <span className="text-white/70 text-sm">
                          Certified by LXRe Expert Team
                        </span>
                      </div>
                      <p className="text-white/80">
                        This item has been thoroughly examined by our team of
                        watch experts and certified as authentic. The serial
                        numbers have been verified against manufacturer records,
                        and all components have been confirmed as original or
                        period-correct replacements.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="mt-6">
                <Card className="bg-gray-800/30 border-white/10 p-6">
                  <h3 className="text-xl font-bold mb-4">Bid History</h3>
                  <ScrollArea className="h-[400px] pr-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-white">Bidder</TableHead>
                          <TableHead className="text-white text-right">
                            Amount
                          </TableHead>
                          <TableHead className="text-white text-right">
                            Time
                          </TableHead>
                          <TableHead className="text-white text-right">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bidHistory.map((bid) => (
                          <TableRow key={bid.id} className="border-white/10">
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                                    {bid.user.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                {bid.user}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              {bid.amount} ETH
                            </TableCell>
                            <TableCell className="text-right text-white/70">
                              {bid.time}
                            </TableCell>
                            <TableCell className="text-right">
                              {bid.verified ? (
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500 !rounded-button whitespace-nowrap">
                                  <i className="fas fa-check-circle mr-1"></i>{' '}
                                  Verified
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-yellow-400 border-yellow-400 !rounded-button whitespace-nowrap"
                                >
                                  <i className="fas fa-clock mr-1"></i> Pending
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="price" className="mt-6">
                <Card className="bg-gray-800/30 border-white/10 p-6">
                  <h3 className="text-xl font-bold mb-4">Price History</h3>
                  <div className="h-[400px]" id="price-history-chart"></div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-white/70 text-sm">Starting Price</p>
                      <p className="text-xl font-bold">10.0 ETH</p>
                      <p className="text-white/50 text-xs">May 18, 2025</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-white/70 text-sm">Current Bid</p>
                      <p className="text-xl font-bold text-emerald-400">
                        18.5 ETH
                      </p>
                      <p className="text-white/50 text-xs">May 24, 2025</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-white/70 text-sm">Price Increase</p>
                      <p className="text-xl font-bold text-emerald-400">+85%</p>
                      <p className="text-white/50 text-xs">In 6 days</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="provenance" className="mt-6">
                <Card className="bg-gray-800/30 border-white/10 p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Provenance & Ownership History
                  </h3>
                  <div className="relative pl-8 pb-2">
                    <div className="absolute top-0 left-3 h-full w-0.5 bg-emerald-500/30"></div>

                    <div className="relative mb-8">
                      <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <i className="fas fa-check text-xs text-white"></i>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">Original Purchase</h4>
                          <span className="text-white/50 text-sm">1965</span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          Originally purchased from an authorized dealer in
                          Geneva, Switzerland by Mr. Robert Harrington, a
                          British diplomat.
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white/70 !rounded-button whitespace-nowrap"
                        >
                          Original Receipt Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="relative mb-8">
                      <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <i className="fas fa-check text-xs text-white"></i>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">First Auction Sale</h4>
                          <span className="text-white/50 text-sm">1988</span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          Sold at Christie's London auction to private collector
                          James Whitmore for £4,200.
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white/70 !rounded-button whitespace-nowrap"
                        >
                          Auction Record Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="relative mb-8">
                      <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <i className="fas fa-check text-xs text-white"></i>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">Private Collection</h4>
                          <span className="text-white/50 text-sm">
                            2002-2020
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          Part of the renowned Hoffman Collection of vintage
                          timepieces in New York. Serviced twice during this
                          period by certified watchmakers.
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-white/70 !rounded-button whitespace-nowrap"
                        >
                          Service Records Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <i className="fas fa-check text-xs text-white"></i>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold">Current Seller</h4>
                          <span className="text-white/50 text-sm">
                            2023-Present
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          Acquired by James Donovan at Phillips Auction House
                          for $32,500. Full restoration completed in 2024 by
                          master watchmaker.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-white/20 text-white/70 !rounded-button whitespace-nowrap"
                          >
                            Auction Record Verified
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs border-white/20 text-white/70 !rounded-button whitespace-nowrap"
                          >
                            Restoration Documentation
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs border-emerald-500 text-emerald-400 !rounded-button whitespace-nowrap"
                          >
                            Blockchain Certificate
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Items */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-gray-800/30 border-white/10 overflow-hidden hover:shadow-emerald-500/10 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <Badge className="bg-emerald-500 text-white !rounded-button whitespace-nowrap">
                        Live
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-white/50">Current Bid</p>
                        <p className="text-lg font-bold">
                          {item.currentBid} ETH
                        </p>
                      </div>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 !rounded-button whitespace-nowrap cursor-pointer">
                        View Item
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-3xl font-bold tracking-tighter mb-6">
                <span className="text-emerald-400">LX</span>Re
              </div>
              <p className="text-white/70 mb-6">
                The premium blockchain-based bidding platform for luxury
                e-commerce, offering transparent and secure auctions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <i className="fab fa-discord text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Auctions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Blockchain Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    NFT Ownership
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Smart Contracts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Security Measures
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-white/70 mb-4">
                Subscribe to receive updates on exclusive auctions and platform
                features.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-none px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm flex-1"
                />
                <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-r-md rounded-l-none !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
              <div className="mt-6">
                <h4 className="font-bold text-lg mb-4">Payment Methods</h4>
                <div className="flex space-x-3">
                  <i className="fab fa-ethereum text-xl text-white/70"></i>
                  <i className="fab fa-bitcoin text-xl text-white/70"></i>
                  <i className="fab fa-cc-visa text-xl text-white/70"></i>
                  <i className="fab fa-cc-mastercard text-xl text-white/70"></i>
                  <i className="fab fa-cc-paypal text-xl text-white/70"></i>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-white/10" />
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-white/50 text-sm">
              © 2025 LXRe. All rights reserved. | Last updated: May 24, 2025
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
