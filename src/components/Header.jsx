import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black border-b border-white/10 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-borg text-accent tracking-wide hover:text-white transition">
          FAS Garage
        </Link>
        <nav className="flex items-center space-x-6 font-cyber text-sm uppercase text-white">
          <Link to="/garage" className="hover:text-accent transition duration-150">My Garage</Link>
          <Link to="/buildpage" className="hover:text-accent transition duration-150">Start Build</Link>
          <Link to="/buildvisualizer" className="hover:text-accent transition duration-150">Visualizer</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;