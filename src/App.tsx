import { useEffect, useState } from 'react';
// import { backend } from "./declarations/backend";
import './App.css'
import backend from './ic';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUs';
import CollectionLuxury from './pages/CollectionLuxury';
import CollectionWatchesPage from './pages/CollectionWatches';
import CollectionJewerlyPage from './pages/CollectionJewerly';
import CollectionFashionPage from './pages/CollectionFashion';
import Profile from './pages/Profile';
import ProductPage from './ProductPage_Revisi';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from './declarations/backend';
import { canisterId } from './declarations/backend/index.js';

const App = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/account" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/collection/luxury" element={<CollectionLuxury />} />
            <Route
              path="/collection/Watches"
              element={<CollectionWatchesPage />}
            />
            <Route
              path="/collection/jewelry"
              element={<CollectionJewerlyPage />}
            />
            <Route
              path="/collection/fashion"
              element={<CollectionFashionPage />}
            />
            <Route path="/clicked/page" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>

    // import React, { useState } from 'react';
    // import './App.css';
    // import AuctionList from './components/AuctionList';
    // import AuctionDetail from './components/AuctionDetail';
    // import NewAuctionForm from './components/NewAuctionForm';

    // const App: React.FC = () => {
    //   const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
    //   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    //   const showProductDetail = (id: number): void => {
    //     setSelectedProductId(id);
    //     setView('detail');
    //   };

    //   const showProductList = (): void => {
    //     setView('list');
    //     setSelectedProductId(null);
    //   };

    //   const showCreateProduct = (): void => {
    //     setView('create');
    //   };

    //   return (
    //     <div className="min-h-screen bg-gray-100">
    //       <nav className="bg-blue-600 text-white shadow-md">
    //         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
    //           <div className="flex items-center">
    //             <h1
    //               className="text-xl font-bold cursor-pointer"
    //               onClick={showProductList}
    //             >
    //               Auction Platform
    //             </h1>

    //             <div className="ml-8 space-x-4">
    //               <button
    //                 onClick={showProductList}
    //                 className="hover:text-blue-200"
    //               >
    //                 Browse Auctions
    //               </button>
    //               <button
    //                 onClick={showCreateProduct}
    //                 className="hover:text-blue-200"
    //               >
    //                 Create Auction
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </nav>

    //       <main className="container mx-auto px-4 py-8">
    //         {view === 'list' && (
    //           <AuctionList onSelectProduct={showProductDetail} />
    //         )}

    //         {view === 'detail' && selectedProductId !== null && (
    //           <AuctionDetail
    //             productId={selectedProductId}
    //             onBack={showProductList}
    //           />
    //         )}

    //         {view === 'create' && (
    //           <NewAuctionForm
    //             onSuccess={showProductList}
    //             onCancel={showProductList}
    //           />
    //         )}
    //       </main>
    //     </div>
  );
};

export default App;
