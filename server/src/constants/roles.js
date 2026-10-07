// Single source of truth for roles. Never type these strings by hand elsewhere.
export const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  SALES: 'sales',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
});

export const ROLE_LIST = Object.values(ROLES);

// Roles that can enter the staff dashboards.
export const STAFF_ROLES = [ROLES.SALES, ROLES.ADMIN, ROLES.SUPER_ADMIN];
export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

export const USER_STATUS = Object.freeze({
  ACTIVE: 'active',
  BLOCKED: 'blocked',
});
