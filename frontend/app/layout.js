import '../styles/globals.css';
import Header from '../components/common/Header';
import { SidebarProvider } from '../components/layout/SidebarContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Header />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
