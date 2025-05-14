import React, { useState, useEffect } from 'react';
import { 
  Bell, Menu, X, ChevronDown, Search, 
  Globe, Moon, User, LogOut 
} from 'lucide-react';
import BinanceLogo from '../UI/BinanceLogo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-md' : 'bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <BinanceLogo className="h-8 w-auto mr-8" />
            
            <nav className="hidden md:flex space-x-1">
              <NavItem label="Buy Crypto" />
              <NavItem label="Markets" />
              <NavItem label="Trade" isDropdown />
              <NavItem label="Derivatives" isDropdown />
              <NavItem label="Earn" isDropdown />
              <NavItem label="Finance" isDropdown />
              <NavItem label="NFT" />
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-400 hover:text-white">
              <Search size={20} />
            </button>
            <button className="hidden md:flex items-center text-gray-400 hover:text-white">
              <Globe size={20} />
            </button>
            <button className="hidden md:flex items-center text-gray-400 hover:text-white">
              <Moon size={20} />
            </button>
            <button className="text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-2 h-2"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-sm font-medium text-white hover:text-yellow-400"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-1">
                  <User size={16} />
                </div>
                <span className="hidden md:inline-block">johndoe@example.com</span>
                <ChevronDown size={16} className="ml-1 hidden md:block" />
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-gray-300">Signed in as</p>
                    <p className="text-sm font-medium">johndoe@example.com</p>
                  </div>
                  <ProfileMenuItem label="Dashboard" />
                  <ProfileMenuItem label="Security" />
                  <ProfileMenuItem label="Identification" />
                  <ProfileMenuItem label="Payment" />
                  <ProfileMenuItem label="Settings" />
                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <button className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left">
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavItem label="Buy Crypto" />
            <MobileNavItem label="Markets" />
            <MobileNavItem label="Trade" />
            <MobileNavItem label="Derivatives" />
            <MobileNavItem label="Earn" />
            <MobileNavItem label="Finance" />
            <MobileNavItem label="NFT" />
          </div>
        </div>
      )}
    </header>
  );
};

const NavItem: React.FC<{ label: string; isDropdown?: boolean }> = ({ 
  label, 
  isDropdown = false 
}) => {
  return (
    <button className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center">
      {label}
      {isDropdown && <ChevronDown size={16} className="ml-1" />}
    </button>
  );
};

const MobileNavItem: React.FC<{ label: string }> = ({ label }) => {
  return (
    <a href="#" className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md">
      {label}
    </a>
  );
};

const ProfileMenuItem: React.FC<{ label: string }> = ({ label }) => {
  return (
    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
      {label}
    </a>
  );
};

export default Header;