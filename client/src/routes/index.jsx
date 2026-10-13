import { createBrowserRouter } from 'react-router-dom';

import StoreLayout from '@/layouts/StoreLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import RoleRoute from '@/routes/RoleRoute';
import { ADMIN_ROLES, SALES_ROLES } from '@/constants/roles';

import LandingPage from '@/features/landing/pages/LandingPage';
import ShopPage from '@/features/shop/pages/ShopPage';
import ProductDetailPage from '@/features/products/pages/ProductDetailPage';
import CartPage from '@/features/cart/pages/CartPage';
import WishlistPage from '@/features/cart/pages/WishlistPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import SalesDashboardPage from '@/features/sales/pages/SalesDashboardPage';
import NotFoundPage from '@/components/common/NotFoundPage';

export const router = createBrowserRouter([
  // Public storefront customer pages
  {
    element: <StoreLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/explore', element: <ShopPage /> },
      { path: '/men', element: <ShopPage /> },
      { path: '/women', element: <ShopPage /> },
      { path: '/shoes', element: <ShopPage /> },
      { path: '/accessories', element: <ShopPage /> },
      { path: '/product/:slug', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/wishlist', element: <WishlistPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/signup', element: <RegisterPage /> },

  // Sales dashboard: sales, admin, super admin
  {
    element: <RoleRoute allowedRoles={SALES_ROLES} />,
    children: [
      {
        path: '/sales',
        element: <DashboardLayout title="Sales" />,
        children: [{ index: true, element: <SalesDashboardPage /> }],
      },
    ],
  },

  // Admin dashboard: admin, super admin
  {
    element: <RoleRoute allowedRoles={ADMIN_ROLES} />,
    children: [
      {
        path: '/admin',
        element: <DashboardLayout title="Admin" />,
        children: [{ index: true, element: <AdminDashboardPage /> }],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);
