import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Form from './components/yeildPredictor';
import LandingPage from './components/landingPage';
import Dashbord from './components/dashboard';
import Weather from './components/weatherAlert';
import InsectIdentifier from './components/InsectIdentifier';
import FarmAI from './components/FarmAi';
import MarketplacePage from './components/Marketplace';

function App() {
  return (
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
  );
}

export default App;