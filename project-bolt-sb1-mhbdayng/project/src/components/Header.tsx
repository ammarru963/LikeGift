import React, { useState } from 'react';
import { Gift, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white py-3 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Gift className="text-orange-500 w-6 h-6 mr-2" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Like Card
          </h1>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-700 hover:text-orange-500"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Cards</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">About</a></li>
            <li><a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <ul className="space-y-3">
              <li><a href="#" className="block text-gray-700 hover:text-orange-500 transition-colors py-1">Home</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-orange-500 transition-colors py-1">Cards</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-orange-500 transition-colors py-1">About</a></li>
              <li><a href="#" className="block text-gray-700 hover:text-orange-500 transition-colors py-1">Contact</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;