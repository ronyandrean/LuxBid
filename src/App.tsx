import { useEffect, useState } from "react";
// import { backend } from "./declarations/backend";
import backend from "./ic";


function App() {
  const [auctions, setAuctions] = useState([]);
  const [item, setItem] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [auctionId, setAuctionId] = useState("");
  const [bidder, setBidder] = useState("");

  useEffect(() => {
    fetchAuctions();
  }, []);

  async function fetchAuctions() {
    const data = await backend.listAuctions();
    setAuctions(data);
  }

  async function createAuction() {
    await backend.createAuction(item);
    setItem("");
    fetchAuctions();
  }

  async function placeBid() {
    const result = await backend.placeBid(Number(auctionId), Number(bidAmount), bidder);
    alert(result);
    fetchAuctions();
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Bidding System</h1>

      <h2>Create Products to Bid</h2>
      <input
        placeholder="Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={createAuction}>Submit</button>

      <h2>Auctions</h2>
      <ul>
        {auctions.map((a, i) => (
          <li key={i}>
            {a.id.toString()} - <b>{a.item}</b> | Highest Bid: {a.highestBid.toString()} by {a.highestBidder}
          </li>
        ))}
      </ul>

      <h2>Place Bid</h2>
      <input
        placeholder="Auction ID"
        value={auctionId}
        onChange={(e) => setAuctionId(e.target.value)}
        type="number"
      />
      <input
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        type="number"
      />
      <input
        placeholder="Your Name"
        value={bidder}
        onChange={(e) => setBidder(e.target.value)}
      />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
}

export default App;
