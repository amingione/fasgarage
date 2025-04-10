import React, { useState } from 'react';
import BuildVisualizer from './BuildVisualizer';

const BuildPage = ({ onSubmit }) => {
  const [vehicleModel, setVehicleModel] = useState('');
  const [modifications, setModifications] = useState('');
  const [horsepower, setHorsepower] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      vehicleModel,
      modifications,
      horsepower: parseInt(horsepower, 10),
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-accent mb-6 text-center font-borg">Build Your Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Model */}
          <div>
            <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-300 mb-1">
              Vehicle Model
            </label>
            <input
              type="text"
              id="vehicleModel"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. Dodge Charger"
              required
            />
          </div>
          {/* 3D Model Viewer */}
          <div className="w-full h-64 bg-black/30 rounded-lg overflow-hidden">
            <BuildVisualizer vehicleModel={vehicleModel} />
          </div>

          {/* Modifications */}
          <div>
            <label htmlFor="modifications" className="block text-sm font-medium text-gray-300 mb-1">
              Modifications
            </label>
            <textarea
              id="modifications"
              value={modifications}
              onChange={(e) => setModifications(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="List any custom mods or parts installed..."
              rows="4"
            />
          </div>

          {/* Horsepower */}
          <div>
            <label htmlFor="horsepower" className="block text-sm font-medium text-gray-300 mb-1">
              Horsepower
            </label>
            <input
              type="number"
              id="horsepower"
              value={horsepower}
              onChange={(e) => setHorsepower(e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Estimated WHP"
              required
              min="0"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-accent text-black font-bold px-8 py-3 rounded-md hover:bg-accent/90 transition duration-200"
            >
              Get My Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildPage;