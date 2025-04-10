import React from 'react';

const BuildVisualizer = () => {
  const sketchFabUrl = 'https://sketchfab.com/models/your_model_id/embed'; // replace with actual ID later

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-accent font-borg drop-shadow-sm">
          FAS 3D Build Visualizer
        </h2>

        <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur">
          <iframe
            title="FAS 3D Model"
            src={sketchFabUrl}
            frameBorder="0"
            width="100%"
            height="600"
            allow="autoplay; fullscreen; vr"
            allowFullScreen
            className="w-full h-[600px] md:rounded-xl"
          />
        </div>

        <p className="text-sm text-gray-400 font-cyber italic">
          Viewing placeholder model — your real build will render here soon.
        </p>
      </div>
    </section>
  );
};

export default BuildVisualizer;