"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-indigo-600 dark:text-indigo-400">
            Quick<span className="font-bold">URL</span>
          </span>
        </Link>

        <div className="flex items-center md:order-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button className="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                Dashboard
              </button>
              <div className="relative">
                <button 
                  className="flex text-sm bg-indigo-100 rounded-full focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    U
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                href="/login" 
                className="text-gray-800 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 font-medium mr-1"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
              >
                Sign up
              </Link>
            </div>
          )}
          
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path 
                fillRule="evenodd" 
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <div 
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} 
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link 
                href="/" 
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/features" 
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/api-docs" 
                className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                API
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
