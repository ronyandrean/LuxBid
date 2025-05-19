import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import { canisterId, idlFactory } from './declarations/backend';
// import './index.scss';
<<<<<<< HEAD
import LandingPage from './LandingPage';
import AboutUsPage from './AboutUs';
import LuxuryCollection from './CollectionLuxury';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
=======
// import LandingPage from './LandingPage';
// import AboutUsPage from './AboutUs';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 938947ce5f0d5264256e2c389ea04a7e7b04e75e

// import { canisterId, idlFactory } from './declarations/backend';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/collection/luxury" element={<LuxuryCollection />}></Route>
      </Routes>
    </BrowserRouter>
=======
      <App />
>>>>>>> 938947ce5f0d5264256e2c389ea04a7e7b04e75e
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <AgentProvider withProcessEnv>
//       {/* <ActorProvider idlFactory={idlFactory} canisterId={canisterId}> */}
//         <LandingPage />
//         {/* <App /> */}
//       {/* </ActorProvider> */}
//     </AgentProvider>
//   </React.StrictMode>,
// );
