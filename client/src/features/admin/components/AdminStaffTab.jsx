import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search,
  Star,
  ShieldCheck,
  UserCheck,
  UserPlus,
  KeyRound,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ROLES,
  ROLE_LABELS,
  DASHBOARD_MODULES,
  DEFAULT_ROLE_PERMISSIONS,
} from '@/constants/roles';
import {
  selectStaffList,
  selectCurrentUser,
  updateStaffMember,
  promoteStaffMember,
  addStaffMember,
  resetStaffDefaults,
  impersonateStaff,
} from '@/features/auth/authSlice';

// RoomBridge Exact Design Tokens
const DK = '#012D1D'; // Obsidian Dark Green
const BTN = '#8E4E14'; // Cognac Leather / Warm Brown
const ACC = '#FFAB69'; // Peach Gold Accent
const CR = '#F7F4EF'; // Cream Background
const BORDER = '#E8E2D9'; // Stone Warm Border

export default function AdminStaffTab() {
  const dispatch = useDispatch();
  const staffList = useSelector(selectStaffList);
  const currentUser = useSelector(selectCurrentUser);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [editingMember, setEditingMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // New staff form state
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: ROLES.SALES,
    territory: 'Lahore & Punjab Central',
    commissionRate: 5,
    permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
  });

  // Modal editing state
  const [selectedRole, setSelectedRole] = useState(ROLES.SALES);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedTerritory, setSelectedTerritory] = useState('');
  const [selectedCommission, setSelectedCommission] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState('Active');

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  // Open Edit Modal with member's current settings
  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setSelectedRole(member.role);
    setSelectedPermissions(member.permissions || DEFAULT_ROLE_PERMISSIONS[member.role] || []);
    setSelectedTerritory(member.territory || '');
    setSelectedCommission(member.commissionRate || 5);
    setSelectedStatus(member.status || 'Active');
  };

  // Save updated permissions & role
  const handleSaveMemberPermissions = () => {
    if (!editingMember) return;
    dispatch(
      updateStaffMember({
        id: editingMember.id,
        role: selectedRole,
        title: ROLE_LABELS[selectedRole],
        permissions: selectedPermissions,
        territory: selectedTerritory,
        commissionRate: Number(selectedCommission),
        status: selectedStatus,
      })
    );
    showToast(`Permissions & role for ${editingMember.name} updated successfully.`);
    setEditingMember(null);
  };

  // Toggle single permission checkbox
  const handleTogglePermission = (moduleId) => {
    if (moduleId === 'staff' && selectedRole !== ROLES.SUPER_ADMIN) {
      return; // Only super admin can manage staff
    }
    setSelectedPermissions((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  // Apply permission preset
  const handleApplyPreset = (presetRole) => {
    setSelectedRole(presetRole);
    setSelectedPermissions([...(DEFAULT_ROLE_PERMISSIONS[presetRole] || [])]);
  };

  // Quick promote to Admin
  const handleQuickPromote = (member) => {
    const targetRole = member.role === ROLES.ADMIN ? ROLES.SALES : ROLES.ADMIN;
    dispatch(promoteStaffMember({ id: member.id, targetRole }));
    showToast(
      `${member.name} has been ${targetRole === ROLES.ADMIN ? 'promoted to Store Administrator' : 'set to Sales Representative'}.`
    );
  };

  // Impersonate / test view
  const handleImpersonate = (member) => {
    dispatch(impersonateStaff(member));
    showToast(`Now testing dashboard view as ${member.name} (${ROLE_LABELS[member.role]}).`);
  };

  // Create new staff
  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    dispatch(
      addStaffMember({
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        role: newStaff.role,
        title: ROLE_LABELS[newStaff.role],
        territory: newStaff.territory,
        commissionRate: Number(newStaff.commissionRate),
        permissions: newStaff.permissions,
      })
    );

    setIsAddModalOpen(false);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      role: ROLES.SALES,
      territory: 'Lahore & Punjab Central',
      commissionRate: 5,
      permissions: [...DEFAULT_ROLE_PERMISSIONS[ROLES.SALES]],
    });
    showToast(`New staff member ${newStaff.name} onboarded successfully.`);
  };

  // Filter staff
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.territory.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (ROLE_LABELS[s.role] || '').toLowerCase().includes(search.toLowerCase());

    if (roleFilter === 'ALL') return matchesSearch;
    return matchesSearch && s.role === roleFilter;
  });

  const totalSalesVolume = staffList.reduce((acc, curr) => acc + (curr.sales || 0), 0);
  const totalCommission = staffList.reduce((acc, curr) => acc + (curr.commissionEarned || 0), 0);
  const totalOrders = staffList.reduce((acc, curr) => acc + (curr.orders || 0), 0);

  // Styling helper for roles
  const getRoleBadge = (role) => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return {
          bg: DK,
          text: ACC,
          border: ACC,
          label: 'Super Administrator',
        };
      case ROLES.ADMIN:
        return {
          bg: '#012D1D',
          text: '#ffffff',
          border: '#012D1D',
          label: 'Store Administrator',
        };
      case ROLES.SALES_MANAGER:
        return {
          bg: BTN,
          text: '#ffffff',
          border: BTN,
          label: 'Sales Manager',
        };
      case ROLES.INVENTORY_MANAGER:
        return {
          bg: '#312e81',
          text: '#e0e7ff',
          border: '#4338ca',
          label: 'Inventory Controller',
        };
      default:
        return {
          bg: '#065f46',
          text: '#d1fae5',
          border: '#059669',
          label: 'Sales Representative',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-white text-xs font-bold"
            style={{ backgroundColor: DK, border: `1px solid ${ACC}` }}
          >
            <CheckCircle2 className="h-4 w-4" style={{ color: ACC }} />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Super Admin Authority Banner */}
      <div
        className="rounded-3xl p-6 sm:p-7 text-white border shadow-sm relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${DK} 0%, #034830 100%)`,
          borderColor: 'rgba(255, 171, 105, 0.3)',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold tracking-wide uppercase border shadow-2xs"
                style={{
                  backgroundColor: 'rgba(255, 171, 105, 0.15)',
                  color: ACC,
                  borderColor: 'rgba(255, 171, 105, 0.4)',
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Super Admin Privilege Active
              </span>
              <span className="text-xs text-white/60 font-mono">
                Logged in as: {currentUser?.name || 'Sohail Shabbir'} (Super Administrator)
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Staff Roles & Access Permissions Management
            </h1>
            <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
              Super Administrator control center: Assign specialized roles, configure which dashboard
              tabs salesmen can access, promote team members to Store Admins, and audit live performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 min-h-[44px] text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-98 cursor-pointer"
              style={{ backgroundColor: BTN }}
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Staff Member</span>
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(resetStaffDefaults());
                showToast('Staff directory reset to default profiles.');
              }}
              title="Reset staff list to default demo members"
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 min-h-[44px] text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Staff Roster</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>
            {staffList.length} Active Staff
          </div>
          <div className="text-xs text-gray-500">
            {staffList.filter((s) => s.role === ROLES.ADMIN).length} Admins •{' '}
            {staffList.filter((s) => s.role === ROLES.SALES).length} Sales Reps
          </div>
        </div>

        <div
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Gross Sales Closed</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: DK }}>
            ${totalSalesVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-700 font-semibold">{totalOrders} orders verified</p>
        </div>

        <div
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Commission Paid</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold" style={{ color: BTN }}>
            ${totalCommission.toFixed(2)}
          </div>
          <p className="text-xs text-gray-500">Tiered sales commissions</p>
        </div>

        <div
          className="rounded-2xl bg-white p-5 border shadow-sm space-y-2"
          style={{ borderColor: BORDER }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Top Representative</span>
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ACC}25`, color: BTN }}
            >
              <Star className="h-4 w-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-extrabold text-amber-700">Ali Raza</div>
          <p className="text-xs text-emerald-700 font-semibold">124 orders • 4.9 rating</p>
        </div>
      </div>

      {/* 3. Search and Role Filter Tabs */}
      <div
        className="bg-white p-4 sm:p-5 rounded-2xl border shadow-sm space-y-4"
        style={{ borderColor: BORDER }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by staff name, region, email, or role..."
              className="w-full rounded-xl border py-2.5 pl-10 pr-4 min-h-[44px] text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all"
              style={{ backgroundColor: CR, borderColor: BORDER }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl border" style={{ backgroundColor: CR, borderColor: BORDER }}>
            {[
              { id: 'ALL', label: 'All Roles' },
              { id: ROLES.ADMIN, label: 'Store Admins' },
              { id: ROLES.SALES_MANAGER, label: 'Managers' },
              { id: ROLES.SALES, label: 'Sales Reps' },
              { id: ROLES.INVENTORY_MANAGER, label: 'Inventory' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  roleFilter === tab.id
                    ? 'shadow-xs font-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={
                  roleFilter === tab.id
                    ? { backgroundColor: DK, color: '#ffffff' }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Staff Directory Table */}
      <div
        className="rounded-3xl bg-white border shadow-sm overflow-hidden"
        style={{ borderColor: BORDER }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className="border-b text-gray-500 uppercase tracking-wider font-bold"
                style={{ backgroundColor: CR, borderColor: BORDER }}
              >
                <th className="py-4 px-5">Staff Member & Contact</th>
                <th className="py-4 px-5">Assigned Role</th>
                <th className="py-4 px-5">Region / Territory</th>
                <th className="py-4 px-5">Active Dashboard Tabs</th>
                <th className="py-4 px-5">Closed Orders</th>
                <th className="py-4 px-5">Gross Sales</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Super Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((member) => {
                const roleBadge = getRoleBadge(member.role);
                const permissionsCount = (member.permissions || []).length;

                return (
                  <tr key={member.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Member Contact */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs"
                          style={{ backgroundColor: `${ACC}25`, color: DK }}
                        >
                          {member.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                            <span>{member.name}</span>
                            {member.role === ROLES.SUPER_ADMIN && (
                              <span
                                className="px-1.5 py-0.2 rounded text-[10px] font-bold"
                                style={{ backgroundColor: ACC, color: DK }}
                              >
                                Super
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 text-xs truncate">{member.email}</div>
                          <div className="text-gray-500 text-[11px] font-mono">{member.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 px-5">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs whitespace-nowrap"
                        style={{
                          backgroundColor: roleBadge.bg,
                          color: roleBadge.text,
                          borderColor: roleBadge.border,
                        }}
                      >
                        <ShieldCheck className="h-3 w-3" />
                        <span>{roleBadge.label}</span>
                      </span>
                    </td>

                    {/* Territory */}
                    <td className="py-4 px-5 text-gray-700 font-medium whitespace-nowrap">
                      {member.territory}
                    </td>

                    {/* Permitted Tabs Chips */}
                    <td className="py-4 px-5">
                      <div className="flex flex-wrap items-center gap-1 max-w-xs">
                        {(member.permissions || []).slice(0, 3).map((permId) => {
                          const mod = DASHBOARD_MODULES.find((m) => m.id === permId);
                          return (
                            <span
                              key={permId}
                              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-gray-700 border border-gray-200"
                            >
                              {mod ? mod.label.split(' ')[0] : permId}
                            </span>
                          );
                        })}
                        {permissionsCount > 3 && (
                          <span
                            onClick={() => handleOpenEdit(member)}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer hover:underline"
                            style={{ backgroundColor: `${ACC}30`, color: BTN }}
                          >
                            +{permissionsCount - 3} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="py-4 px-5">
                      <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {member.orders} closed
                      </span>
                    </td>

                    {/* Sales */}
                    <td className="py-4 px-5 font-bold" style={{ color: DK }}>
                      ${member.sales.toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-bold ${
                          member.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Manage Permissions Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(member)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold border transition-colors cursor-pointer shadow-2xs hover:bg-stone-50"
                          style={{ borderColor: BORDER, color: DK }}
                          title="Manage roles and allowed dashboard tabs"
                        >
                          <KeyRound className="h-3.5 w-3.5" style={{ color: BTN }} />
                          <span>Permissions</span>
                        </button>

                        {/* Quick Promote / Toggle to Admin */}
                        {member.role !== ROLES.SUPER_ADMIN && (
                          <button
                            type="button"
                            onClick={() => handleQuickPromote(member)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                            style={{
                              backgroundColor: member.role === ROLES.ADMIN ? '#fef3c7' : '#ecfdf5',
                              borderColor: member.role === ROLES.ADMIN ? '#fde68a' : '#a7f3d0',
                              color: member.role === ROLES.ADMIN ? '#92400e' : '#065f46',
                            }}
                            title={
                              member.role === ROLES.ADMIN
                                ? 'Set back to Sales Representative'
                                : 'Promote to Store Administrator'
                            }
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>
                              {member.role === ROLES.ADMIN ? 'Set to Sales' : 'Make Admin'}
                            </span>
                          </button>
                        )}

                        {/* Impersonate / Test View */}
                        <button
                          type="button"
                          onClick={() => handleImpersonate(member)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[38px] rounded-xl text-xs font-bold text-gray-700 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Test portal as this staff member"
                        >
                          <Eye className="h-3.5 w-3.5 text-gray-500" />
                          <span className="hidden xl:inline">Test View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Comprehensive Role & Permission Management Modal */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border space-y-6 my-8 max-h-[90vh] overflow-y-auto"
              style={{ borderColor: BORDER }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER }}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shadow-xs"
                    style={{ backgroundColor: `${ACC}25`, color: DK }}
                  >
                    {editingMember.avatar}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold" style={{ color: DK }}>
                      Manage Access: {editingMember.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {editingMember.email} • Assigned Role: {ROLE_LABELS[selectedRole]}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 1. Select Staff Role */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
                    1. Select Operational Role
                  </label>
                  <span className="text-[11px] text-gray-500">
                    Roles define baseline system capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: ROLES.ADMIN,
                      title: 'Store Administrator',
                      desc: 'Full store operations: catalog products, stock adjustments, orders, reports & discounts.',
                    },
                    {
                      id: ROLES.SALES_MANAGER,
                      title: 'Sales & Fulfillment Manager',
                      desc: 'Supervises sales queue, coordinates fulfillment packing, deliveries, and exchanges.',
                    },
                    {
                      id: ROLES.SALES,
                      title: 'Sales Representative',
                      desc: 'Customer orders verification, dispatching, live stock inquiry, and exchange requests.',
                    },
                    {
                      id: ROLES.INVENTORY_MANAGER,
                      title: 'Inventory Controller',
                      desc: 'Warehouse stock levels, restock alerts, suppliers, footwear/apparel catalog items.',
                    },
                  ].map((r) => {
                    const isSelected = selectedRole === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => handleApplyPreset(r.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? 'shadow-xs border-2'
                            : 'hover:bg-stone-50/70 border-gray-200'
                        }`}
                        style={{
                          borderColor: isSelected ? DK : BORDER,
                          backgroundColor: isSelected ? `${ACC}15` : '#ffffff',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs" style={{ color: DK }}>
                            {r.title}
                          </span>
                          <span
                            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-[#012D1D] border-[#012D1D]' : 'border-gray-300'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{r.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Granular Module Permissions Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
                    2. Dashboard Tab Permissions ({selectedPermissions.length} Active)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPermissions(
                          DASHBOARD_MODULES.filter((m) => !m.superAdminOnly).map((m) => m.id)
                        )
                      }
                      className="text-[11px] font-bold cursor-pointer hover:underline"
                      style={{ color: BTN }}
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">•</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPermissions([...(DEFAULT_ROLE_PERMISSIONS[selectedRole] || [])])
                      }
                      className="text-[11px] font-bold cursor-pointer hover:underline text-gray-500"
                    >
                      Reset to Role Default
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DASHBOARD_MODULES.map((mod) => {
                    const isChecked = selectedPermissions.includes(mod.id);
                    const isStaffAdminLocked = mod.id === 'staff';

                    return (
                      <div
                        key={mod.id}
                        onClick={() => {
                          if (!isStaffAdminLocked) handleTogglePermission(mod.id);
                        }}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isStaffAdminLocked
                            ? 'opacity-60 bg-gray-50 cursor-not-allowed'
                            : isChecked
                            ? 'bg-emerald-50/50 border-emerald-300 cursor-pointer'
                            : 'hover:bg-stone-50 border-gray-200 cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isStaffAdminLocked}
                          onChange={() => handleTogglePermission(mod.id)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#012D1D] focus:ring-[#012D1D]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-gray-900">{mod.label}</span>
                            {isStaffAdminLocked && (
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                                style={{ backgroundColor: ACC, color: DK }}
                              >
                                Super Admin Only
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500">{mod.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Territory and Commission inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: BORDER }}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Assigned Region / Territory
                  </label>
                  <input
                    type="text"
                    value={selectedTerritory}
                    onChange={(e) => setSelectedTerritory(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#012D1D] focus:outline-none"
                    placeholder="e.g. Lahore & Punjab Central"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Sales Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={selectedCommission}
                    onChange={(e) => setSelectedCommission(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-[#012D1D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: BORDER }}>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveMemberPermissions}
                  className="rounded-xl px-5 py-2.5 min-h-[44px] text-xs font-bold text-white shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                  style={{ backgroundColor: DK }}
                >
                  <Check className="h-4 w-4" style={{ color: ACC }} />
                  <span>Save Role & Permissions</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Add New Staff Member Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border space-y-5"
              style={{ borderColor: BORDER }}
            >
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER }}>
                <h3 className="font-serif text-xl font-bold" style={{ color: DK }}>
                  Onboard New Staff Member
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStaff} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      placeholder="tariq@glomemall.com"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Initial Role
                    </label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => {
                        const r = e.target.value;
                        setNewStaff({
                          ...newStaff,
                          role: r,
                          permissions: [...(DEFAULT_ROLE_PERMISSIONS[r] || [])],
                        });
                      }}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 bg-white focus:border-[#012D1D] focus:outline-none"
                    >
                      <option value={ROLES.SALES}>Sales Representative</option>
                      <option value={ROLES.SALES_MANAGER}>Sales Manager</option>
                      <option value={ROLES.ADMIN}>Store Administrator</option>
                      <option value={ROLES.INVENTORY_MANAGER}>Inventory Controller</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={newStaff.commissionRate}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, commissionRate: Number(e.target.value) })
                      }
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Assigned Region / Territory
                  </label>
                  <input
                    type="text"
                    value={newStaff.territory}
                    onChange={(e) => setNewStaff({ ...newStaff, territory: e.target.value })}
                    placeholder="e.g. Islamabad & North"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t" style={{ borderColor: BORDER }}>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl border border-gray-300 px-4 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl px-5 py-2.5 min-h-[44px] text-xs font-bold text-white shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                    style={{ backgroundColor: DK }}
                  >
                    <UserPlus className="h-4 w-4" style={{ color: ACC }} />
                    <span>Create & Assign Permissions</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
