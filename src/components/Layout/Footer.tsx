import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; 2025 Binance Clone. For educational purposes only.</p>
          </div>
          <div className="flex space-x-6">
            <FooterLink label="Terms of Service" />
            <FooterLink label="Privacy Policy" />
            <FooterLink label="Cookie Preferences" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string }> = ({ label }) => {
  return (
    <a href="#" className="text-sm hover:text-white transition-colors duration-200">
      {label}
    </a>
  );
};

export default Footer;