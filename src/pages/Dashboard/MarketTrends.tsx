import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Placeholder data for market trends
const marketData = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 45112.32,
    change24h: 2.34,
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2091.00,
    change24h: -1.24,
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 243.30,
    change24h: 0.87,
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 61.87,
    change24h: 5.67,
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.42,
    change24h: -2.13,
  },
];

const MarketTrends: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const filteredData = selectedTab === 'gainers'
    ? marketData.filter(coin => coin.change24h > 0)
    : selectedTab === 'losers'
    ? marketData.filter(coin => coin.change24h < 0)
    : marketData;
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Market Trends</h2>
        <button className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
          More
        </button>
      </div>
      
      <div className="flex border-b border-gray-700 mb-4">
        <TabButton 
          label="All" 
          isActive={selectedTab === 'all'} 
          onClick={() => setSelectedTab('all')} 
        />
        <TabButton 
          label="Gainers" 
          isActive={selectedTab === 'gainers'} 
          onClick={() => setSelectedTab('gainers')} 
        />
        <TabButton 
          label="Losers" 
          isActive={selectedTab === 'losers'} 
          onClick={() => setSelectedTab('losers')} 
        />
      </div>
      
      <div className="space-y-4">
        {filteredData.map((coin) => (
          <div key={coin.id} className="flex justify-between items-center hover:bg-gray-700 p-3 rounded-lg transition-colors duration-150">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                <span className="font-bold text-xs">{coin.symbol.charAt(0)}</span>
              </div>
              <div>
                <div className="font-medium text-white">{coin.name}</div>
                <div className="text-xs text-gray-400">{coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">${coin.price.toLocaleString()}</div>
              <div className={`flex items-center text-sm ${
                coin.change24h > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {coin.change24h > 0 ? (
                  <TrendingUp size={14} className="mr-1" />
                ) : (
                  <TrendingDown size={14} className="mr-1" />
                )}
                {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 focus:outline-none ${
        isActive 
          ? 'border-yellow-500 text-white' 
          : 'border-transparent text-gray-400 hover:text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MarketTrends;