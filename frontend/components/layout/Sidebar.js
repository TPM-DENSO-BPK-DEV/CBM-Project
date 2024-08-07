"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaChartBar, FaBell, FaFont, FaTable, FaQuestion, FaBook, FaLifeRing, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

const structure = [
  {
    id: 0,
    label: 'Dashboard',
    link: '/dashboard',
    icon: <FaHome />,
    subItems: [
      { id: 'analytics', label: 'Analytics', link: '/dashboard/analytics', icon: <FaChartBar /> }
    ]
  },
  { id: 2, label: 'Typography', link: '/about', icon: <FaFont /> },
  { id: 3, label: 'Tables', link: '/tables', icon: <FaTable /> },
  { id: 4, label: 'Notifications', link: '/notifications', icon: <FaBell /> },
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  { id: 7, label: 'Library', link: '/library', icon: <FaBook /> },
  { id: 8, label: 'Support', link: '/support', icon: <FaLifeRing /> },
  { id: 9, label: 'FAQ', link: '/faq', icon: <FaQuestion /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item) => {
    const isActive = pathname === item.link || (item.subItems && item.subItems.some(subItem => pathname === subItem.link));
    const isExpanded = expandedItems.includes(item.id);

    return (
      <li key={item.id} className="flex flex-col">
        <div className={`flex items-center w-full py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
          <Link href={item.link} className="flex-grow flex items-center" onClick={item.subItems ? undefined : toggleSidebar}>
            <span className="text-xl">{item.icon}</span>
            <span className="ml-2">{item.label}</span>
          </Link>
          {item.subItems && (
            <button onClick={() => toggleExpand(item.id)} className="focus:outline-none">
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          )}
        </div>
        {item.subItems && isExpanded && (
          <ul className="ml-4 mt-2 space-y-2">
            {item.subItems.map(subItem => (
              <li key={subItem.id}>
                <Link 
                  href={subItem.link} 
                  className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${pathname === subItem.link ? 'bg-gray-700' : ''}`}
                  onClick={toggleSidebar}
                >
                  <span className="text-sm">{subItem.icon}</span>
                  <span className="ml-2">{subItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">MyApp</span>
        <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
          <FaTimes />
        </button>
      </div>
      <nav className="flex-1 px-2 overflow-y-auto">
        <ul className="space-y-2">
          {structure.map((item) => {
            if (item.type === 'divider') {
              return <hr key={item.id} className="my-4 border-gray-600" />;
            }
            if (item.type === 'title') {
              return (
                <h2 key={item.id} className="text-sm font-semibold text-gray-400 mb-2 px-4">
                  {item.label}
                </h2>
              );
            }
            return renderMenuItem(item);
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;