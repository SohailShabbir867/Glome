import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// Customer storefront layout with classical GLOME header and footer
export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
