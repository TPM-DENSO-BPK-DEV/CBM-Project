"use client";
import { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaCaretDown } from 'react-icons/fa';

const ThemeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none flex items-center" aria-label="Theme Options">
        {theme === 'light' ? <FaSun className="text-white" size={24} /> : <FaMoon className="text-white" size={24} />}
        <FaCaretDown className="ml-2 text-white" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
          <button onClick={() => changeTheme('light')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <FaSun className="mr-2" /> Light Mode
          </button>
          <button onClick={() => changeTheme('dark')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <FaMoon className="mr-2" /> Dark Mode
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
