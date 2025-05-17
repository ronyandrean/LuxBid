module {
  public type Auction = {
    id : Nat;
    item : Text;
    highestBid : Nat;
    highestBidder : Text;
  };

  public func create(id : Nat, item : Text) : Auction {
    {
      id = id;
      item = item;
      highestBid = 0;
      highestBidder = "None";
    }
  };

  public func updateBid(auction : Auction, newBid : Nat, newBidder : Text) : Auction {
    {
      id = auction.id;
      item = auction.item;
      highestBid = newBid;
      highestBidder = newBidder;
    }
  };
}
