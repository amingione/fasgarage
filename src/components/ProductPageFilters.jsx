import { useState, useEffect } from 'react';

const vehicleModels = [
  'Charger', 'Challenger', 'TRX', 'Trackhawk',
  'Durango', 'Mustang', 'Raptor', 'F150', 'F250', 'F350', 'F450',
];
const tuneOptions = ['Required', 'Not Required'];

export default function ProductPageFilters({ onFilterChange }) {
  const [vehicle, setVehicle] = useState(null);
  const [tune, setTune] = useState(null);
  const [horsepower, setHorsepower] = useState(600);

  useEffect(() => {
    onFilterChange?.({ vehicle, tune, horsepower });
  }, [vehicle, tune, horsepower]);

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-6 shadow-lg">
      {/* VEHICLE FILTER */}
      <div>
        <h3 className="text-lg font-bold font-borg text-accent mb-3 tracking-wide">Vehicle Model</h3>
        <div className="flex flex-wrap gap-2">
          {vehicleModels.map((model) => (
            <button
              key={model}
              type="button"
              aria-pressed={vehicle === model}
              onClick={() => setVehicle(model)}
              className={`px-4 py-2 text-sm font-cyber rounded-full transition-all duration-200 border ${
                vehicle === model
                  ? 'bg-accent text-black border-accent shadow-md'
                  : 'bg-white/10 text-white border-white/10 hover:bg-accent hover:text-black'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* TUNE FILTER */}
      <div>
        <h3 className="text-lg font-bold font-borg text-accent mb-3 tracking-wide">Tune Required</h3>
        <div className="flex flex-wrap gap-4">
          {tuneOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={tune === option}
              onClick={() => setTune(option)}
              className={`px-4 py-2 text-sm font-cyber rounded-full transition-all duration-200 border ${
                tune === option
                  ? 'bg-accent text-black border-accent shadow-md'
                  : 'bg-white/10 text-white border-white/10 hover:bg-accent hover:text-black'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* HP RANGE FILTER */}
      <div>
        <h3 className="text-lg font-bold font-borg text-accent mb-3 tracking-wide">Horsepower Range</h3>
        <input
          type="range"
          min="600"
          max="1500"
          step="50"
          value={horsepower}
          onChange={(e) => setHorsepower(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer"
          aria-label="Horsepower range"
        />
        <div className="text-sm font-cyber text-gray-400 mt-2">
          Selected WHP: <span className="text-accent font-bold">{horsepower} whp</span>
        </div>
      </div>
    </div>
  );
}