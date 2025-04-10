import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GarageLogin from './components/Garage'; // Login screen
import GarageDashboard from './components/GarageDashboard'; // Saved builds
import HomePage from './components/HomePage';
import BuildPage from './components/BuildPage';
import SavedBuildCard from './components/SavedBuildCard';
import BuildVisualizer from './components/BuildVisualizer'; // Build visualizer 
import ModSelector from './components/ModSelector'; // Mod selector
import DynamicVisualizerBuild from './components/DynamicVisualizerBuild';


// Temporary test data for dashboard
const mockBuilds = [
  {
    _id: 'mock1',
    vehicleModel: 'Mustang GT',
    horsepower: 450,
    price: 12500,
    status: 'Reviewed',
    createdAt: new Date().toISOString(),
    modList: [
      { name: 'Cold Air Intake', hpGain: 10 },
      { name: 'ECU Tune', hpGain: 25 },
    ],
  },
  {
    _id: 'mock2',
    vehicleModel: 'Civic Type R',
    horsepower: 320,
    price: 8700,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    modList: [{ name: 'Exhaust System', hpGain: 8 }],
  },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garage-login" element={<GarageLogin />} />
        <Route path="/garage" element={<GarageDashboard savedBuilds={mockBuilds} />} />
        <Route path="/Build" element={<BuildPage  />} />
        <Route path="/Saved-Builds" element={<SavedBuildCard savedBuilds={mockBuilds} />} />
        <Route path="/build-visualizer" element={<BuildVisualizer />} />
        <Route path="/mod-selector" element={<ModSelector />} />
        <Route path="/dynamicvisualizerbuild" element={<DynamicVisualizerBuild />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<div>404 Not Found</div>} />
        {/* Fallback route for 404 */}
      </Routes>
    </Router>
  );
}