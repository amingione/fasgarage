import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import sanity from '../lib/sanityClient'; // stays for future use (email filtering)
import Button from './Button.jsx';
import GaugeLoader from './GaugeLoader.jsx';

export default function Garage() {
  const [showLoader, setShowLoader] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);

    setTimeout(() => {
      console.log('Login submitted with email:', email);
      navigate('/garage'); // Will be used later to filter builds by this email
    }, 1000);
  };

  return (
    <>
      {showLoader && <GaugeLoader />}
      <main className="bg-black text-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6 text-center bg-black/80 border border-accent/40 p-8 rounded-xl shadow-2xl backdrop-blur-md animate-fade-in">
          <h1 className="text-4xl font-bold font-borg tracking-wide text-accent drop-shadow-md">
            Welcome to Your Garage
          </h1>
          <p className="text-lg text-gray-400 font-cyber">
            Access your saved builds and custom quotes
          </p>

          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded bg-white/5 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent font-cyber transition-all duration-150"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" text="Access My Garage" variant="multi-swipe-v2" />
          </form>
        </div>
      </main>
    </>
  );
}