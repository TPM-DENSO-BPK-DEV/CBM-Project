"use client";
import { FaBars, FaExpand, FaCompress, FaBell } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeDropdown from '../ui/ThemeDropdown';
import ProfileDropdown from '../ui/ProfileDropdown';
import { useSidebar } from '../layout/SidebarContext';

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { toggleSidebar } = useSidebar();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const pathArray = pathname.split('/').filter((path) => path);
    const breadcrumbPaths = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      return { href, label: path.charAt(0).toUpperCase() + path.slice(1) };
    });
    setBreadcrumbs([{ href: '/', label: 'Home' }, ...breadcrumbPaths]);
  }, [pathname]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) { // Firefox
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari and Opera
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) { // IE/Edge
        docEl.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4 fixed w-full z-10 top-0">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar} 
          className="focus:outline-none p-2 text-2xl"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="text-white" />
        </button>
        <nav className="flex items-center space-x-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.href} className="flex items-center">
              <Link href={breadcrumb.href} className="hover:underline">
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleFullscreen} className="focus:outline-none p-2 text-2xl" aria-label="Toggle Fullscreen">
          {isFullscreen ? <FaCompress className="text-white" /> : <FaExpand className="text-white" />}
        </button>
        <div className="relative" ref={notificationRef}>
          <button onClick={toggleNotification} className="focus:outline-none p-2 text-2xl" aria-label="Notifications">
            <FaBell className="text-white" />
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <div className="p-4 text-gray-700">Sample Notification 1</div>
              <div className="p-4 text-gray-700">Sample Notification 2</div>
              <div className="p-4 text-gray-700">Sample Notification 3</div>
            </div>
          )}
        </div>
        <ThemeDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
