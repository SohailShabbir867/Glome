import { useState, useEffect } from 'react';
import {
  Camera,
  Grid,
  LayoutGrid,
  Maximize2,
  Film,
  Server,
  Bell,
  ShieldAlert,
  Plus,
  Radio,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { INITIAL_CAMERAS } from '../data/mockCameras';
import CameraFeedCard from '../components/CameraFeedCard';
import AddCameraModal from '../components/AddCameraModal';
import PlaybackTimelineTab from '../components/PlaybackTimelineTab';
import CameraManagementTab from '../components/CameraManagementTab';
import SecurityAlertsTab from '../components/SecurityAlertsTab';

// RoomBridge Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

export default function SecurityDashboardPage({ initialTab = 'live' }) {
  // Persistence for custom added cameras
  const [cameras, setCameras] = useState(() => {
    try {
      const saved = localStorage.getItem('glome_cameras');
      return saved ? JSON.parse(saved) : INITIAL_CAMERAS;
    } catch {
      return INITIAL_CAMERAS;
    }
  });

  const [activeTab, setActiveTab] = useState(initialTab); // 'live' | 'playback' | 'cameras' | 'alerts'
  const [gridMode, setGridMode] = useState('3x3'); // '3x3' | '2x2' | '1x1' | 'list'
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [soloCameraId, setSoloCameraId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLockdownActive, setIsLockdownActive] = useState(false);
  const [sirenSound, setSirenSound] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist camera state changes
  useEffect(() => {
    try {
      localStorage.setItem('glome_cameras', JSON.stringify(cameras));
    } catch {
      // ignore
    }
  }, [cameras]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleAddCamera = (newCam) => {
    setCameras((prev) => [newCam, ...prev]);
    showToast(`Camera "${newCam.name}" connected via IP ${newCam.ip} successfully.`);
  };

  const handleDeleteCamera = (id) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleSolo = (camId) => {
    if (soloCameraId === camId) {
      setSoloCameraId(null);
    } else {
      setSoloCameraId(camId);
      setGridMode('1x1');
    }
  };

  const handleToggleLockdown = () => {
    if (!isLockdownActive) {
      if (
        window.confirm(
          'EMERGENCY WARNING: Activate Mall-Wide Lockdown Protocol?\n\n• Magnetic security doors will engage locks\n• Fire and security shutters will deploy\n• High-decibel audio beacons will arm'
        )
      ) {
        setIsLockdownActive(true);
        setSirenSound(true);
        showToast('🚨 EMERGENCY PROTOCOL ENGAGED: Glome Mall security perimeter locked down.');
      }
    } else {
      setIsLockdownActive(false);
      setSirenSound(false);
      showToast('Lockdown disengaged. Normal security perimeter restored.');
    }
  };

  const zones = ['ALL', ...Array.from(new Set(cameras.map((c) => c.zone)))];

  const filteredCameras = cameras.filter((cam) => {
    if (soloCameraId && gridMode === '1x1') {
      return cam.id === soloCameraId;
    }
    if (selectedZone === 'ALL') return true;
    return cam.zone === selectedZone;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-2xl animate-fade-in"
          style={{ backgroundColor: DK, border: `1px solid ${ACC}` }}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: ACC }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Emergency Lockdown Active Alert Banner */}
      {isLockdownActive && (
        <div className="p-5 rounded-2xl bg-red-600 text-white shadow-2xl border-2 border-red-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-700/80 rounded-xl">
              <ShieldAlert className="h-6 w-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="text-lg font-black tracking-wide flex items-center gap-2">
                <span>FACILITY LOCKDOWN ACTIVE</span>
                <span className="text-xs bg-red-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  CODE RED
                </span>
              </div>
              <p className="text-xs text-red-100 mt-0.5">
                All electronic access control doors sealed. Local police dispatch notified.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setSirenSound((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-700 hover:bg-red-800 text-white flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              {sirenSound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span>{sirenSound ? 'Mute Siren' : 'Unmute Siren'}</span>
            </button>
            <button
              onClick={handleToggleLockdown}
              className="px-4 py-2 rounded-xl text-xs font-black bg-white text-red-700 hover:bg-neutral-100 shadow-md transition-all min-h-[44px]"
            >
              DISENGAGE LOCKDOWN
            </button>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div
        className="p-6 rounded-3xl border shadow-sm relative overflow-hidden"
        style={{ backgroundColor: CR, borderColor: BORDER }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white inline-flex items-center gap-1.5"
                style={{ backgroundColor: DK }}
              >
                <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
                Security Command Center
              </span>
              <span className="text-xs font-bold text-neutral-500">
                Glome Mall & Logistics NVR Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: DK }}>
              CCTV Surveillance & Access Network
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
              Live IP camera streams, 24-hour optical playback scrubber, AI motion bounding
              boxes, and emergency facility controls.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              style={{ backgroundColor: BTN }}
            >
              <Plus className="h-4 w-4" />
              <span>Connect IP Camera</span>
            </button>

            <button
              onClick={handleToggleLockdown}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                isLockdownActive
                  ? 'bg-red-700 text-white animate-pulse'
                  : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{isLockdownActive ? 'Disengage Lockdown' : 'Facility Lockdown'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-neutral-200">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeTab === 'live' ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
            }`}
            style={{
              backgroundColor: activeTab === 'live' ? DK : 'transparent',
            }}
          >
            <Camera className="h-4 w-4" />
            <span>Live Surveillance Wall ({cameras.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('playback')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeTab === 'playback' ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
            }`}
            style={{
              backgroundColor: activeTab === 'playback' ? DK : 'transparent',
            }}
          >
            <Film className="h-4 w-4" />
            <span>24h NVR Playback Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('cameras')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeTab === 'cameras' ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
            }`}
            style={{
              backgroundColor: activeTab === 'cameras' ? DK : 'transparent',
            }}
          >
            <Server className="h-4 w-4" />
            <span>IP Camera Management</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeTab === 'alerts' ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
            }`}
            style={{
              backgroundColor: activeTab === 'alerts' ? DK : 'transparent',
            }}
          >
            <Bell className="h-4 w-4" />
            <span>Incident Alert Logs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE SURVEILLANCE WALL */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          {/* View Toolbar: Grid Sizing & Zone Filter */}
          <div
            className="p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
            style={{ backgroundColor: CR, borderColor: BORDER }}
          >
            {/* Zone Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-xs font-bold text-neutral-500 mr-1 shrink-0">Zone:</span>
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => {
                    setSelectedZone(zone);
                    if (soloCameraId) setSoloCameraId(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all min-h-[38px] ${
                    selectedZone === zone && !soloCameraId
                      ? 'text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-200'
                  }`}
                  style={{
                    backgroundColor: selectedZone === zone && !soloCameraId ? DK : 'transparent',
                  }}
                >
                  {zone === 'ALL' ? 'All Mall Zones' : zone}
                </button>
              ))}
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <span className="text-xs font-bold text-neutral-500 hidden sm:inline">Layout:</span>
              <div className="flex items-center bg-white rounded-xl p-1 border border-neutral-200">
                <button
                  onClick={() => {
                    setGridMode('3x3');
                    setSoloCameraId(null);
                  }}
                  className={`p-2 rounded-lg text-xs font-bold transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                    gridMode === '3x3' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                  title="3x3 Matrix Grid"
                >
                  <Grid className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setGridMode('2x2');
                    setSoloCameraId(null);
                  }}
                  className={`p-2 rounded-lg text-xs font-bold transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                    gridMode === '2x2' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                  title="2x2 Quad View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setGridMode('1x1');
                    if (!soloCameraId && filteredCameras[0]) {
                      setSoloCameraId(filteredCameras[0].id);
                    }
                  }}
                  className={`p-2 rounded-lg text-xs font-bold transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                    gridMode === '1x1' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                  title="1x1 Solo Focus"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {soloCameraId && (
                <button
                  onClick={() => {
                    setSoloCameraId(null);
                    setGridMode('3x3');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-200 text-neutral-800 hover:bg-neutral-300 min-h-[38px] transition-colors"
                >
                  Exit Solo Focus
                </button>
              )}
            </div>
          </div>

          {/* Camera Feeds Grid */}
          <div
            className={`grid gap-4 transition-all ${
              gridMode === '1x1'
                ? 'grid-cols-1'
                : gridMode === '2x2'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}
          >
            {filteredCameras.map((camera) => (
              <CameraFeedCard
                key={camera.id}
                camera={camera}
                isSolo={soloCameraId === camera.id}
                onToggleSolo={() => handleToggleSolo(camera.id)}
              />
            ))}
          </div>

          {filteredCameras.length === 0 && (
            <div className="py-16 text-center text-neutral-500 bg-white rounded-3xl border border-neutral-200">
              <Camera className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
              <p className="font-bold text-base text-neutral-800">No cameras active in this zone</p>
              <p className="text-xs text-neutral-500 mt-1">
                Select another zone or click "Connect IP Camera" to add a new feed.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NVR PLAYBACK TIMELINE */}
      {activeTab === 'playback' && (
        <PlaybackTimelineTab cameras={cameras} />
      )}

      {/* TAB 3: IP CAMERA NETWORK MANAGEMENT */}
      {activeTab === 'cameras' && (
        <CameraManagementTab
          cameras={cameras}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onDeleteCamera={handleDeleteCamera}
        />
      )}

      {/* TAB 4: REAL-TIME INCIDENT ALERTS */}
      {activeTab === 'alerts' && (
        <SecurityAlertsTab
          onSwitchToPlayback={() => setActiveTab('playback')}
        />
      )}

      {/* Add IP Camera Modal */}
      <AddCameraModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCamera={handleAddCamera}
      />
    </div>
  );
}
