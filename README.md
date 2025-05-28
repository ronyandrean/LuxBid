# Luxbid — Decentralized Auction Platform

**Luxbid** is a decentralized auction platform for luxury goods, built on the **Internet Computer (ICP)** using **Motoko** for the backend and **React (TypeScript)** for the frontend. With Luxbid, users can list, browse, and bid on exclusive items in a secure and transparent environment—without relying on traditional intermediaries.

It aims to revolutionize how people trade high-value items online by ensuring full ownership, verified identity, and immutability via blockchain smart contracts.

---

## 🔧 Tech Stack

- **Frontend:** React.js + TypeScript + Vite
- **Backend:** Motoko (on the Internet Computer)
- **Canister Deployment:** DFX
- **Smart Contract Storage:** Persistent and immutable data on the IC
- **Image Upload:** Base64 image conversion handled on frontend

---

## 🚀 Features

- 🔐 **Decentralized Seller Account** creation
- 📸 **Secure Image Upload** with validation
- 🛍️ **Create Auctions** with:
  - Product name
  - Description
  - Starting price & fixed price
  - Auction duration (1 hour, 1 day, 7 days)
- 📦 **Store & Retrieve Auction Items** from Motoko backend
- 📄 **Smart contract** logic for product listing
- 🔄 **Live data rendering** on product page

---

## 🧪 How to Run Locally

### Clone and Install

```bash
git clone https://github.com/yourusername/luxbid.git
cd luxbid
npm install
```

# Run the Backend
```wsl
dfx start --background
dfx deploy
```
# Start 
```wsl
npm start
```

## 🙌 Credits
Made with 💙 using the Internet Computer and React.


