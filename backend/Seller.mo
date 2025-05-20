import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Array "mo:base/Array";

actor {
  type ProductId = Nat;

  type Product = {
    id: ProductId;
    sellerName: Text;
    productName: Text;
    startPrice: Nat;
    imageUrl: Text;
    deadline: Time.Time;
    description: Text;
    history: ?Text; 
  };

  var products : [Product] = [];
  var nextId : ProductId = 0;

  public func addProduct(
    sellerName: Text,
    productName: Text,
    startPrice: Nat,
    imageUrl: Text,
    deadline: Time.Time,
    description: Text,
    history: ?Text
  ) : async ProductId {
    let product: Product = {
      id = nextId;
      sellerName = sellerName;
      productName = productName;
      startPrice = startPrice;
      imageUrl = imageUrl;
      deadline = deadline;
      description = description;
      history = history;
    };

    products := Array.append(products, [product]);
    nextId += 1;
    return product.id;
  };

   public query func getAllProducts() : async [Product] {
    return products;
  };

};
