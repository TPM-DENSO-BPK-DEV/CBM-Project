"use client";
import Link from 'next/link';
import { FaHome, FaBell, FaFont, FaTable, FaQuestion, FaBook, FaLifeRing, FaTimes, FaStar, FaClock, FaImage } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { useCallback } from 'react';

// Moved structure outside of component to prevent unnecessary re-creation
const structure = [
  { id: 'dashboard', label: 'Dashboard', link: '/dashboard', icon: FaHome },
  { id: 'typography', label: 'Typography', link: '/about', icon: FaFont },
  { id: 'tables', label: 'Tables', link: '/tables', icon: FaTable },
  { id: 'notifications', label: 'Notifications', link: '/notifications', icon: FaBell },
  { id: 'ui', label: 'UI Elements', link: '/ui', icon: FaFont },
  { id: 'divider1', type: 'divider' },
  { id: 'help', type: 'title', label: 'HELP' },
  { id: 'library', label: 'Library', link: '/library', icon: FaBook },
  { id: 'support', label: 'Support', link: '/support', icon: FaLifeRing },
  { id: 'faq', label: 'FAQ', link: '/faq', icon: FaQuestion },
  { id: 'divider2', type: 'divider' },
  { id: 'projects', type: 'title', label: 'PROJECTS' },
  { id: 'recent', label: 'My recent', link: '/recent', icon: FaClock },
  { id: 'starred', label: 'Starred', link: '/starred', icon: FaStar },
  { id: 'background', label: 'Background', link: '/background', icon: FaImage },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  // Memoize the renderSidebarItem function to prevent unnecessary re-renders
  const renderSidebarItem = useCallback((item) => {
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
    const Icon = item.icon;
    return (
      <li key={item.id}>
        <Link
          href={item.link}
          className={`flex items-center w-full py-2 px-4 rounded transition-colors duration-200 ${
            pathname === item.link ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={toggleSidebar}
        >
          <Icon className="text-xl" />
          <span className="ml-2">{item.label}</span>
        </Link>
      </li>
    );
  }, [pathname, toggleSidebar]);

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-gray-800 w-64 z-50 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="text-2xl font-bold text-white">MyApp</span>
        <button 
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md"
          aria-label="Close sidebar"
        >
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <nav className="mt-4 px-2 overflow-y-auto h-[calc(100vh-70px)]">
        <ul className="space-y-1">
          {structure.map(renderSidebarItem)}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;