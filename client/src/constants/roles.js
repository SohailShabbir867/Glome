// Must match server/src/constants/roles.js
export const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  SALES: 'sales',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
});

export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];
export const SALES_ROLES = [ROLES.SALES, ROLES.ADMIN, ROLES.SUPER_ADMIN];

// Where each role lands after login.
export const HOME_BY_ROLE = Object.freeze({
  [ROLES.CUSTOMER]: '/',
  [ROLES.SALES]: '/sales',
  [ROLES.ADMIN]: '/admin',
  [ROLES.SUPER_ADMIN]: '/admin',
});
