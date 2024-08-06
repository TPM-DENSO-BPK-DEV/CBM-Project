"use client"; // Add this directive at the top

import { useState } from 'react';
import Link from 'next/link';
import SidebarIcon from './SidebarIcon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white flex flex-col transition-width duration-300`}>
      <div className="p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">
          {isCollapsed ? 'My' : 'MyApp'}
        </span>
        <SidebarIcon toggle={toggleSidebar} />
      </div>
      <nav className="flex-1 px-2">
        <ul>
          <li className="my-2">
            <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">
              Home
            </Link>
          </li>
          <li className="my-2">
            <Link href="/about" className="block py-2 px-4 rounded hover:bg-gray-700">
              About
            </Link>
          </li>
          <li className="my-2">
            <Link href="/contact" className="block py-2 px-4 rounded hover:bg-gray-700">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
