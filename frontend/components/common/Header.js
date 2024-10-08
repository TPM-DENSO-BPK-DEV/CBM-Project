"use client";
import Link from 'next/link';
import { FaBars, FaExpand, FaCompress, FaBell } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ThemeDropdown from '../ui/ThemeDropdown';
import ProfileDropdown from '../ui/ProfileDropdown';
import { useSidebar } from '../layout/SidebarContext';
import NoSSR from './NoSSR';

const Header = ({ is404 = false }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { toggleSidebar } = useSidebar();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const generateBreadcrumbs = () => {
      if (is404) {
        return [{ href: '/', label: 'HOME' }, { href: pathname, label: 'PAGE NOT FOUND' }];
      }

      const pathArray = pathname.split('/').filter((path) => path);
      const breadcrumbPaths = pathArray.map((path, index) => {
        const section = searchParams.get('section');
        const mc = searchParams.get('mc');
        const isLast = index === pathArray.length - 1;

        return {
          href: !isLast ? '/' + pathArray.slice(0, index + 1).join('/') : null,
          label: isLast && section && mc ? `${path.charAt(0).toUpperCase() + path.slice(1)} ${section} ${mc}` : path.charAt(0).toUpperCase() + path.slice(1),
          isLast,
        };
      });

      return [{ href: '/', label: 'Home' }, ...breadcrumbPaths];
    };

    setBreadcrumbs(generateBreadcrumbs());
  }, [pathname, searchParams, is404]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const toggleNotification = useCallback(() => {
    setIsNotificationOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-gray-800 text-white fixed w-full h-auto z-40 top-0 shadow-md">
        <div className="flex justify-between items-center py-2 px-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSidebar} 
              className="focus:outline-none p-1 text-xl transition-colors duration-200 hover:bg-gray-700 rounded"
              aria-label="Toggle Sidebar"
            >
              <FaBars />
            </button>
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, index) => (
                <span key={breadcrumb.href || breadcrumb.label} className={`flex items-center text-sm ${breadcrumb.isLast ? 'font-semibold text-lg text-gray-300' : ''}`}>
                  {breadcrumb.href ? (
                    <Link href={breadcrumb.href} className="hover:underline text-gray-300 hover:text-white transition-colors">
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span className="cursor-default">{breadcrumb.label}</span> // Non-clickable and non-hoverable last breadcrumb
                  )}
                  {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-500">/</span>}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/analytics" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors">
              Analytics
            </Link>
            <button onClick={toggleFullscreen} className="focus:outline-none p-1 text-xl transition-colors duration-200 hover:bg-gray-700 rounded" aria-label="Toggle Fullscreen">
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <div className="relative" ref={notificationRef}>
              <button onClick={toggleNotification} className="focus:outline-none p-1 text-xl transition-colors duration-200 hover:bg-gray-700 rounded" aria-label="Notifications">
                <FaBell />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-1 w-60 bg-white rounded-md shadow-lg z-20">
                  <div className="p-2 text-sm text-gray-700 border-b">Notifications</div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-2 text-sm text-gray-700 hover:bg-gray-100">Sample Notification 1</div>
                    <div className="p-2 text-sm text-gray-700 hover:bg-gray-100">Sample Notification 2</div>
                    <div className="p-2 text-sm text-gray-700 hover:bg-gray-100">Sample Notification 3</div>
                  </div>
                </div>
              )}
            </div>
            <ThemeDropdown />
            <ProfileDropdown />
          </div>
        </div>
        <NoSSR />
      </header>
      <div className="h-11"></div>
    </>
  );
};

export default Header;
