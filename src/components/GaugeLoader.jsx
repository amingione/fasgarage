import { useEffect, useState } from 'react';

export default function GaugeLoader() {
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => {
        let next = prev + 5 * direction;
        if (next >= 180 || next <= 0) {
          setDirection(d => -d);
        }
        return Math.max(0, Math.min(180, next));
      });
    }, 16);
    return () => clearInterval(interval);
  }, [direction]);

  const needleX = 100 + 80 * Math.cos(Math.PI * (angle - 90) / 180);
  const needleY = 100 + 80 * Math.sin(Math.PI * (angle - 90) / 180);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-50">
      <div className="text-center">
        <svg viewBox="0 0 200 200" className="w-60 h-60 animate-pulse">
          <defs>
            <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" stroke="url(#gauge-gradient)" strokeWidth="15" fill="none" />
          <circle cx="100" cy="100" r="80" fill="#111" />
          <line
            x1="100"
            y1="100"
            x2={needleX}
            y2={needleY}
            stroke="#FF0000"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="#FF0000" className="animate-ping" />
        </svg>
        <p className="mt-6 text-gray-300 font-cyber text-xl animate-pulse tracking-wide">
          Loading your garage...
        </p>
      </div>
    </div>
  );
}