import React from 'react';
import Button from './Button.jsx';

export default function QuoteSubmitted() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl animate-fade-in-up">
        {/* Title with Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl md:text-4xl font-bold font-borg text-accent">
            Quote Submitted
          </h1>
        </div>

        {/* Message */}
        <p className="text-lg text-gray-300 mb-8 font-cyber">
          Thanks for sending in your build. The FAS team will review your quote and get back to you shortly.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" text="🏠 Return Home" variant="outline" />
          <Button href="/shop" text="🛠️ Shop Now" variant="multi-swipe-v2" />
        </div>
      </div>
    </div>
  );
}