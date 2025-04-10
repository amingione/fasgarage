import { useState } from 'react';
import HPGauge from './HPGauge';

/**
 * @param {{ onHPChange: (hp: number) => void }}
 */
export default function HorsepowerSlider({ onHPChange }) {
  const [hp, setHp] = useState(700);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setHp(value);
    onHPChange(value);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <HPGauge horsepower={hp} />

      <div className="w-full px-4 md:px-0 max-w-xl">
        <label
          htmlFor="hp-slider"
          className="block text-center text-sm text-gray-400 font-cyber mb-2"
        >
          Adjust Horsepower Output
        </label>
        <input
          id="hp-slider"
          type="range"
          min="600"
          max="1500"
          value={hp}
          onChange={handleChange}
          className="w-full accent-accent cursor-pointer transition-all duration-300"
          aria-label="Horsepower range slider"
        />
        <div className="mt-3 text-center">
          <span className="text-accent font-semibold text-lg font-cyber tracking-wide">
            {hp} whp
          </span>
        </div>
      </div>
    </div>
  );
}