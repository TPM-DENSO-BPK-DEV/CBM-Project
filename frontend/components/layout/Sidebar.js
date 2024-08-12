"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaChartBar,
  FaFont,
  FaTable,
  FaBell,
  FaBook,
  FaLifeRing,
  FaQuestion,
  FaTimes,
  FaChevronRight,
  FaChevronLeft,
  FaHome,
} from 'react-icons/fa';
import { useSidebar } from './SidebarContext';

const menuItems = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  {
    name: 'Dashboard',
    icon: <FaTachometerAlt />,
    path: '/dashboard',
    subItems: [
      {
        name: 'Alternator',
        path: '/dashboard/alternator',
        subItems: [
          { name: 'Option 1', path: '/dashboard/alternator/option2' },
          { name: 'Option 2', path: '/dashboard/alternator/option2' },
        ],
      },
      {
        name: 'Starter',
        path: '/dashboard/starter',
        subItems: [
          { name: 'Option 1', path: '/dashboard/starter/option1' },
          { name: 'Option 2', path: '/dashboard/starter/option2' },
        ],
      },
      {
        name: 'Airbag',
        path: '/dashboard/airbag',
        subItems: [
          { name: 'Option 1', path: '/dashboard/airbag/option1' },
          { name: 'Option 2', path: '/dashboard/airbag/option2' },
        ],
      },
      {
        name: 'Parts 1',
        path: '/dashboard/parts1',
        subItems: [
          { name: 'Option 1', path: '/dashboard/parts1/option1' },
          { name: 'Option 2', path: '/dashboard/parts1/option2' },
        ],
      },
      {
        name: 'Parts 2',
        path: '/dashboard/parts2',
        subItems: [
          { name: 'Option 1', path: '/dashboard/parts2/option1' },
          { name: 'Option 2', path: '/dashboard/parts2/option2' },
        ],
      },
    ],
  },
  { name: 'Analytics', icon: <FaChartBar />, path: '/analytics' },
  { name: 'Typography', icon: <FaFont />, path: '/typography' },
  { name: 'Tables', icon: <FaTable />, path: '/tables' },
  { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
  { type: 'divider' },
  { type: 'title', name: 'HELP' },
  { name: 'Library', icon: <FaBook />, path: '/library' },
  { name: 'Support', icon: <FaLifeRing />, path: '/support' },
  { name: 'FAQ', icon: <FaQuestion />, path: '/faq' },
];

const MenuItem = ({ item, depth = 0, onClick, closeSidebar }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  const handleClick = (e) => {
    if (item.subItems && onClick) {
      e.preventDefault();
      onClick(item.subItems);
    } else {
      closeSidebar();
    }
  };

  return (
    <li className="relative">
      <Link 
        href={item.path}
        className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200`}
        style={{ paddingLeft: `${depth + 1}rem` }}
        onClick={handleClick}
      >
        {item.icon && <span className="text-xl mr-2">{item.icon}</span>}
        <span className={depth > 0 ? 'text-sm' : ''}>{item.name}</span>
        {item.subItems && (
          <span className="ml-auto">
            <FaChevronRight />
          </span>
        )}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [activeSubItems, setActiveSubItems] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // Close sidebar when pathname changes
    closeSidebar();
    setActiveSubItems(null);
  }, [pathname, closeSidebar]);

  const handleItemClick = (subItems) => {
    setActiveSubItems(subItems);
  };

  const handleBackClick = () => {
    setActiveSubItems(null);
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyApp</h1>
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex-1 px-2 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <ul className="space-y-2">
            {activeSubItems ? (
              <>
                <li>
                  <button
                    onClick={handleBackClick}
                    className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
                  >
                    <FaChevronLeft className="mr-2" />
                    Back
                  </button>
                </li>
                {activeSubItems.map((subItem) => (
                  <MenuItem 
                    key={subItem.path} 
                    item={subItem} 
                    depth={1} 
                    onClick={handleItemClick} 
                    closeSidebar={closeSidebar} 
                  />
                ))}
              </>
            ) : (
              menuItems.map((item, index) => {
                if (item.type === 'divider') {
                  return <hr key={index} className="my-4 border-gray-600" />;
                }
                if (item.type === 'title') {
                  return (
                    <h2
                      key={index}
                      className="text-sm font-semibold text-gray-400 mb-2 px-4"
                    >
                      {item.name}
                    </h2>
                  );
                }
                return (
                  <MenuItem 
                    key={item.path} 
                    item={item} 
                    onClick={handleItemClick} 
                    closeSidebar={closeSidebar} 
                  />
                );
              })
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
