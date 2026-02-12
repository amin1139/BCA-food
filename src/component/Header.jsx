import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaSun, FaMoon } from "react-icons/fa";
import useOnlineStatus from '../utils/useOnlineStatus';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme);
  const logo = new URL('../assets/Logo.png', import.meta.url);
  const status = useOnlineStatus();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="bg-white shadow-[0_6px_12px_rgba(0,0,0,0.35)] transition-colors dark:bg-slate-800 dark:shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center">
            <div className='flex items-center gap-0.5'>
              <img src={logo} alt="Logo" className={status ? "h-23 w-auto object-contain" : "h-23 w-auto object-contain grayscale"} />
              <span className={status ? 'h-4 w-4 rounded-full animate-ping bg-yellow-400': 'h-4 w-4 rounded-full bg-gray-500'}></span>
              <span className='font-bold text-gray-700 dark:text-slate-100'>{status ? 'online' : 'offline'}</span>
            </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-slate-200 dark:hover:text-sky-400">
                Home
              </Link>
              <Link to="/about"  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-slate-200 dark:hover:text-sky-400">
                About
              </Link>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-slate-200 dark:hover:text-sky-400">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium dark:text-slate-200 dark:hover:text-sky-400">
                Contact
              </a>
            </div>
            
            <div className="flex items-center justify-center">
              <button
                onClick={toggleTheme}
                className="relative w-18 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300"
              >
                <div className="absolute left-1 dark:left-10.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center">
                  <FaSun className="text-yellow-500 dark:hidden text-sm" />
                  <FaMoon className="hidden dark:block text-gray-800 text-sm" />
                  
                </div>
                <div className='absolute left-8 dark:left-1.5'>
                <span className='text-gray-700 dark:text-slate-200' >{theme === 'light' ? 'Light' : 'Dark'}</span>
                </div>
              </button>
            </div>

          </div>

      </div>
      </div>
    </nav>
  );
}
