import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, ChevronRight } from 'lucide-react';

const WalletOverview: React.FC = () => {
  const [balanceHidden, setBalanceHidden] = useState(false);
  
  const toggleBalance = () => {
    setBalanceHidden(!balanceHidden);
  };
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Wallet Overview</h2>
        <button 
          onClick={toggleBalance}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          {balanceHidden ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Estimated Balance</span>
          </div>
          <div className="text-xl font-bold">
            {balanceHidden ? '••••••' : '$8,245.32'}
          </div>
          <div className="text-green-400 text-sm flex items-center mt-1">
            <TrendingUp size={14} className="mr-1" />
            <span>{balanceHidden ? '••••' : '+2.3%'}</span>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Spot Balance</span>
          </div>
          <div className="text-xl font-bold">
            {balanceHidden ? '••••••' : '$5,821.74'}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {balanceHidden ? '••••••••••••' : '≈ 0.12942 BTC'}
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Earn Balance</span>
          </div>
          <div className="text-xl font-bold">
            {balanceHidden ? '••••••' : '$2,423.58'}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {balanceHidden ? '••••••••••••' : '≈ 0.05387 BTC'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ActionButton label="Deposit" bgColor="bg-yellow-500 hover:bg-yellow-600" textColor="text-black" />
        <ActionButton label="Withdraw" />
        <ActionButton label="Convert" />
        <ActionButton label="Buy Crypto" />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  bgColor?: string;
  textColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  label, 
  bgColor = "bg-gray-700 hover:bg-gray-600", 
  textColor = "text-white" 
}) => {
  return (
    <button className={`${bgColor} ${textColor} rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center`}>
      {label}
    </button>
  );
};

export default WalletOverview;