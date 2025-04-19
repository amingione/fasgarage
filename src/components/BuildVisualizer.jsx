import React from 'react';

export default function BuildVisualizer({ vehicle }) {
  const modelUrl = vehicle
    ? `https://my.spline.design/${vehicle}-model-id/embed`
    : 'https://my.spline.design/default-model-id/embed';

  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 text-white py-12 px-4 rounded-xl shadow-xl border border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent font-borg mb-6 drop-shadow">
          Build Visualizer
        </h2>

        <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 backdrop-blur-md">
          <iframe
            src={modelUrl}
            title={`3D visualizer for ${vehicle || 'default vehicle'}`}
            frameBorder="0"
            width="100%"
            height="500px"
            className="w-full h-[500px] rounded-xl transition-all duration-300"
            allow="autoplay; fullscreen"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
            <p className="text-gray-300 text-lg animate-pulse font-cyber">
              {vehicle
                ? `Rendering ${vehicle} configuration...`
                : 'Loading visualizer...'}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 italic font-cyber">
          Real-time 3D build viewer powered by Spline — performance packages coming soon.
        </p>
      </div>
    </section>
  );
}