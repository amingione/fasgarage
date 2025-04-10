import { useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';

export default function QuoteSidebar({ selectedHP = 700 }) {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [carModel, setCarModel] = useState('Charger');

  useEffect(() => {
    const basePrice = 2000;
    const additional = Math.max(0, selectedHP - 600) * 50;
    setPrice(basePrice + additional);
  }, [selectedHP]);

  const handleSubmit = async () => {
    const quote = {
      _type: 'quote',
      name,
      email,
      horsepower: selectedHP,
      price,
      carModel,
    };

    try {
      await client.create(quote);
      alert('✅ Quote submitted to FAS Motorsports!');
    } catch (err) {
      console.error('Sanity submit error:', err);
      alert('❌ Error submitting your quote. Please try again.');
    }
  };

  return (
    <aside className="bg-black/40 backdrop-blur-xl border border-white/10 text-white p-6 rounded-xl shadow-2xl sticky top-6 space-y-6 font-cyber">
      <h2 className="text-2xl font-bold font-borg text-accent drop-shadow">Your Build Summary</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 rounded px-4 py-2 text-white border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-accent outline-none"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 rounded px-4 py-2 text-white border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-accent outline-none"
            placeholder="you@email.com"
          />
        </div>

        {/* Car Model */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Car Model</label>
          <select
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="w-full bg-white/10 rounded px-4 py-2 text-white border border-white/20 focus:ring-2 focus:ring-accent outline-none"
          >
            {[
              'Charger', 'Challenger', 'TRX', 'Trackhawk',
              'Durango', 'Mustang', 'Raptor', 'Shelby Truck',
              'F150', 'F250', 'F350', 'F450'
            ].map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="flex justify-between text-sm mt-6">
          <span className="text-gray-400">Selected Horsepower:</span>
          <span className="text-accent font-bold">{selectedHP} whp</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Price:</span>
          <span className="text-yellow-400 font-bold">${price.toLocaleString()}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full mt-4 bg-accent hover:bg-red-600 text-black py-3 rounded-md font-bold transition-all duration-200 shadow-md"
        onClick={handleSubmit}
      >
        🚀 Request My Build Quote
      </button>
    </aside>
  );
}