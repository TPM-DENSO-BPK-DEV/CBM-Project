"use client";

import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="relative h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-auto pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
