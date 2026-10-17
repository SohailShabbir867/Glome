import { useState } from 'react';
import {
  User,
  Target,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesSettingsTab() {
  const [repName, setRepName] = useState('Ali Raza');
  const [phone, setPhone] = useState('+92 300 1122334');
  const [email, setEmail] = useState('ali.raza@glomemall.com');
  const [territory, setTerritory] = useState('Lahore Central & Gulberg Hub');
  const [dailyTarget, setDailyTarget] = useState('15');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoSms, setAutoSms] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Sales representative preferences updated successfully!');
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
        <h2 className="font-serif text-2xl font-bold text-[#14211d]">
          Sales Representative Settings
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage your representative profile, order dispatch sound alerts, and daily sales targets.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#012D1D] flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14211d]">Sales Representative Details</h3>
              <p className="text-xs text-gray-500">Your assigned agent ID is #REP-401</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Assigned Territory</label>
              <input
                type="text"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Direct Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quota and Alert Preferences */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14211d]">Daily Targets & Order Notifications</h3>
              <p className="text-xs text-gray-500">Configure alerts when new online orders are placed in your territory</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="max-w-xs">
              <label className="block font-bold text-gray-700 mb-1">Daily Target Orders</label>
              <input
                type="number"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 min-h-[44px] focus:border-[#012D1D] focus:outline-none"
              />
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer transition-colors">
              <div>
                <span className="font-bold text-[#14211d] block">Sound Alert on New Incoming Order</span>
                <span className="text-gray-500">Plays an audible chime when an order needs phone verification</span>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="h-5 w-5 rounded text-[#012D1D] focus:ring-[#012D1D]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer transition-colors">
              <div>
                <span className="font-bold text-[#14211d] block">Automated Dispatch SMS to Client</span>
                <span className="text-gray-500">Sends WhatsApp/SMS tracking link as soon as order is marked dispatched</span>
              </div>
              <input
                type="checkbox"
                checked={autoSms}
                onChange={(e) => setAutoSms(e.target.checked)}
                className="h-5 w-5 rounded text-[#012D1D] focus:ring-[#012D1D]"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#012D1D] text-white px-7 py-3 min-h-[44px] text-xs font-bold shadow-md hover:bg-[#124e3b] transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
