import React from 'react';

interface BinanceLogoProps {
  className?: string;
}

const BinanceLogo: React.FC<BinanceLogoProps> = ({ className = 'h-6 w-auto' }) => {
  // Using a text-based logo for simplicity
  return (
    <div className={`${className} flex items-center`}>
      <div className="bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded">
        <span className="text-lg">B</span>
      </div>
      <span className="ml-2 text-white font-bold text-lg">BINANCE</span>
    </div>
  );
};

export default BinanceLogo;