import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ModSelector from './ModSelector';
import HPGauge from './HPGauge';

const vehicleModels = {
  Charger: 'https://my.spline.design/charger-project-id/embed',
  Mustang: 'https://my.spline.design/mustang-project-id/embed',
  Camaro: 'https://my.spline.design/camaro-project-id/embed',
};

const baseStats = {
  Charger: { hp: 370, cost: 30000 },
  Mustang: { hp: 450, cost: 35000 },
  Camaro: { hp: 455, cost: 36000 },
};

export default function DynamicVisualizerBuild() {
  const [selectedVehicle, setSelectedVehicle] = useState('Charger');
  const [selectedMods, setSelectedMods] = useState([]);

  const modelUrl = vehicleModels[selectedVehicle];
  const base = baseStats[selectedVehicle];

  const totalHP = useMemo(() => {
    return selectedMods.reduce((acc, mod) => acc + (mod.hp || 0), base.hp);
  }, [selectedMods, base.hp]);

  const totalCost = useMemo(() => {
    return selectedMods.reduce((acc, mod) => acc + (mod.cost || 0), base.cost);
  }, [selectedMods, base.cost]);

  return (
    <section className="w-full min-h-[600px] bg-gradient-to-b from-black to-gray-900 p-6 md:p-12 flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl md:text-4xl font-bold font-borg text-accent mb-6 text-center drop-shadow">
        Dynamic Build Visualizer
      </h2>

      <div className="w-full max-w-6xl bg-white/5 border border-white/10 rounded-xl shadow-2xl p-6 md:p-10 backdrop-blur-md">
        <div className="relative w-full rounded-xl overflow-hidden">
          <iframe
            src={modelUrl}
            frameBorder="0"
            width="100%"
            height="500"
            allow="autoplay; fullscreen"
            className="w-full h-[500px] rounded-lg border border-white/10 shadow-lg"
            title={`${selectedVehicle} 3D Model`}
          />
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <label htmlFor="vehicle-select" className="text-gray-400 text-sm uppercase tracking-wider">
            Choose a model:
          </label>
          <select
            id="vehicle-select"
            onChange={(e) => {
              setSelectedVehicle(e.target.value);
              setSelectedMods([]); // Reset mods on vehicle change
            }}
            value={selectedVehicle}
            className="bg-black text-white px-6 py-3 rounded-md border border-white/10 font-cyber tracking-wider shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
          >
            {Object.keys(vehicleModels).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ModSelector selectedMods={selectedMods} setSelectedMods={setSelectedMods} />
          </div>

          <div className="flex flex-col gap-6 w-full lg:max-w-sm">
            <HPGauge hp={totalHP} baseHp={base.hp} />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6 italic font-cyber text-center">
        Powered by Spline — 3D vehicle rendering in real time
      </p>
    </section>
  );
}

// Ensure PropTypes are defined for included components
ModSelector.propTypes = {
  selectedMods: PropTypes.array.isRequired,
  setSelectedMods: PropTypes.func.isRequired,
};

HPGauge.propTypes = {
  hp: PropTypes.number.isRequired,
  baseHp: PropTypes.number.isRequired,
};

