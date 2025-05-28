import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Option "mo:base/Option";

actor {
  // Type definitions
  public type Product = {
    id : Nat;
    productName : Text;
    startPrice : Nat;
    fixPrice : Nat;
    deadline : Time.Time;
    description : Text;
    image : Text;
    history : [Bid];
    highestBid : Nat;
    highestBidder : Principal;
  };

  public type Bid = {
    bidder : Principal;
    amount : Nat;
    timestamp : Time.Time;
  };

  public type Seller = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
  };

  // State variables
  stable var nextId : Nat = 0;
  stable var products : List.List<Product> = List.nil<Product>();
  stable var nextSellerId : Nat = 0;
  stable var sellers : List.List<Seller> = List.nil<Seller>();

  // Helper functions
  func findProduct(productId : Nat) : ?Product {
    List.find<Product>(products, func(p) { p.id == productId });
  };

  func findSeller(sellerId : Nat) : ?Seller {
    List.find<Seller>(sellers, func(s) { s.id == sellerId });
  };

  func updateProduct(updatedProduct : Product) : () {
    products := List.map<Product, Product>(
      products,
      func(p) {
        if (p.id == updatedProduct.id) updatedProduct else p;
      },
    );
  };

  // Seller System
  public shared (msg) func addProduct(
    productName : Text,
    startPrice : Nat,
    fixPrice : Nat,
    deadline : Time.Time,
    description : Text,
    image : Text,
  ) : async Nat {
    let caller = msg.caller;

    // if (Principal.isAnonymous(caller)) {
    //   Debug.trap("Anonymous users cannot create auctions");
    // };

    if (startPrice <= 0) {
      Debug.trap("Start price must be greater than zero");
    };

    if (fixPrice <= startPrice) {
      Debug.trap("Fixed price must be greater than start price");
    };

    if (deadline <= Time.now()) {
      Debug.trap("Deadline must be in the future");
    };

    let product : Product = {
      id = nextId;
      productName = productName;
      startPrice = startPrice;
      fixPrice = fixPrice;
      deadline = deadline;
      description = description;
      image = image;
      history = [];
      highestBid = startPrice;
      highestBidder = Principal.fromText("aaaaa-aa"); // Default principal dari Motoko docs idk why aaaa-aa??!
    };

    products := List.push(product, products);
    nextId += 1;
    return product.id;
  };

  public shared (msg) func addSeller(
    firstName : Text,
    lastName : Text,
    email : Text,
    phone : Text,
  ) : async Nat {
    let caller = msg.caller;

    // if (Principal.isAnonymous(caller)) {
    //   Debug.trap("Anonymous users cannot create auctions");
    // };

    let seller : Seller = {
      id = nextSellerId;
      firstName = firstName;
      lastName = lastName;
      email = email;
      phone = phone;
    };

    sellers := List.push(seller, sellers);
    nextSellerId += 1;
    return seller.id;
  };

  // Product Management Check Products at Luxbidd!!
  public query func getAllProducts() : async [Product] {
    return List.toArray(products);
  };

  public query func getProductById(pid : Nat) : async ?Product {
    findProduct(pid);
  };

  // Check products that are still active auction, Filteringg!!
  public query func getActiveProducts() : async [Product] {
    let now = Time.now();
    return List.toArray(
      List.filter(
        products,
        func(p : Product) : Bool {
          return p.deadline > now;
        },
      )
    );
  };

  // Bidding System
  public shared (msg) func placeBid(productId : Nat, amount : Nat) : async Text {
    let caller = msg.caller;

    // if (Principal.isAnonymous(caller)) {
    //   return "Anonymous bidding not allowed.";
    // };

    let now = Time.now();

    // Find the product
    switch (findProduct(productId)) {
      case (null) {
        return "Product not found.";
      };

      case (?product) {
        // Check if auction is still active
        if (product.deadline < now) {
          return "Auction has ended.";
        };

        // Check if bid is high enough
        if (amount <= product.highestBid) {
          return "Bid too low. Current highest bid is " # Nat.toText(product.highestBid) # ".";
        };

        // Create new bid record (List to History)
        let newBid : Bid = {
          bidder = caller;
          amount = amount;
          timestamp = now;
        };

        // Create updated product ( Updating product for checking!)
        let newHistory = Array.append<Bid>(product.history, [newBid]);

        // Check if fixed price is met THEN END THE AUCTION!!
        if (amount >= product.fixPrice) {
          let updatedProduct : Product = {
            id = product.id;
            productName = product.productName;
            startPrice = product.startPrice;
            fixPrice = product.fixPrice;
            deadline = now; // End the auction immediately
            description = product.description;
            image = product.image;
            history = newHistory;
            highestBid = amount;
            highestBidder = caller;
          };

          updateProduct(updatedProduct);
          return "Congratulations! You've met the fixed price and won the auction.";
        } else {

          // Regular bid (Bid when not met the fixed price!!)
          let updatedProduct : Product = {
            id = product.id;
            productName = product.productName;
            startPrice = product.startPrice;
            fixPrice = product.fixPrice;
            deadline = product.deadline;
            description = product.description;
            image = product.image;
            history = newHistory;
            highestBid = amount;
            highestBidder = caller;
          };

          updateProduct(updatedProduct);
          return "Bid placed successfully! You are now the highest bidder.";
        };
      };
    };
  };

  public shared (msg) func finalizeAuction(productId : Nat) : async Text {
    let caller = msg.caller;
    let now = Time.now();

    switch (findProduct(productId)) {
      case (null) {
        return "Product not found.";
      };

      case (?product) {
        // Only allow the product creator or admin to finalize
        if (product.deadline <= now) {
          return "Auction has already ended.";
        };

        let updatedProduct : Product = {
          id = product.id;
          productName = product.productName;
          startPrice = product.startPrice;
          fixPrice = product.fixPrice;
          deadline = now; // End the auction immediately
          description = product.description;
          image = product.image;
          history = product.history;
          highestBid = product.highestBid;
          highestBidder = product.highestBidder;
        };

        updateProduct(updatedProduct);
        return "Auction finalized successfully!";
      };
    };
  };

  // Additional helper functions for HISTORY BIDDINGG!
  public query func getAuctionHistory(productId : Nat) : async ?[Bid] {
    switch (findProduct(productId)) {
      case (null) { null };
      case (?product) { ?product.history };
    };
  };

  // End the auctionn!!
  public query func getCompletedAuctions() : async [Product] {
    let now = Time.now();
    return List.toArray(
      List.filter(
        products,
        func(p : Product) : Bool {
          return p.deadline <= now;
        },
      )
    );
  };

  // Get auctions by highest bid for Filtering!!
  public query func getAuctionsByHighestBid() : async [Product] {
    let productArray = List.toArray(products);
    Array.sort(
      productArray,
      func(a : Product, b : Product) : { #less; #equal; #greater } {
        if (a.highestBid > b.highestBid) { #less } else if (a.highestBid < b.highestBid) {
          #greater;
        } else { #equal };
      },
    );
  };

  // Check if user is highest bidder
  public shared (msg) func isHighestBidder(productId : Nat) : async Bool {
    let caller = msg.caller;

    switch (findProduct(productId)) {
      case (null) { false };
      case (?product) {
        Principal.equal(product.highestBidder, caller);
      };
    };
  };
};
