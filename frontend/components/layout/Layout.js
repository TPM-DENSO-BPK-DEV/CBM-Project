import Header from '../common/Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-3 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;