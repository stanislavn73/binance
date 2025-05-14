import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// Placeholder data for crypto assets
const cryptoData = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: '0.0342',
    value: 1542.87,
    price: 45112.32,
    change24h: 2.34,
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: '0.8721',
    value: 1823.45,
    price: 2091.00,
    change24h: -1.24,
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    amount: '5.3210',
    value: 1294.61,
    price: 243.30,
    change24h: 0.87,
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    amount: '15.7632',
    value: 975.32,
    price: 61.87,
    change24h: 5.67,
  },
];

const CryptoAssets: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({
    key: 'value',
    direction: 'descending',
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const filteredData = cryptoData.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
        <h2 className="text-lg font-semibold text-white">My Assets</h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search assets..."
            className="bg-gray-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <SortableHeader 
                label="Asset" 
                sortKey="name"
                currentSort={sortConfig}
                onSort={requestSort}
              />
              <SortableHeader 
                label="Amount" 
                sortKey="amount"
                currentSort={sortConfig}
                onSort={requestSort}
              />
              <SortableHeader 
                label="Value (USD)" 
                sortKey="value"
                currentSort={sortConfig}
                onSort={requestSort}
                className="text-right"
              />
              <SortableHeader 
                label="Price" 
                sortKey="price"
                currentSort={sortConfig}
                onSort={requestSort}
                className="text-right"
              />
              <SortableHeader 
                label="24h Change" 
                sortKey="change24h"
                currentSort={sortConfig}
                onSort={requestSort}
                className="text-right"
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedData.length > 0 ? (
              sortedData.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                        <span className="font-bold text-xs">{asset.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{asset.name}</div>
                        <div className="text-xs text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-white">{asset.amount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-white">${asset.value.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="text-white">${asset.price.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className={`${
                      asset.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No assets found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: {
    key: string;
    direction: 'ascending' | 'descending';
  };
  onSort: (key: string) => void;
  className?: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  currentSort,
  onSort,
  className = '',
}) => {
  const isActive = currentSort.key === sortKey;
  
  return (
    <th 
      className={`px-4 py-3 text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <span className="inline-flex flex-col">
          {isActive && currentSort.direction === 'ascending' ? (
            <ChevronUp size={14} className="text-yellow-500" />
          ) : isActive && currentSort.direction === 'descending' ? (
            <ChevronDown size={14} className="text-yellow-500" />
          ) : (
            <ChevronDown size={14} className="text-gray-600" />
          )}
        </span>
      </div>
    </th>
  );
};

export default CryptoAssets;