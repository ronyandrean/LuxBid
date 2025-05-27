import React, { useState } from 'react';
import './App.css';
import AuctionList from './components/AuctionList';
import AuctionDetail from './components/AuctionDetail';
import NewAuctionForm from './components/NewAuctionForm';

const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const showProductDetail = (id: number): void => {
    setSelectedProductId(id);
    setView('detail');
  };

  const showProductList = (): void => {
    setView('list');
    setSelectedProductId(null);
  };

  const showCreateProduct = (): void => {
    setView('create');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold cursor-pointer" 
              onClick={showProductList}
            >
              Auction Platform
            </h1>
            
            <div className="ml-8 space-x-4">
              <button 
                onClick={showProductList}
                className="hover:text-blue-200"
              >
                Browse Auctions
              </button>
              <button 
                onClick={showCreateProduct}
                className="hover:text-blue-200"
              >
                Create Auction
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {view === 'list' && (
          <AuctionList onSelectProduct={showProductDetail} />
        )}
        
        {view === 'detail' && selectedProductId !== null && (
          <AuctionDetail 
            productId={selectedProductId} 
            onBack={showProductList}
          />
        )}
        
        {view === 'create' && (
          <NewAuctionForm 
            onSuccess={showProductList} 
            onCancel={showProductList}
          />
        )}
      </main>
    </div>
  );
};

export default App;