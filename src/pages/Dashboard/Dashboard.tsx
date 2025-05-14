import React from 'react';
import WalletOverview from './WalletOverview';
import CryptoAssets from './CryptoAssets';
import RecentActivity from './RecentActivity';
import MarketTrends from './MarketTrends';
import SecurityStatus from './SecurityStatus';

const Dashboard: React.FC = () => {
  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, John Doe!</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WalletOverview />
          <CryptoAssets />
          <RecentActivity />
        </div>
        
        <div className="space-y-6">
          <SecurityStatus />
          <MarketTrends />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;