"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
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

// Sections and mock machine numbers data structure
const sections = {
  'Alternator': [
    { section: 414463, mcNos: ['6ACU0001', '6ACU0002', '6ACU0003'] },
    { section: 414461, mcNos: ['6ACU0004', '6ACU0005', '6ACU0006'] },
    { section: 414464, mcNos: ['6ACU0007', '6ACU0008', '6ACU0009'] },
  ],
  'Starter': [
    { section: 414280, mcNos: ['6ABM0001', '6ABM0002', '6ABM0003'] },
    { section: 414281, mcNos: ['6ABM0004', '6ABM0005', '6ABM0006'] },
  ],
  'Airbag': [
    { section: 414441, mcNos: ['6ACU0010', '6ACU0011', '6ACU0012'] },
    { section: 414245, mcNos: ['6ACU-0013', '6ACU0014', '6ACU0015'] },
  ],
  'Parts_1': [
    { section: 414111, mcNos: ['6ABM0010', '6ABM0011', '6ABM0012'] },
  ],
  'Parts_2': [
    { section: 414153, mcNos: ['6ABM0013', '6ABM0014', '6ABM0015'] },
  ],
};

// Helper function to generate submenu items based on department
const generateSubItems = (dept) => [
  { type: 'label', name: 'Section' },
  ...sections[dept].map(({ section, mcNos }) => ({
    name: section.toString(),
    subItems: [
      { type: 'label', name: 'MC_NO.' },
      ...mcNos.map(mc_no => ({
        name: mc_no,
        path: `/dashboard/${dept.toLowerCase()}?section=${section}&mc=${mc_no}`,
      })),
    ],
  })),
];

// Menu items configuration
const menuItems = [
  { name: 'Home', icon: FaHome, path: '/' },
  {
    name: 'Dashboard',
    icon: FaTachometerAlt,
    path: '/dashboard',
    subItems: [
      { type: 'label', name: 'DEPARTMENT' },
      { name: 'Alternator', path: '/dashboard/alternator', subItems: generateSubItems('Alternator') },
      { name: 'Starter', path: '/dashboard/starter', subItems: generateSubItems('Starter') },
      { name: 'Airbag', path: '/dashboard/airbag', subItems: generateSubItems('Airbag') },
      { name: 'Parts 1', path: '/dashboard/parts1', subItems: generateSubItems('Parts_1') },
      { name: 'Parts 2', path: '/dashboard/parts2', subItems: generateSubItems('Parts_2') },
    ],
  },
  { name: 'Analytics', icon: FaChartBar, path: '/analytics' },
  { name: 'Typography', icon: FaFont, path: '/typography' },
  { name: 'Tables', icon: FaTable, path: '/tables' },
  { name: 'Notifications', icon: FaBell, path: '/notifications' },
  { type: 'divider' },
  { type: 'title', name: 'HELP' },
  { name: 'Library', icon: FaBook, path: '/library' },
  { name: 'Support', icon: FaLifeRing, path: '/support' },
  { name: 'FAQ', icon: FaQuestion, path: '/faq' },
];

// MenuItem component to render individual menu items
const MenuItem = React.memo(({ item, depth = 0, onClick, closeSidebar }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path || (item.subItems && pathname.startsWith(item.path));
  const isHelpSection = item.type === 'title' && item.name === 'HELP';

  const handleClick = useCallback((e) => {
    if (item.subItems && onClick) {
      e.preventDefault();
      onClick(item);
    } else if (item.path) {
      closeSidebar();
    }
  }, [item, onClick, closeSidebar]);

  if (item.type === 'divider') {
    return <li className="my-2 border-t border-gray-700" aria-hidden="true" />;
  }

  if (item.type === 'label' || isHelpSection) {
    return (
      <li className={`px-4 py-2 text-xs font-semibold ${isHelpSection ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
        {item.name}
      </li>
    );
  }

  const content = (
    <>
      {item.icon && (
        <IconContext.Provider value={{ className: `text-lg mr-3 ${isActive ? 'text-blue-400' : 'text-gray-400'}` }}>
          <item.icon />
        </IconContext.Provider>
      )}
      <span className={`${depth > 0 ? 'text-sm' : 'text-base'} ${isActive ? 'font-semibold' : ''} truncate`}>{item.name}</span>
    </>
  );

  const baseClassName = `
    flex items-center py-2 px-4 
    transition-all duration-200 ease-in-out
    ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300'} 
    hover:bg-gray-700 hover:text-white 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    relative overflow-hidden
    group
  `;
  
  const hoverEffect = `
    before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0
    before:w-1 before:bg-blue-500 before:transform before:scale-y-0
    before:transition-transform before:duration-200 before:ease-out
    hover:before:scale-y-100
  `;

  const className = `${baseClassName} ${hoverEffect} w-full`;
  const style = { paddingLeft: `${(depth * 0.5) + 1}rem` };

  return (
    <li className="relative">
      {item.path ? (
        <Link href={item.path} className={className} style={style} onClick={handleClick}>
          <div className="flex items-center w-full">
            {content}
            {item.subItems && (
              <span className="ml-auto pl-2 transition-transform duration-200 group-hover:translate-x-1">
                <FaChevronRight className="text-gray-400 group-hover:text-white" />
              </span>
            )}
          </div>
        </Link>
      ) : (
        <button className={className} style={style} onClick={handleClick}>
          <div className="flex items-center w-full">
            {content}
            {item.subItems && (
              <span className="ml-auto pl-2 transition-transform duration-200 group-hover:translate-x-1">
                <FaChevronRight className="text-gray-400 group-hover:text-white" />
              </span>
            )}
          </div>
        </button>
      )}
    </li>
  );
});

MenuItem.displayName = 'MenuItem';

// Sidebar component
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [activeItems, setActiveItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    closeSidebar();
    setActiveItems([]);
  }, [pathname, closeSidebar]);

  const handleItemClick = useCallback((item) => {
    setActiveItems((prevItems) => [...prevItems, item]);
  }, []);

  const handleBackClick = useCallback(() => {
    setActiveItems((prevItems) => prevItems.slice(0, -1));
  }, []);

  const currentItems = useMemo(() => 
    activeItems.length ? activeItems[activeItems.length - 1].subItems : menuItems,
    [activeItems]
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-50 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">CBM Project</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white text-2xl focus:outline-none transition-colors duration-200"
          aria-label="Toggle Sidebar"
        >
          <FaTimes />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <ul className="space-y-1">
          {activeItems.length > 0 && (
            <li>
              <button
                onClick={handleBackClick}
                className="flex items-center py-2 px-4 w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
              >
                <FaChevronLeft className="mr-2" />
                Back
              </button>
            </li>
          )}
          {currentItems.map((item, index) => (
            <MenuItem
              key={item.path || item.name || `${item.type}-${index}`}
              item={item}
              depth={activeItems.length}
              onClick={handleItemClick}
              closeSidebar={closeSidebar}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;