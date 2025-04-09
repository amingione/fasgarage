import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Garage';
import GaragePage from './components/GarageDashboard';

export default function App() {
  return (
    <Router>
      {/* Font test block */}
      <div style={{ fontFamily: 'AmericanCaptain', fontSize: '1.5rem', marginBottom: '1rem' }}>
        AmericanCaptain font test — this should look custom
      </div>

      {/* Navigation */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/garage">Garage</Link></li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garage" element={<GaragePage />} />
      </Routes>
    </Router>
  );
}