import { useEffect, useState } from 'react';
// import { backend } from "./declarations/backend";
import backend from './ic';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUs';
import CollectionLuxury from './pages/CollectionLuxury';
import CollectionWatchesPage from './pages/CollectionWatches'
import CollectionJewerlyPage from './pages/CollectionJewerly';
import CollectionFashionPage from './pages/CollectionFashion';
import {BrowserRouter, Routes, Route, createBrowserRouter} from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from './declarations/backend';
import { canisterId } from './declarations/backend/index.js';

function App() {
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
          <Route path="/collection/fashion" element={<CollectionFashionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
