import React from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const SecurityStatus: React.FC = () => {
  // Placeholder security state
  const securityState = {
    email: true,
    phone: true,
    authenticator: true,
    antiPhishing: false,
    withdrawalWhitelist: false,
  };
  
  // Calculate security score based on enabled security features
  const enabledFeatures = Object.values(securityState).filter(Boolean).length;
  const totalFeatures = Object.values(securityState).length;
  const securityScore = Math.round((enabledFeatures / totalFeatures) * 100);
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center mb-4">
        <Shield className="text-yellow-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-white">Security Status</h2>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Security Score</span>
          <span className="text-sm font-medium text-white">{securityScore}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              securityScore >= 80 
                ? 'bg-green-500' 
                : securityScore >= 50 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            }`}
            style={{ width: `${securityScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <SecurityItem 
          label="Email Verification" 
          isEnabled={securityState.email} 
        />
        <SecurityItem 
          label="Phone Verification" 
          isEnabled={securityState.phone} 
        />
        <SecurityItem 
          label="2FA Authentication" 
          isEnabled={securityState.authenticator} 
        />
        <SecurityItem 
          label="Anti-Phishing Code" 
          isEnabled={securityState.antiPhishing} 
        />
        <SecurityItem 
          label="Withdrawal Whitelist" 
          isEnabled={securityState.withdrawalWhitelist} 
        />
      </div>
      
      <div className="mt-4">
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
          Security Center
        </button>
      </div>
    </div>
  );
};

interface SecurityItemProps {
  label: string;
  isEnabled: boolean;
}

const SecurityItem: React.FC<SecurityItemProps> = ({ 
  label, 
  isEnabled 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {isEnabled ? (
          <CheckCircle size={16} className="text-green-500 mr-2" />
        ) : (
          <XCircle size={16} className="text-gray-500 mr-2" />
        )}
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      {!isEnabled && (
        <button className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors duration-200">
          Enable
        </button>
      )}
    </div>
  );
};

export default SecurityStatus;