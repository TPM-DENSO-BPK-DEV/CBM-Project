"use client";

import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCaretDown, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none flex items-center" aria-label="Profile Options">
        <FaUserCircle className="text-white" size={24} />
        <FaCaretDown className="ml-2 text-white" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaUserCircle className="mr-2" /> Profile
          </Link>
          <button onClick={() => alert('Sign out')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
