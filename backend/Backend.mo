import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {

  public type Product = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    email : Text;
    phone : Text;
    productName : Text;
    startPrice : Nat;
    fixPrice : Nat;
    deadline : Time.Time;
    description : Text;
    image : Text;
    history : [Text];
    highestBid : Nat;
    highestBidder : Text;
  };

  var nextId : Nat = 0;
  var products : List.List<Product> = List.nil<Product>();

  // Seller System

  public func addProduct(
    firstName : Text,
    lastName : Text,
    email : Text,
    phone : Text,
    productName : Text,
    startPrice : Nat,
    fixPrice : Nat,
    deadline : Time.Time,
    description : Text,
    image : Text,
  ) : async Nat {
    let product : Product = {
      id = nextId;
      firstName = firstName;
      lastName = lastName;
      email = email;
      phone = phone;
      productName = productName;
      startPrice = startPrice;
      fixPrice = fixPrice;
      deadline = deadline;
      description = description;
      image = image;
      history = [];
      highestBid = startPrice;
      highestBidder = "";
    };
    products := List.push(product, products);
    nextId += 1;
    return product.id;
  };

  // Product Management

  public query func getAllProducts() : async [Product] {
    return List.toArray(products);
  };

  public query func getProductById(pid : Nat) : async ?Product {
    for (p in Iter.fromList(products)) {
      if (p.id == pid) {
        return ?p;
      };
    };
    return null;
  };

  // Bidding System 

  public func placeBid(productId : Nat, amount : Nat, bidder : Text) : async Text {
    var updated : List.List<Product> = List.nil<Product>();
    var bidPlaced = false;

    for (p in Iter.fromList(products)) {
      if (p.id == productId) {
        if (amount > p.highestBid) {
          let newHistory = Array.append(p.history, [bidder]);
          let newProduct : Product = {
            id = p.id;
            firstName = p.firstName;
            lastName = p.lastName;
            email = p.email;
            phone = p.phone;
            productName = p.productName;
            startPrice = p.startPrice;
            fixPrice = p.fixPrice;
            deadline = p.deadline;
            description = p.description;
            image = p.image;
            history = newHistory;
            highestBid = amount;
            highestBidder = bidder;
          };
          updated := List.push(newProduct, updated);
          bidPlaced := true;
        } else {
          return "Bid too low.";
        };
      } else {
        updated := List.push(p, updated);
      };
    };

    if (bidPlaced) {
      products := List.reverse(updated);
      return "Bid placed!";
    } else {
      return "Product not found.";
    };
  };
};
