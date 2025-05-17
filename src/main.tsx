import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { canisterId, idlFactory } from './declarations/backend';
import './index.scss';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
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
