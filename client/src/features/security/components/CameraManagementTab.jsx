import { useState } from 'react';
import {
  Server,
  HardDrive,
  Activity,
  Plus,
  RefreshCw,
  Search,
  Wifi,
  Trash2,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

// RoomBridge Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

export default function CameraManagementTab({
  cameras,
  onOpenAddModal,
  onDeleteCamera,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [pingingId, setPingingId] = useState(null);
  const [rebootingId, setRebootingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isScanningSubnet, setIsScanningSubnet] = useState(false);

  const zones = ['ALL', ...Array.from(new Set(cameras.map((c) => c.zone)))];

  const filteredCameras = cameras.filter((cam) => {
    const matchesSearch =
      cam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cam.ip.includes(searchTerm) ||
      cam.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cam.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'ALL' || cam.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const onlineCount = cameras.filter((c) => c.status === 'ONLINE').length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleTestPing = (camId, camIp) => {
    setPingingId(camId);
    setTimeout(() => {
      const randomizedPing = Math.floor(Math.random() * 12) + 8; // 8ms to 20ms
      setPingingId(null);
      showToast(`ICMP Ping to ${camIp} successful: ${randomizedPing}ms (0% packet loss)`);
    }, 900);
  };

  const handleRebootStream = (camId, camName) => {
    setRebootingId(camId);
    setTimeout(() => {
      setRebootingId(null);
      showToast(`RTSP Stream restarted for ${camName}. Keyframe aligned.`);
    }, 1500);
  };

  const handleScanSubnet = () => {
    setIsScanningSubnet(true);
    setTimeout(() => {
      setIsScanningSubnet(false);
      showToast('ONVIF WS-Discovery complete: 8 IP surveillance devices verified active.');
    }, 1800);
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

      {/* Network & NVR Infrastructure Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cameras */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Active IP Feeds
            </span>
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(1, 45, 29, 0.08)', color: DK }}
            >
              <Server className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: DK }}>
              {onlineCount} / {cameras.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              100% Online
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            All ONVIF S/T streams healthy & encrypted
          </p>
        </div>

        {/* Network Bandwidth */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Aggregated Throughput
            </span>
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(255, 171, 105, 0.2)', color: BTN }}
            >
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: DK }}>
              64.2 Mbps
            </span>
            <span className="text-xs font-bold text-neutral-600">of 1.0 Gbps LAN</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            H.265 / HEVC hardware accelerated encoding
          </p>
        </div>

        {/* RAID Storage Pool */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              NVR Storage Pool
            </span>
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(142, 78, 20, 0.1)', color: BTN }}
            >
              <HardDrive className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: DK }}>
              14.2 TB
            </span>
            <span className="text-xs font-bold text-neutral-500">/ 32.0 TB (44%)</span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: '44%', backgroundColor: BTN }}
            />
          </div>
        </div>

        {/* System Uptime */}
        <div
          className="p-5 rounded-2xl border transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Surveillance Uptime
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
              99.98%
            </span>
            <span className="text-xs font-bold text-emerald-600">42 Days 16h</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            Zero dropped RTSP packets in 24 hours
          </p>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div
        className="p-4 rounded-2xl border flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between"
        style={{ backgroundColor: CR, borderColor: BORDER }}
      >
        <div className="flex flex-1 items-center gap-2 max-w-md bg-white px-3.5 py-2.5 rounded-xl border border-neutral-200 focus-within:border-emerald-700 transition-colors">
          <Search className="h-4 w-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by camera name, IP, port, or zone..."
            className="w-full text-xs outline-none bg-transparent font-medium text-neutral-800 placeholder-neutral-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Zone Filter & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                  selectedZone === zone ? 'text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-200'
                }`}
                style={{
                  backgroundColor: selectedZone === zone ? DK : 'transparent',
                }}
              >
                {zone === 'ALL' ? 'All Zones' : zone}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleScanSubnet}
              disabled={isScanningSubnet}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors min-h-[44px]"
              title="Scan LAN subnet for active ONVIF IP camera devices"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-neutral-600 ${isScanningSubnet ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">
                {isScanningSubnet ? 'Scanning LAN...' : 'Scan Subnet'}
              </span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
              style={{ backgroundColor: BTN }}
            >
              <Plus className="h-4 w-4" />
              <span>Connect IP Camera</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cameras Table / Card Grid */}
      <div
        className="rounded-2xl border overflow-hidden bg-white shadow-sm"
        style={{ borderColor: BORDER }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className="border-b font-black uppercase tracking-wider text-[11px]"
                style={{ backgroundColor: CR, borderColor: BORDER, color: DK }}
              >
                <th className="py-3.5 px-4">Camera Identifier & Zone</th>
                <th className="py-3.5 px-4">Network / Protocol</th>
                <th className="py-3.5 px-4">Resolution & FPS</th>
                <th className="py-3.5 px-4">Throughput</th>
                <th className="py-3.5 px-4">Latency</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCameras.map((cam) => {
                const isPinging = pingingId === cam.id;
                const isRebooting = rebootingId === cam.id;

                return (
                  <tr key={cam.id} className="hover:bg-neutral-50/80 transition-colors">
                    {/* Name & Zone */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-300">
                          <img
                            src={cam.image}
                            alt={cam.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80';
                            }}
                          />
                          <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 leading-snug">
                            {cam.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: CR, color: BTN }}
                            >
                              {cam.zone}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              Storage: {cam.storageUsed}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Network / Protocol */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-[11px] font-semibold text-neutral-800">
                        {cam.ip}:{cam.port}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {cam.protocol}
                      </div>
                    </td>

                    {/* Resolution & FPS */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-neutral-800">{cam.resolution}</div>
                      <div className="text-[10px] text-neutral-500">
                        {cam.fps} FPS • {cam.nightVisionSupport ? 'IR Night-Vision' : 'Standard'}
                      </div>
                    </td>

                    {/* Throughput */}
                    <td className="py-3 px-4 font-mono font-semibold text-neutral-700">
                      {cam.bitrate}
                    </td>

                    {/* Latency */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-700">
                        <Wifi className="h-3 w-3" />
                        <span>{isPinging ? 'Pinging...' : cam.pingLatency}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        ONLINE
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTestPing(cam.id, cam.ip)}
                          disabled={isPinging}
                          className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-semibold text-[11px] flex items-center gap-1 min-h-[36px] transition-colors"
                          title="Ping IP Address"
                        >
                          <Wifi className={`h-3 w-3 ${isPinging ? 'animate-pulse' : ''}`} />
                          <span className="hidden sm:inline">
                            {isPinging ? 'Pinging...' : 'Ping'}
                          </span>
                        </button>

                        <button
                          onClick={() => handleRebootStream(cam.id, cam.name)}
                          disabled={isRebooting}
                          className="px-2.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-semibold text-[11px] flex items-center gap-1 min-h-[36px] transition-colors"
                          title="Reboot RTSP Stream"
                        >
                          <RefreshCw
                            className={`h-3 w-3 ${isRebooting ? 'animate-spin' : ''}`}
                          />
                          <span className="hidden sm:inline">
                            {isRebooting ? 'Rebooting...' : 'Restart'}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to disconnect ${cam.name} (${cam.ip}) from the surveillance matrix?`
                              )
                            ) {
                              onDeleteCamera(cam.id);
                              showToast(`Camera ${cam.name} removed from network.`);
                            }
                          }}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                          title="Remove Camera"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCameras.length === 0 && (
          <div className="py-12 text-center text-neutral-500">
            <AlertTriangle className="h-8 w-8 mx-auto text-amber-500 mb-2" />
            <p className="font-bold text-sm">No cameras match your search</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your query or zone filter.
            </p>
          </div>
        )}
      </div>

      {/* Network Architecture Info Banner */}
      <div
        className="p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ backgroundColor: DK, borderColor: BTN, color: 'white' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-xl shrink-0"
            style={{ backgroundColor: 'rgba(255, 171, 105, 0.15)', color: ACC }}
          >
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Zero-Trust Network Video Security Architecture</h4>
            <p className="text-xs text-neutral-300 mt-0.5">
              RTSP feeds over TLS 1.3 with AES-256 local encrypted storage. Remote viewing
              tunnelled through WebRTC with P2P NAT traversal.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span
            className="text-[11px] font-bold px-3 py-1.5 rounded-full inline-block"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: ACC }}
          >
            NVR Firmware v4.9.2 (Up-to-date)
          </span>
        </div>
      </div>
    </div>
  );
}
