import Auction "./Auction";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {
  let maxAuctions : Nat = 100;
  let auctions : [var Auction.Auction] = Array.init<Auction.Auction>(
    maxAuctions,
    { highestBid = 0; highestBidder = ""; id = 0; item = "" },
  );
  var nextId : Nat = 0;

  public query func listAuctions() : async [Auction.Auction] {
    Array.tabulate<Auction.Auction>(nextId, func(i) { auctions[i] });
  };

  public func createAuction(item : Text) : async () {
    if (nextId >= maxAuctions) return;
    let newAuction = Auction.create(nextId, item);
    auctions[nextId] := newAuction;
    nextId += 1;
  };

  public func placeBid(auctionId : Nat, bid : Nat, bidder : Text) : async Text {
    if (auctionId >= nextId) {
      return "Auction not found";
    };

    let current = auctions[auctionId];

    if (bid <= current.highestBid) {
      return "Bid too low";
    };

    let updated = Auction.updateBid(current, bid, bidder);
    auctions[auctionId] := updated;

    return "Bid placed!";
  };
};
