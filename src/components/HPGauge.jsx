import { useEffect, useRef, useState } from 'react';

export default function HPGauge({ horsepower }) {
  const [angle, setAngle] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    const targetAngle = ((Math.min(Math.max(horsepower, 600), 1500) - 600) / 900) * 180;

    const animate = () => {
      setAngle((prev) => {
        const diff = targetAngle - prev;
        const step = diff * 0.1;
        if (Math.abs(diff) < 0.5) return targetAngle;
        requestRef.current = requestAnimationFrame(animate);
        return prev + step;
      });
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [horsepower]);

  const needleX = 100 + 80 * Math.cos(Math.PI * (angle - 90) / 180);
  const needleY = 100 + 80 * Math.sin(Math.PI * (angle - 90) / 180);

  return (
    <div className="relative w-48 h-24 mx-auto">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <defs>
          <linearGradient id="gaugeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
        </defs>
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          fill="none"
          stroke="url(#gaugeFill)"
          strokeWidth="10"
        />
        <line
          x1="100"
          y1="100"
          x2={needleX}
          y2={needleY}
          stroke="#00ffff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="5" fill="#00ffff" />
      </svg>
      <p className="absolute left-1/2 bottom-[-16px] transform -translate-x-1/2 text-accent font-cyber text-sm tracking-wider">
        {horsepower} whp
      </p>
    </div>
  );
}