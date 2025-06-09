import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Form from './components/yeildPredictor';
import LandingPage from './components/landingPage';
import Dashbord from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<Form />} />
        <Route path="/dashboard" element={<Dashbord />} />
      </Routes>
    </Router>
  );
}

export default App;