import { createSlice } from '@reduxjs/toolkit';
import {
  ROLES,
  ROLE_LABELS,
  DEFAULT_ROLE_PERMISSIONS,
} from '@/constants/roles';

export const INITIAL_STAFF_MEMBERS = [
  {
    id: 'usr-sales-1',
    name: 'Ali Raza',
    role: ROLES.SALES,
    title: 'Lead Sales Representative',
    email: 'ali.raza@glomemall.com',
    phone: '+92 300 1122334',
    territory: 'Lahore & Punjab Central',
    orders: 124,
    sales: 4820.0,
    commissionRate: 5,
    commissionEarned: 241.0,
    convRate: '4.2%',
    rating: '4.9',
    status: 'Active',
    avatar: 'AR',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  },
  {
    id: 'usr-sales-2',
    name: 'Usman Khan',
    role: ROLES.SALES,
    title: 'Senior Sales Representative',
    email: 'usman.khan@glomemall.com',
    phone: '+92 301 4455667',
    territory: 'Islamabad & Rawalpindi',
    orders: 98,
    sales: 3620.0,
    commissionRate: 5,
    commissionEarned: 181.0,
    convRate: '3.8%',
    rating: '4.8',
    status: 'Active',
    avatar: 'UK',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  },
  {
    id: 'usr-sales-3',
    name: 'Ahmed Shah',
    role: ROLES.SALES,
    title: 'Sales Representative',
    email: 'ahmed.shah@glomemall.com',
    phone: '+92 302 7788990',
    territory: 'Karachi South & DHA',
    orders: 76,
    sales: 2980.0,
    commissionRate: 5,
    commissionEarned: 149.0,
    convRate: '3.4%',
    rating: '4.7',
    status: 'Active',
    avatar: 'AS',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  },
  {
    id: 'usr-sales-4',
    name: 'Hassan Ali',
    role: ROLES.SALES,
    title: 'Junior Sales Representative',
    email: 'hassan.ali@glomemall.com',
    phone: '+92 303 9900112',
    territory: 'Faisalabad & Multan',
    orders: 54,
    sales: 2150.0,
    commissionRate: 5,
    commissionEarned: 107.5,
    convRate: '2.9%',
    rating: '4.6',
    status: 'Active',
    avatar: 'HA',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  },
  {
    id: 'usr-sales-5',
    name: 'Zainab Malik',
    role: ROLES.SALES,
    title: 'Sales Representative',
    email: 'zainab.malik@glomemall.com',
    phone: '+92 304 2233445',
    territory: 'Peshawar & KPK',
    orders: 38,
    sales: 1420.0,
    commissionRate: 5,
    commissionEarned: 71.0,
    convRate: '2.6%',
    rating: '4.5',
    status: 'On Leave',
    avatar: 'ZM',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  },
  {
    id: 'usr-admin-2',
    name: 'Bilal Tariq',
    role: ROLES.ADMIN,
    title: 'Store Administrator',
    email: 'bilal.tariq@glomemall.com',
    phone: '+92 305 6677889',
    territory: 'Nationwide Mall Operations',
    orders: 180,
    sales: 8400.0,
    commissionRate: 7,
    commissionEarned: 588.0,
    convRate: '4.6%',
    rating: '5.0',
    status: 'Active',
    avatar: 'BT',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.ADMIN]],
  },
];

const loadInitialStaffList = () => {
  try {
    const saved = localStorage.getItem('glome_staff_list');
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return INITIAL_STAFF_MEMBERS;
};

const loadInitialUser = () => {
  try {
    const saved = localStorage.getItem('glome_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure super_admin role and permissions are preserved
      if (!parsed.permissions || parsed.permissions.length === 0) {
        parsed.permissions = DEFAULT_ROLE_PERMISSIONS[parsed.role] || [];
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return {
    id: 'usr-superadmin-1',
    name: 'Sohail Shabbir',
    email: 'sohail@glome.com',
    role: ROLES.SUPER_ADMIN,
    title: 'Super Administrator',
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]],
  };
};

const initialState = {
  user: loadInitialUser(),
  impersonatedUser: null,
  staffList: loadInitialStaffList(),
  accessToken: 'mock-auth-jwt',
  isAuthReady: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const userObj = { ...payload.user };
      if (!userObj.permissions) {
        userObj.permissions = DEFAULT_ROLE_PERMISSIONS[userObj.role] || [];
      }
      state.user = userObj;
      state.impersonatedUser = null;
      state.accessToken = payload.accessToken;
      state.isAuthReady = true;
      try {
        localStorage.setItem('glome_user', JSON.stringify(userObj));
      } catch {
        // ignore
      }
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      try {
        localStorage.setItem('glome_user', JSON.stringify(payload));
      } catch {
        // ignore
      }
    },
    switchRole: (state, { payload }) => {
      state.impersonatedUser = null;
      if (payload === 'sales') {
        const leadSales = state.staffList.find((s) => s.id === 'usr-sales-1') || INITIAL_STAFF_MEMBERS[0];
        state.user = {
          id: leadSales.id,
          name: leadSales.name,
          email: leadSales.email,
          role: leadSales.role,
          title: leadSales.title,
          permissions: leadSales.permissions || DEFAULT_ROLE_PERMISSIONS[ROLES.SALES],
        };
      } else {
        state.user = {
          id: 'usr-superadmin-1',
          name: 'Sohail Shabbir',
          email: 'sohail@glome.com',
          role: ROLES.SUPER_ADMIN,
          title: 'Super Administrator',
          permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]],
        };
      }
      try {
        localStorage.setItem('glome_user', JSON.stringify(state.user));
      } catch {
        // ignore
      }
    },
    updateStaffMember: (state, { payload }) => {
      const { id, role, title, permissions, status, territory, commissionRate } = payload;
      const index = state.staffList.findIndex((s) => s.id === id);
      if (index !== -1) {
        const updated = {
          ...state.staffList[index],
          ...(role && { role }),
          ...(title && { title }),
          ...(permissions && { permissions }),
          ...(status && { status }),
          ...(territory && { territory }),
          ...(commissionRate !== undefined && { commissionRate }),
        };
        state.staffList[index] = updated;

        // If the current user or impersonated user is this staff member, update their session too!
        if (state.user && state.user.id === id) {
          state.user = {
            ...state.user,
            role: updated.role,
            title: updated.title,
            permissions: updated.permissions,
          };
          try {
            localStorage.setItem('glome_user', JSON.stringify(state.user));
          } catch {
            // ignore
          }
        }
        if (state.impersonatedUser && state.impersonatedUser.id === id) {
          state.impersonatedUser = {
            ...state.impersonatedUser,
            role: updated.role,
            title: updated.title,
            permissions: updated.permissions,
          };
        }

        try {
          localStorage.setItem('glome_staff_list', JSON.stringify(state.staffList));
        } catch {
          // ignore
        }
      }
    },
    promoteStaffMember: (state, { payload }) => {
      const { id, targetRole } = payload;
      const index = state.staffList.findIndex((s) => s.id === id);
      if (index !== -1) {
        const newRole = targetRole || ROLES.ADMIN;
        const newTitle = ROLE_LABELS[newRole] || 'Store Administrator';
        const newPerms = [...(DEFAULT_ROLE_PERMISSIONS[newRole] || [])];

        state.staffList[index] = {
          ...state.staffList[index],
          role: newRole,
          title: newTitle,
          permissions: newPerms,
        };

        if (state.user && state.user.id === id) {
          state.user.role = newRole;
          state.user.title = newTitle;
          state.user.permissions = newPerms;
          try {
            localStorage.setItem('glome_user', JSON.stringify(state.user));
          } catch {
            // ignore
          }
        }

        try {
          localStorage.setItem('glome_staff_list', JSON.stringify(state.staffList));
        } catch {
          // ignore
        }
      }
    },
    addStaffMember: (state, { payload }) => {
      const newId = `usr-staff-${Date.now().toString().slice(-4)}`;
      const initials = payload.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const newMember = {
        id: newId,
        name: payload.name,
        role: payload.role || ROLES.SALES,
        title: payload.title || ROLE_LABELS[payload.role || ROLES.SALES],
        email: payload.email,
        phone: payload.phone || '+92 300 0000000',
        territory: payload.territory || 'Unassigned Region',
        orders: 0,
        sales: 0.0,
        commissionRate: payload.commissionRate || 5,
        commissionEarned: 0.0,
        convRate: '0.0%',
        rating: '5.0',
        status: 'Active',
        avatar: initials || 'ST',
        permissions: payload.permissions || [...DEFAULT_ROLE_PERMISSIONS[payload.role || ROLES.SALES]],
      };

      state.staffList.push(newMember);
      try {
        localStorage.setItem('glome_staff_list', JSON.stringify(state.staffList));
      } catch {
        // ignore
      }
    },
    deleteStaffMember: (state, { payload }) => {
      state.staffList = state.staffList.filter((s) => s.id !== payload);
      try {
        localStorage.setItem('glome_staff_list', JSON.stringify(state.staffList));
      } catch {
        // ignore
      }
    },
    resetStaffDefaults: (state) => {
      state.staffList = INITIAL_STAFF_MEMBERS;
      try {
        localStorage.setItem('glome_staff_list', JSON.stringify(INITIAL_STAFF_MEMBERS));
      } catch {
        // ignore
      }
    },
    impersonateStaff: (state, { payload }) => {
      // Allows Super Admin to view the mall dashboard as this staff member
      state.impersonatedUser = {
        ...payload,
        permissions: payload.permissions || DEFAULT_ROLE_PERMISSIONS[payload.role] || [],
      };
    },
    stopImpersonation: (state) => {
      state.impersonatedUser = null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.impersonatedUser = null;
      state.accessToken = null;
      state.isAuthReady = true;
      try {
        localStorage.removeItem('glome_user');
      } catch {
        // ignore
      }
    },
  },
});

export const {
  setCredentials,
  setUser,
  switchRole,
  updateStaffMember,
  promoteStaffMember,
  addStaffMember,
  deleteStaffMember,
  resetStaffDefaults,
  impersonateStaff,
  stopImpersonation,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.impersonatedUser || state.auth.user;
export const selectOriginalUser = (state) => state.auth.user;
export const selectIsImpersonating = (state) => Boolean(state.auth.impersonatedUser);
export const selectStaffList = (state) => state.auth.staffList;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthReady = (state) => state.auth.isAuthReady;

