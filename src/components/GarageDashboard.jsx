import SavedBuildCard from './SavedBuildCard';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GarageDashboard = ({ savedBuilds }) => {
  const safeBuilds = Array.isArray(savedBuilds) ? savedBuilds : [];
  const [filtered, setFiltered] = useState(safeBuilds);
  const [selectedModel, setSelectedModel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (selectedModel === 'All') {
      setFiltered(safeBuilds);
    } else {
      setFiltered(safeBuilds.filter((b) => b.vehicleModel === selectedModel));
    }
  }, [savedBuilds, selectedModel, safeBuilds]);

  const uniqueModels = ['All', ...new Set(safeBuilds.map((b) => b.vehicleModel))];

  if (!Array.isArray(savedBuilds)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-gray-500 text-lg animate-pulse">
          🔧 Loading your garage...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-accent drop-shadow mb-2 text-center font-borg">
          Your Custom Garage
        </h1>
        <p className="text-gray-400 text-center mb-10 font-cyber">
          Review, modify, or expand your builds. Welcome back.
        </p>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white font-cyber">
            Filter by Vehicle Model
          </h2>
          <button
            className="text-sm text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded transition font-cyber"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle vehicle model filter"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-start gap-3 mb-10">
            {uniqueModels.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-2 rounded-full font-semibold tracking-wide transition duration-200 font-cyber ${
                  selectedModel === model
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-800 text-gray-300 hover:bg-red-700 hover:text-white'
                }`}
                aria-label={`Filter by ${model}`}
              >
                {model}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400 text-lg animate-pulse font-cyber">Loading builds...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-md italic font-cyber">No builds found. Start a new one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((build, index) => (
              <SavedBuildCard
                key={build._id || index}
                carModel={build.vehicleModel}
                horsepower={build.horsepower}
                date={new Date(build.createdAt || build._createdAt || Date.now()).toLocaleDateString()}
                status={build.status || 'Pending'}
                price={build.price || 0}
                modsCount={build.modList?.length || 0}
                modList={build.modList || []}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/Build"
            className="inline-block bg-accent hover:bg-secondary text-black font-bold px-6 py-3 rounded-md transition-all duration-200 shadow-md font-cyber"
          >
            + Start a New Build
          </Link>
        </div>
      </div>
    </section>
  );
};

GarageDashboard.propTypes = {
  savedBuilds: PropTypes.arrayOf(
    PropTypes.shape({
      vehicleModel: PropTypes.string.isRequired,
      modifications: PropTypes.string,
      horsepower: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      addOns: PropTypes.string,
      modList: PropTypes.array,
      createdAt: PropTypes.string,
      _createdAt: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
};

export default GarageDashboard;