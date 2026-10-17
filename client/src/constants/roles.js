// Role and Permission Architecture for Glome Mall
export const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  SALES: 'sales',
  SALES_MANAGER: 'sales_manager',
  INVENTORY_MANAGER: 'inventory_manager',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.SALES]: 'Sales Representative',
  [ROLES.SALES_MANAGER]: 'Sales Manager',
  [ROLES.INVENTORY_MANAGER]: 'Inventory Controller',
  [ROLES.ADMIN]: 'Store Administrator',
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
});

export const ROLE_DESCRIPTIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: 'Ultimate platform owner with supreme authority over all modules, staff promotions, and system permissions.',
  [ROLES.ADMIN]: 'Store administrator responsible for products, warehouse stock, orders, reports, discounts, and customer support.',
  [ROLES.SALES_MANAGER]: 'Leads sales team, manages customer orders, packing fulfillment, courier deliveries, and returns.',
  [ROLES.INVENTORY_MANAGER]: 'Controls warehouse inventory, restock alerts, suppliers, catalog items, and fulfillment packing.',
  [ROLES.SALES]: 'Customer-facing sales representative handling daily order verification, dispatching, and customer exchange requests.',
  [ROLES.CUSTOMER]: 'Registered customer with shopping cart, orders history, and wishlist privileges.',
});

// Roles allowed to access the admin portal
export const ADMIN_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.INVENTORY_MANAGER,
];

// Roles allowed to access the sales portal
export const SALES_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.SALES_MANAGER,
  ROLES.SALES,
  ROLES.INVENTORY_MANAGER,
];

// All modular dashboard tabs and access keys
export const DASHBOARD_MODULES = [
  { id: 'dashboard', label: 'Overview Dashboard', category: 'General' },
  { id: 'orders', label: 'Order Processing Queue', category: 'Sales & Fulfillment' },
  { id: 'packing', label: 'Packing & Fulfillment', category: 'Sales & Fulfillment' },
  { id: 'deliveries', label: 'Courier Deliveries', category: 'Sales & Fulfillment' },
  { id: 'exchanges', label: 'Product Exchanges & Returns', category: 'Sales & Fulfillment' },
  { id: 'earnings', label: 'Sales Commission & Quotas', category: 'Sales & Fulfillment' },
  { id: 'products', label: 'Products & Catalog', category: 'Catalog & Inventory' },
  { id: 'inventory', label: 'Warehouse Stock & Restock', category: 'Catalog & Inventory' },
  { id: 'customers', label: 'Customer Management', category: 'CRM & Communications' },
  { id: 'messages', label: 'Contacts & Inquiries', category: 'CRM & Communications' },
  { id: 'reports', label: 'Analytics & Financial Reports', category: 'Finance & Analytics' },
  { id: 'payments', label: 'Payments & Transactions', category: 'Finance & Analytics' },
  { id: 'discounts', label: 'Discounts & Promo Coupons', category: 'Marketing' },
  { id: 'staff', label: 'Staff Roles & Permissions', category: 'Administration', superAdminOnly: true },
  { id: 'settings', label: 'Store & Platform Settings', category: 'Administration' },
];

export const DEFAULT_ROLE_PERMISSIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: [
    'dashboard',
    'orders',
    'packing',
    'deliveries',
    'exchanges',
    'earnings',
    'products',
    'inventory',
    'customers',
    'messages',
    'reports',
    'payments',
    'discounts',
    'staff',
    'settings',
  ],
  [ROLES.ADMIN]: [
    'dashboard',
    'orders',
    'packing',
    'deliveries',
    'exchanges',
    'earnings',
    'products',
    'inventory',
    'customers',
    'messages',
    'reports',
    'payments',
    'discounts',
    'settings',
  ],
  [ROLES.SALES_MANAGER]: [
    'dashboard',
    'orders',
    'packing',
    'deliveries',
    'exchanges',
    'earnings',
    'inventory',
    'customers',
    'messages',
    'reports',
  ],
  [ROLES.INVENTORY_MANAGER]: [
    'dashboard',
    'products',
    'inventory',
    'packing',
    'deliveries',
    'orders',
    'reports',
  ],
  [ROLES.SALES]: [
    'dashboard',
    'orders',
    'packing',
    'deliveries',
    'exchanges',
    'inventory',
    'messages',
    'earnings',
  ],
  [ROLES.CUSTOMER]: [],
});

// Helper to determine if a user has permission for a specific module
export const hasPermission = (user, moduleKey) => {
  if (!user) return false;
  // Super Admin has universal access to every module
  if (user.role === ROLES.SUPER_ADMIN) return true;
  // Staff Role & Permission Management is strictly Super Admin only
  if (moduleKey === 'staff') {
    return user.role === ROLES.SUPER_ADMIN;
  }
  // Check customized permissions array if assigned to user
  if (Array.isArray(user.permissions) && user.permissions.length > 0) {
    return user.permissions.includes(moduleKey);
  }
  // Fallback to role default permissions
  const defaultPerms = DEFAULT_ROLE_PERMISSIONS[user.role] || [];
  return defaultPerms.includes(moduleKey);
};

// Where each role lands after login
export const HOME_BY_ROLE = Object.freeze({
  [ROLES.CUSTOMER]: '/',
  [ROLES.SALES]: '/sales',
  [ROLES.SALES_MANAGER]: '/sales',
  [ROLES.INVENTORY_MANAGER]: '/admin?tab=inventory',
  [ROLES.ADMIN]: '/admin',
  [ROLES.SUPER_ADMIN]: '/admin',
});

