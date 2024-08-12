// components/layout/Layout.js
"use client";
import Header from '../common/Header';
import Sidebar from './Sidebar';
import { useSidebar } from './SidebarContext';

export default function Layout({ children }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div>
      <Header />
      <div className="flex flex-1 overflow-auto">
        <Sidebar />
        <main className="flex-1 overflow-auto p-2 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}