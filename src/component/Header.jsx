import { useState } from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = new URL('../assets/logo.png', import.meta.url);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-white shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" width="120" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link to="/about"  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              About
            </Link>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Services
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Contact
            </a>
          </div>

      </div>
      </div>
    </nav>
  );
}