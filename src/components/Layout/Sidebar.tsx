import React, { useState } from 'react';
import { 
  Home, User, Shield, Wallet, CreditCard, 
  DollarSign, Gift, History, Settings, ChevronDown, ChevronRight 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>('dashboard');

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <aside className={`fixed md:relative inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 md:w-56 lg:w-64 bg-gray-800 pt-16 overflow-y-auto z-10`}>
      <div className="px-4 py-6">
        <div className="mb-6">
          <div className="bg-gray-700 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">Total Balance</h3>
              <button className="text-xs text-gray-400 hover:text-white">Hide</button>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-xl font-bold">$0.00</span>
              <span className="text-xs text-gray-400 ml-2">≈ 0.000000 BTC</span>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded transition-colors duration-300 mt-2">
              Deposit
            </button>
          </div>
        </div>

        <nav className="space-y-1">
          <SidebarItem 
            icon={<Home size={18} />} 
            label="Dashboard" 
            isActive={expandedItem === 'dashboard'}
            onClick={() => toggleExpand('dashboard')}
            isExpandable
          >
            <SidebarSubItem label="Overview" isActive />
            <SidebarSubItem label="Assets" />
            <SidebarSubItem label="Activity" />
          </SidebarItem>
          
          <SidebarItem 
            icon={<Wallet size={18} />} 
            label="Wallet" 
            isActive={expandedItem === 'wallet'}
            onClick={() => toggleExpand('wallet')}
            isExpandable
          >
            <SidebarSubItem label="Spot" />
            <SidebarSubItem label="Funding" />
            <SidebarSubItem label="Margin" />
            <SidebarSubItem label="Futures" />
          </SidebarItem>
          
          <SidebarItem 
            icon={<CreditCard size={18} />} 
            label="Buy Crypto" 
          />
          
          <SidebarItem 
            icon={<DollarSign size={18} />} 
            label="Trading" 
            isActive={expandedItem === 'trading'}
            onClick={() => toggleExpand('trading')}
            isExpandable
          >
            <SidebarSubItem label="Convert" />
            <SidebarSubItem label="Spot" />
            <SidebarSubItem label="Margin" />
          </SidebarItem>
          
          <SidebarItem 
            icon={<Gift size={18} />} 
            label="Earn" 
          />
          
          <SidebarItem 
            icon={<History size={18} />} 
            label="Orders & History" 
          />
          
          <SidebarItem 
            icon={<Shield size={18} />} 
            label="Security" 
          />
          
          <SidebarItem 
            icon={<User size={18} />} 
            label="Identification" 
          />
          
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
          />
        </nav>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isExpandable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  isActive = false,
  isExpandable = false,
  onClick,
  children
}) => {
  return (
    <div>
      <button
        className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive 
            ? 'bg-gray-700 text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1 text-left">{label}</span>
        {isExpandable && (
          isActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
      </button>
      
      {isActive && isExpandable && (
        <div className="ml-9 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

interface SidebarSubItemProps {
  label: string;
  isActive?: boolean;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({ 
  label, 
  isActive = false 
}) => {
  return (
    <a
      href="#"
      className={`block px-3 py-1.5 text-sm rounded-lg ${
        isActive 
          ? 'text-yellow-400' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </a>
  );
};

export default Sidebar;