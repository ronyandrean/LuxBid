import { useEffect, useState } from 'react';
// import { backend } from "./declarations/backend";
import './App.css';
import backend from './ic';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUs';
import CollectionLuxury from './pages/CollectionLuxury';
import CollectionWatchesPage from './pages/CollectionWatches';
import CollectionJewerlyPage from './pages/CollectionJewerly';
import CollectionFashionPage from './pages/CollectionFashion';
import Profile from './pages/Profiles';
import ProductPage from './pages/ProductPage_Revisi';
import History from './pages/History';
import HistorySelling from './pages/HistorySelling';
import SellingContact from './pages/SellingContact';
import SellingItem from './pages/SellingItem';

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
import TestingBackend from './pages/TestingBackend';
import { useParams } from 'react-router-dom';

type LandingPageProps = {
  onSelectProduct: (productId: string) => void;
};

function ProductPageWrapper() {
  const { productId } = useParams();
  return (
    <ProductPage
      productId={Number(productId)}
      onBack={() => window.history.back()}
    />
  );
}

// test

const App = () => {
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/collection/luxury" element={<CollectionLuxury />} />
          <Route path="/collection/Watches" element={<CollectionWatchesPage />} />
          <Route path="/collection/jewelry" element={<CollectionJewerlyPage />} />

          <Route path="/collection/fashion" element={<CollectionFashionPage />} /> */}
          <Route path="/product/:productId" element={<ProductPageWrapper />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/history-bidding" element={<History />} />
          <Route path="/history-selling" element={<HistorySelling />} /> */}
          <Route
            path="/selling-contact"
            element={
              <SellingContact
                onCancel={showProductList}
                onSuccess={showProductList}
              />
            }
          />
          <Route
            path="/selling-item"
            element={
              <SellingItem
                onCancel={showProductList}
                onSuccess={showProductList}
              />
            }
          />
          <Route path="/collection/fashion" element={<CollectionFashionPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history-bidding" element={<History />} />
          <Route path="/history-selling" element={<HistorySelling />} />
          <Route path="/selling-contact" element={<SellingContact />} />
          <Route path="/selling-item" element={<SellingItem />} />
          <Route path="/testing" element={<TestingBackend />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
