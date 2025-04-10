import PropTypes from 'prop-types';
import React from 'react';

const PropTypesComponent = ({ savedBuilds }) => {
  const builds = Array.isArray(savedBuilds) && savedBuilds.length > 0
    ? savedBuilds
    : [
        {
          vehicleModel: 'GT-R R35',
          modifications: 'Full bolt-ons, E85, twin turbos',
          horsepower: 950,
          price: 28800,
        },
        {
          vehicleModel: 'Challenger Hellcat',
          modifications: 'Pulley, injectors, tune',
          horsepower: 850,
          price: 14500,
        },
      ];

  return (
    <section className="w-full bg-white/5 border border-white/10 rounded-lg shadow-md p-6 space-y-4 text-white font-cyber">
      <h2 className="text-2xl font-borg text-accent">Saved Builds</h2>
      <div className="space-y-4">
        {builds.map((build, index) => (
          <div
            key={index}
            className="p-4 bg-black/30 border border-white/10 rounded-md transition hover:bg-black/40"
          >
            <h3 className="text-lg font-semibold text-white mb-1">{build.vehicleModel}</h3>
            <p className="text-sm text-gray-400 mb-1 italic">
              {build.modifications || 'No mods listed'}
            </p>
            <p className="text-sm text-green-400">Horsepower: {build.horsepower} whp</p>
            <p className="text-sm text-yellow-400">Price: ${build.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

PropTypesComponent.propTypes = {
  savedBuilds: PropTypes.arrayOf(
    PropTypes.shape({
      vehicleModel: PropTypes.string.isRequired,
      modifications: PropTypes.string,
      horsepower: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PropTypesComponent;