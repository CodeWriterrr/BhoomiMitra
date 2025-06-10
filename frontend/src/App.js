import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Form from './components/yeildPredictor';
import LandingPage from './components/landingPage';
import Dashbord from './components/dashboard';
import Weather from './components/weatherAlert';
import InsectIdentifier from './components/InsectIdentifier';
import FarmAI from './components/FarmAi';
import MarketplacePage from './components/Marketplace';

function App() {
  return (
    
   <Auth0Provider
    domain="dev-nj2gl6mp3nq4fg6c.us.auth0.com"
    clientId="QoG0woG0TOr0NRMM9n4xE9hxcBh06l5d"
    authorizationParams={{
      redirect_uri: window.location.origin +"/dashboard"
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<Form />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/insect-identifier" element={<InsectIdentifier />} />
        <Route path="/farm-ai" element={<FarmAI />} />
        <Route path="/marketplace" element={<MarketplacePage />} />

      </Routes>
    </Router>
  </Auth0Provider>
  );
}

export default App;