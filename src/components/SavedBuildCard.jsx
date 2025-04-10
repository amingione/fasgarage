import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SavedBuildCard({
  carModel,
  horsepower,
  date,
  status = 'Pending',
  price = 14200,
  modsCount = 7,
  modList = [],
}) {
  const [expanded, setExpanded] = useState(false);

  const getStatusStyles = () => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Reviewed':
        return 'bg-green-500/20 text-green-400';
      case 'Scheduled':
        return 'bg-blue-500/20 text-blue-400';
      case 'Completed':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleViewQuote = () => {
    alert(`Opening quote for ${carModel}`);
  };

  const handleEditBuild = () => {
    alert(`Editing build for ${carModel}`);
  };

  const handleOrderParts = () => {
    alert(`Redirecting to order parts for ${carModel}`);
  };

  const handleScheduleInstall = () => {
    alert(`Scheduling install for ${carModel}`);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:shadow-lg transition shadow-black/20 cursor-pointer group">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold group-hover:text-accent transition">{carModel}</h3>
        <span className={`text-sm px-2 py-1 rounded ${getStatusStyles()}`}>{status}</span>
      </div>

      <p className="text-gray-300 text-sm mb-1">
        Horsepower: <span className="text-white font-medium">{horsepower} whp</span>
      </p>
      <p className="text-gray-300 text-sm mb-1">
        Estimated Price: <span className="text-green-400 font-semibold">${price.toLocaleString()}</span>
      </p>
      <p className="text-gray-300 text-sm mb-1">
        Mods: <span className="text-white">{modsCount} installed</span>
      </p>
      <p className="text-gray-500 text-xs">Saved on: {date}</p>

      {expanded && modList.length > 0 && (
        <div className="bg-black/30 rounded-md border border-white/10 mt-4 p-3">
          <h4 className="text-white font-semibold text-sm mb-2">Installed Mods</h4>
          <ul className="space-y-1 text-gray-300 text-sm">
            {modList.map((mod, i) => (
              <li key={i} className="flex justify-between">
                <span>{mod.name}</span>
                <span className="text-green-400">+{mod.hpGain} hp</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleViewQuote}
          className="bg-accent text-black text-sm px-3 py-1 rounded hover:bg-accent/90 transition"
        >
          View Quote
        </button>
        <button
          onClick={handleEditBuild}
          className="bg-white/10 text-white text-sm px-3 py-1 rounded hover:bg-white/20 transition"
        >
          Edit Build
        </button>
        <button
          onClick={handleOrderParts}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Order Parts
        </button>
        <button
          onClick={handleScheduleInstall}
          className="bg-purple-600 text-white text-sm px-3 py-1 rounded hover:bg-purple-700 transition"
        >
          Schedule My Install
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-white/10 text-white text-sm px-3 py-1 rounded hover:bg-white/20 transition"
        >
          {expanded ? 'Hide Mods' : 'Show Mods'}
        </button>
      </div>
    </div>
  );
}

SavedBuildCard.propTypes = {
  carModel: PropTypes.string.isRequired,
  horsepower: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string,
  price: PropTypes.number,
  modsCount: PropTypes.number,
  modList: PropTypes.array,
};