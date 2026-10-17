import { useState } from 'react';
import {
  Store,
  DollarSign,
  Bell,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSettingsTab() {
  const [storeName, setStoreName] = useState('GLOME Online Mall');
  const [tagline, setTagline] = useState('Premium Fashion, Footwear & Accessories');
  const [email, setEmail] = useState('support@glomemall.com');
  const [phone, setPhone] = useState('+92 (042) 111-456-63');
  const [address, setAddress] = useState('Plaza 42, Main Boulevard, Gulberg III, Lahore, Pakistan');
  const [currency, setCurrency] = useState('USD ($)');
  const [taxRate, setTaxRate] = useState('5.0');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('100.00');
  const [lowStockAlert, setLowStockAlert] = useState('10');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast('Store settings and commerce preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 rounded-2xl bg-[#012D1D] text-white px-5 py-3 shadow-xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">Store & System Settings</h2>
        <p className="text-xs text-gray-500 mt-1">
          Configure mall profile details, billing currency, shipping rules, and inventory threshold alerts.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Store Profile Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#012D1D] flex items-center justify-center">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14211d]">Brand & Store Identity</h3>
              <p className="text-xs text-gray-500">Public store name and customer contact channels</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Store Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Hotline / WhatsApp Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">Physical Fulfillment Center / Warehouse Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Commerce & Inventory Rules Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14211d]">Currency, Tax & Thresholds</h3>
              <p className="text-xs text-gray-500">Checkout calculations and automated inventory replenishment alerts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Display Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] bg-white focus:border-[#012D1D] focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="PKR (₨)">PKR (₨)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Sales Tax (%)</label>
              <input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Free Shipping Min Spend ($)</label>
              <input
                type="number"
                step="1"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Low Stock Warning Limit (Units)</label>
              <input
                type="number"
                value={lowStockAlert}
                onChange={(e) => setLowStockAlert(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Alert Preferences */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14211d]">Automated Alerts</h3>
              <p className="text-xs text-gray-500">Real-time alerts sent to store operators and salesmen</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer transition-colors">
              <div>
                <span className="font-bold text-[#14211d] block">Email Alerts on Low Warehouse Stock</span>
                <span className="text-gray-500">Sends daily digest when any SKU falls below threshold</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-5 w-5 rounded text-[#012D1D] focus:ring-[#012D1D]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer transition-colors">
              <div>
                <span className="font-bold text-[#14211d] block">SMS & WhatsApp Alerts on Client Exchanges</span>
                <span className="text-gray-500">Notifies sales team immediately when an exchange is requested</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="h-5 w-5 rounded text-[#012D1D] focus:ring-[#012D1D]"
              />
            </label>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#012D1D] text-white px-7 py-3 min-h-[44px] text-xs font-bold shadow-md hover:bg-[#124e3b] transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
