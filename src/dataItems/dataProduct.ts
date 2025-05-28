import { Principal } from '@dfinity/principal';
import TravisScott from '../assets/jordanXtravisscott.png';
import LVBag1 from '../assets/LV-bag-1.png';
import HermesBag1 from '../assets/Hermes-Bag-1.png';
import AirJordan5 from '../assets/bidcard2.png';

export interface Product {
  id: number;
  productName: string;
  startPrice: bigint;
  fixPrice: bigint;
  deadline: bigint;
  description: string;
  image: string;
  history: any[];
  highestBid: bigint;
  highestBidder: Principal;
}

// Waktu sekarang dalam nanosecond
const nowNs = BigInt(Date.now() * 1_000_000);

// Dummy data
const dummyProducts: Product[] = [
  {
    id: 1,
    productName: 'LV Bag',
    startPrice: BigInt(1_000_000),
    fixPrice: BigInt(2_000_000),
    deadline: nowNs + BigInt(86_400_000_000_000),
    description: 'Luxury LV Bag still active',
    image: LVBag1,
    history: [],
    highestBid: BigInt(1_500_000),
    highestBidder: Principal.fromText('aaaaa-aa'),
  },
  {
    id: 2,
    productName: 'Hermes Bag',
    startPrice: BigInt(3_000_000),
    fixPrice: BigInt(5_000_000),
    deadline: nowNs - BigInt(1_000_000_000),
    description: 'Auction already finished',
    image: HermesBag1,
    history: [],
    highestBid: BigInt(4_000_000),
    highestBidder: Principal.fromText('aaaaa-aa'),
  },
  {
    id: 3,
    productName: 'Jordan x Travis Scott',
    startPrice: BigInt(1_000_000),
    fixPrice: BigInt(4_000_000),
    deadline: nowNs + BigInt(2_000_000_000_000),
    description: 'Sneaker collab edition',
    image: TravisScott,
    history: [],
    highestBid: BigInt(3_500_000),
    highestBidder: Principal.fromText('aaaaa-aa'),
  },
  {
    id: 4,
    productName: 'Air Jordan 5 Lightning',
    startPrice: BigInt(1_300_000),
    fixPrice: BigInt(4_200_000),
    deadline: nowNs + BigInt(2_000_000_000_000),
    description: 'Bright yellow lightning edition.',
    image: AirJordan5,
    history: [],
    highestBid: BigInt(2_900_000),
    highestBidder: Principal.fromText('ccccc-cc'),
  },
];

export default dummyProducts;
