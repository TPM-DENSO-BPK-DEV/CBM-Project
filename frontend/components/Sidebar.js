"use client";

import Link from 'next/link';
import { FaHome, FaBell, FaFont, FaTable, FaQuestion, FaBook, FaLifeRing, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

const structure = [
  { id: 0, label: 'Dashboard', link: '/dashboard', icon: <FaHome /> },
  { id: 1, label: 'Typography', link: '/about', icon: <FaFont /> },
  { id: 2, label: 'Tables', link: '/tables', icon: <FaTable /> },
  { id: 3, label: 'Notifications', link: '/notifications', icon: <FaBell /> },
  { id: 4, label: 'UI Elements', link: '/ui', icon: <FaFont /> },
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  { id: 7, label: 'Library', link: '/library', icon: <FaBook /> },
  { id: 8, label: 'Support', link: '/support', icon: <FaLifeRing /> },
  { id: 9, label: 'FAQ', link: '/faq', icon: <FaQuestion /> },
  { id: 10, type: 'divider' },
  { id: 11, type: 'title', label: 'PROJECTS' },
  { id: 12, label: 'My recent', link: '/recent', icon: <FaHome /> },
  { id: 13, label: 'Starred', link: '/starred', icon: <FaHome /> },
  { id: 14, label: 'Background', link: '/background', icon: <FaHome /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

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
            return (
              <li key={item.id} className="flex items-center">
                <Link href={item.link} className={`flex items-center w-full py-2 px-4 rounded hover:bg-gray-700 ${pathname === item.link ? 'bg-gray-700' : ''}`} onClick={toggleSidebar}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="ml-2">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
