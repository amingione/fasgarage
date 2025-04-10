import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'r4og35qd',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-07-27',
});

/**
 * @typedef {Object} ModItem
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {number} hpGain
 * @property {number} price
 * @property {number} cost
 * @property {{ title: string } | undefined} category
 */

export default function ModSelector() {
  const [mods, setMods] = useState([]);
  const [selectedMods, setSelectedMods] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    client
      .fetch(
        `*[_type == "modListItem"]{
          _id,
          name,
          description,
          hpGain,
          price,
          cost,
          category->{title}
        }`
      )
      .then(setMods)
      .catch(console.error);
  }, []);

  const categories = ['All', ...new Set(mods.map((mod) => mod.category?.title || '').filter(Boolean))];

  const toggleMod = (mod) => {
    setSelectedMods((prev) =>
      prev.find((m) => m._id === mod._id)
        ? prev.filter((m) => m._id !== mod._id)
        : [...prev, mod]
    );
  };

  const filteredMods =
    filter === 'All' ? mods : mods.filter((mod) => mod.category?.title === filter);

  const totalHp = selectedMods.reduce((sum, m) => sum + m.hpGain, 0);
  const totalCost = selectedMods.reduce((sum, m) => sum + m.price, 0);

  const handleSaveBuild = async () => {
    const buildData = {
      _type: 'buildQuote',
      createdAt: new Date().toISOString(),
      totalHpGain: totalHp,
      totalCost: totalCost,
      mods: selectedMods.map((mod) => ({
        _type: 'reference',
        _ref: mod._id,
      })),
    };

    try {
      await client.create(buildData);
      alert('✅ Build saved to your garage!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('❌ An error occurred while saving.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 font-borg text-accent">Select Your Mods</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full font-cyber text-sm transition-all duration-150 border ${
              filter === cat
                ? 'bg-accent text-black border-accent'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mod Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMods.map((mod) => {
          const isSelected = selectedMods.some((m) => m._id === mod._id);
          return (
            <div
              key={mod._id}
              className={`p-4 rounded-lg transition-all border shadow-lg backdrop-blur-md ${
                isSelected ? 'bg-red-600/10 border-red-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                {mod.name}
                <span title={mod.description} className="text-blue-400 cursor-help">ℹ️</span>
              </h3>
              <p className="text-sm text-gray-400 mt-1">{mod.description}</p>
              <p className="mt-2 text-green-400 font-cyber">+{mod.hpGain} HP</p>
              <p className="text-yellow-300 font-cyber">${mod.price}</p>
              <button
                onClick={() => toggleMod(mod)}
                className={`mt-3 px-4 py-1.5 rounded text-sm font-bold font-cyber transition duration-150 ${
                  isSelected
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSelected ? 'Remove Mod' : 'Add Mod'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Build Summary */}
      <div className="mt-12 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold mb-3 font-borg">Build Summary</h2>
        {selectedMods.length === 0 ? (
          <p className="text-gray-400 italic">No mods selected yet.</p>
        ) : (
          <>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {selectedMods.map((mod) => (
                <li key={mod._id}>
                  {mod.name} — +{mod.hpGain} HP — ${mod.price}
                </li>
              ))}
            </ul>
            <div className="mt-4 font-cyber">
              <p>Total Horsepower Gain: <span className="text-green-400 font-bold">+{totalHp} HP</span></p>
              <p>Total Estimated Cost: <span className="text-yellow-400 font-bold">${totalCost}</span></p>
            </div>
          </>
        )}
      </div>

      {selectedMods.length > 0 && (
        <div className="text-center mt-10">
          <button
            onClick={handleSaveBuild}
            className="px-8 py-3 bg-accent text-black font-bold rounded-lg shadow hover:bg-red-500 transition-all duration-200"
          >
            💾 Save This Build to Garage
          </button>
        </div>
      )}
    </div>
  );
}