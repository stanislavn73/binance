import React from 'react';
import { ArrowDownRight, ArrowUpRight, RefreshCw, CreditCard } from 'lucide-react';

// Placeholder data for recent activity
const activityData = [
  {
    id: '1',
    type: 'deposit',
    asset: 'BTC',
    amount: '0.0125',
    value: 564.23,
    status: 'completed',
    date: '2025-02-10T14:32:23Z',
  },
  {
    id: '2',
    type: 'withdrawal',
    asset: 'ETH',
    amount: '0.4235',
    value: 886.14,
    status: 'completed',
    date: '2025-02-08T09:15:46Z',
  },
  {
    id: '3',
    type: 'convert',
    assetFrom: 'USDT',
    assetTo: 'BNB',
    amountFrom: '500',
    amountTo: '2.056',
    value: 500,
    status: 'completed',
    date: '2025-02-05T18:43:12Z',
  },
  {
    id: '4',
    type: 'buy',
    asset: 'SOL',
    amount: '5.234',
    value: 323.97,
    status: 'completed',
    date: '2025-02-01T11:22:33Z',
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <button className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody className="divide-y divide-gray-700">
            {activityData.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-700">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-start">
                    <ActivityIcon type={activity.type} />
                    <div className="ml-3">
                      <div className="font-medium text-white">
                        {getActivityTitle(activity)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(activity.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="text-white font-medium">
                    {getActivityAmount(activity)}
                  </div>
                  <div className="text-xs text-gray-400">
                    ${activity.value.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'completed' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface ActivityIconProps {
  type: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ type }) => {
  const iconSize = 18;
  
  switch (type) {
    case 'deposit':
      return (
        <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center">
          <ArrowDownRight size={iconSize} className="text-green-400" />
        </div>
      );
    case 'withdrawal':
      return (
        <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center">
          <ArrowUpRight size={iconSize} className="text-red-400" />
        </div>
      );
    case 'convert':
      return (
        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
          <RefreshCw size={iconSize} className="text-blue-400" />
        </div>
      );
    case 'buy':
      return (
        <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center">
          <CreditCard size={iconSize} className="text-purple-400" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <CreditCard size={iconSize} className="text-gray-400" />
        </div>
      );
  }
};

// Helper functions
const getActivityTitle = (activity: typeof activityData[0]) => {
  switch (activity.type) {
    case 'deposit':
      return `Deposit ${activity.asset}`;
    case 'withdrawal':
      return `Withdraw ${activity.asset}`;
    case 'convert':
      return `Convert ${activity.assetFrom} to ${activity.assetTo}`;
    case 'buy':
      return `Buy ${activity.asset}`;
    default:
      return 'Transaction';
  }
};

const getActivityAmount = (activity: typeof activityData[0]) => {
  switch (activity.type) {
    case 'deposit':
    case 'withdrawal':
    case 'buy':
      return `${activity.amount} ${activity.asset}`;
    case 'convert':
      return `${activity.amountFrom} ${activity.assetFrom} → ${activity.amountTo} ${activity.assetTo}`;
    default:
      return '';
  }
};

export default RecentActivity;