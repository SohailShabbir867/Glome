import { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  Video,
  Filter,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { SECURITY_INCIDENTS } from '../data/mockCameras';

// RoomBridge Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

export default function SecurityAlertsTab({ onSwitchToPlayback }) {
  const [incidents, setIncidents] = useState(SECURITY_INCIDENTS);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');
  const [dispatchedGuard, setDispatchedGuard] = useState(null);

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter === 'ALL') return true;
    return inc.severity.toUpperCase() === severityFilter.toUpperCase();
  });

  const criticalCount = incidents.filter((i) => i.severity === 'Critical').length;
  const unackCount = incidents.filter((i) => !i.acknowledged).length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleAcknowledge = (id) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, acknowledged: true } : inc))
    );
    showToast(`Incident #${id} acknowledged and logged in duty registry.`);
  };

  const handleDispatchGuard = (inc) => {
    setDispatchedGuard({
      incidentId: inc.id,
      camera: inc.camera,
      time: new Date().toLocaleTimeString(),
    });
    showToast(
      `🚨 High Priority: Guard Unit Delta dispatched to ${inc.camera} for incident #${inc.id}.`
    );
  };

  const handleClearAlarm = (id) => {
    setIncidents((prev) => prev.filter((i) => i.id !== id));
    showToast(`Incident #${id} resolved & archived.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="p-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-md animate-fade-in"
          style={{ backgroundColor: DK, border: `1px solid ${ACC}` }}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: ACC }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dispatched Guard Banner if active */}
      {dispatchedGuard && (
        <div
          className="p-4 rounded-2xl border flex items-center justify-between gap-4 animate-pulse"
          style={{
            backgroundColor: 'rgba(142, 78, 20, 0.1)',
            borderColor: BTN,
          }}
        >
          <div className="flex items-center gap-3">
            <Radio className="h-5 w-5 text-amber-700 animate-spin" />
            <div>
              <div className="font-black text-sm text-amber-900">
                Guard Patrol En Route: {dispatchedGuard.camera}
              </div>
              <div className="text-xs text-amber-800">
                Officer dispatched at {dispatchedGuard.time} • Body cam feed linking to NVR
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setDispatchedGuard(null);
              showToast('Guard confirmed area clear. Incident status: SECURED.');
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm hover:brightness-110 min-h-[38px] transition-all"
            style={{ backgroundColor: DK }}
          >
            Mark Zone Cleared
          </button>
        </div>
      )}

      {/* Incident Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Unacknowledged Alerts */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Pending Alerts
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Bell className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-900">
              {unackCount}
            </span>
            <span className="text-xs font-bold text-amber-700">Needs Review</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            AI motion & door trip events awaiting officer sign-off
          </p>
        </div>

        {/* Critical Incidents */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Critical Flags
            </span>
            <div className="p-2 rounded-xl bg-red-100 text-red-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-800">
              {criticalCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Logged
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            Glass break & perimeter optical sensor audits
          </p>
        </div>

        {/* Perimeter Health */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Perimeter Integrity
            </span>
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(1, 45, 29, 0.08)', color: DK }}
            >
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: DK }}>
              100% Armed
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            8 Zones & optical tripwires operational
          </p>
        </div>

        {/* Guard Station Status */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Security Patrol
            </span>
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(142, 78, 20, 0.1)', color: BTN }}
            >
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: DK }}>
              3 Active
            </span>
            <span className="text-xs font-bold text-neutral-600">On Duty</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            Tariq M., Imran K., & Bilal S. (Radio Ch. 4)
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        className="p-4 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
        style={{ backgroundColor: CR, borderColor: BORDER }}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-neutral-500" />
          <span className="text-xs font-bold text-neutral-700">Filter Severity:</span>
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                severityFilter === sev ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
              }`}
              style={{
                backgroundColor: severityFilter === sev ? DK : 'transparent',
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-neutral-500">
          Showing {filteredIncidents.length} of {incidents.length} security events
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3">
        {filteredIncidents.map((incident) => {
          const isCritical = incident.severity === 'Critical';
          const isWarning = incident.severity === 'Warning';

          return (
            <div
              key={incident.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
                !incident.acknowledged ? 'border-l-4' : ''
              }`}
              style={{
                borderColor: BORDER,
                borderLeftColor: !incident.acknowledged
                  ? isCritical
                    ? '#EF4444'
                    : isWarning
                    ? '#F59E0B'
                    : '#3B82F6'
                  : undefined,
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Severity Pill */}
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {incident.severity}
                    </span>

                    <span className="font-mono text-xs font-bold text-neutral-900">
                      #{incident.id}
                    </span>

                    <span className="text-neutral-300">•</span>

                    <span className="font-bold text-xs" style={{ color: DK }}>
                      {incident.camera}
                    </span>

                    <span className="text-neutral-300">•</span>

                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" />
                      {incident.timestamp}
                    </span>

                    {incident.acknowledged ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Acknowledged
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                        ● Action Required
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-sm text-neutral-900">{incident.type}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {incident.details}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {!incident.acknowledged && (
                    <button
                      onClick={() => handleAcknowledge(incident.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-neutral-300 hover:bg-neutral-100 text-neutral-800 transition-colors min-h-[40px] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Acknowledge</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDispatchGuard(incident)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:brightness-110 transition-all min-h-[40px] flex items-center gap-1.5"
                    style={{ backgroundColor: BTN }}
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Dispatch Guard</span>
                  </button>

                  {onSwitchToPlayback && (
                    <button
                      onClick={onSwitchToPlayback}
                      className="p-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Review recorded NVR footage for this timeframe"
                    >
                      <Video className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleClearAlarm(incident.id)}
                    className="px-2.5 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors min-h-[40px]"
                    title="Dismiss alert"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredIncidents.length === 0 && (
          <div className="py-12 text-center text-neutral-500 bg-white rounded-2xl border border-neutral-200">
            <ShieldCheck className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
            <p className="font-bold text-sm">No incidents reported under this category</p>
            <p className="text-xs text-neutral-400 mt-1">
              All monitored perimeters and camera zones are secure.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
