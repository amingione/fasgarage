import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-5xl font-bold text-accent drop-shadow mb-4 font-borg">
            Welcome to FAS Garage
        </h1>
        <p className="text-gray-400 max-w-xl mb-8 font-cyber text-lg">
            Build. Quote. Track. Your fully customized performance garage experience starts here.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
            <Link
                to="/garage-login"
                className="bg-accent text-black font-semibold px-6 py-3 rounded hover:bg-accent/90 transition"
            >
                Access My Garage
            </Link>
            <Link
                to="/garage"
                className="bg-white/10 text-white font-semibold px-6 py-3 rounded hover:bg-white/20 transition"
            >
                View Builds
            </Link>
            <Link
                to="/DynamicVisualizerBuild"
                className="bg-white/10 text-white font-semibold px-6 py-3 rounded hover:bg-white/20 transition"
            >
                New Build
            </Link>
        </div>
    </main>
);
}