import { useState } from 'react';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = new URL('../assets/Logo.png', import.meta.url);
  
  const status = useOnlineStatus()

  return (
    <nav className="bg-white shadow-[0_6px_12px_rgba(0,0,0,0.35)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center">
            <div className='flex items-center gap-0.5'>
              <img src={logo} alt="Logo" className={status ? "h-23 w-auto object-contain" : "h-23 w-auto object-contain grayscale"} />
              <span className={status ? 'h-4 w-4 rounded-full bg-yellow-400': 'h-4 w-4 rounded-full bg-gray-500'}></span>
              <span className='font-bold'>{status ? 'online' : 'offline'}</span>
            </div>
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