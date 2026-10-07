import { createBrowserRouter } from 'react-router-dom';

import StoreLayout from '@/layouts/StoreLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import RoleRoute from '@/routes/RoleRoute';
import { ADMIN_ROLES, SALES_ROLES } from '@/constants/roles';

import LandingPage from '@/features/landing/pages/LandingPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import SalesDashboardPage from '@/features/sales/pages/SalesDashboardPage';
import NotFoundPage from '@/components/common/NotFoundPage';

export const router = createBrowserRouter([
  // Public + customer pages
  {
    element: <StoreLayout />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  { path: '/login', element: <LoginPage /> },

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
