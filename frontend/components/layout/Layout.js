"use client";
import Sidebar from './Sidebar';
import Header from '../common/Header';

const Layout = ({ children }) => {
  return (
    <div className="relative h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 pt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
