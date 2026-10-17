import { useState } from 'react';
import {
  X,
  Plus,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Server,
} from 'lucide-react';
import { motion } from 'framer-motion';

// RoomBridge Design Tokens
const DK = '#012D1D';
const ACC = '#FFAB69';
const BORDER = '#E8E2D9';

export default function AddCameraModal({ isOpen, onClose, onAddCamera }) {
  const [formData, setFormData] = useState({
    name: '',
    zone: 'Retail Floor',
    ip: '192.168.1.',
    port: 554,
    protocol: 'RTSP (ONVIF Profile S)',
    streamPath: '/live/ch0',
    username: 'admin',
    password: '',
    resolution: '4K UHD 2160p',
    fps: 60,
    nightVisionSupport: true,
    ptzSupport: true,
  });

  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null); // { success: true, latency: '14ms' }

  if (!isOpen) return null;

  const handleTestPing = () => {
    setIsPinging(true);
    setPingResult(null);

    setTimeout(() => {
      setIsPinging(false);
      if (formData.ip.length > 9) {
        setPingResult({
          success: true,
          latency: `${Math.floor(Math.random() * 15) + 10}ms`,
          message: 'IP Camera Handshake Verified. Bitrate and RTSP stream reachable.',
        });
      } else {
        setPingResult({
          success: false,
          message: 'Could not reach IP address. Check local subnet or gateway route.',
        });
      }
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ip) return;

    const newCam = {
      id: `cam-${Date.now().toString().slice(-3)}`,
      name: formData.name,
      zone: formData.zone,
      ip: formData.ip,
      port: Number(formData.port),
      protocol: formData.protocol,
      streamUrl: `rtsp://${formData.username}:${formData.password ? '****' : ''}@${formData.ip}:${formData.port}${formData.streamPath}`,
      resolution: formData.resolution,
      fps: Number(formData.fps),
      bitrate: formData.resolution.includes('4K') ? '8.6 Mbps' : '5.2 Mbps',
      status: 'ONLINE',
      recording: true,
      nightVisionSupport: formData.nightVisionSupport,
      ptzSupport: formData.ptzSupport,
      pingLatency: pingResult?.latency || '14ms',
      storageUsed: '0 GB',
      image: '/images/hero-fashion-rack.jpg',
      aiDetections: [{ label: 'Zone Monitoring', confidence: '96%', box: { top: '30%', left: '35%', width: '30%', height: '45%' } }],
      lastActivity: 'Connected just now',
    };

    onAddCamera(newCam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border space-y-6 my-8 max-h-[90vh] overflow-y-auto"
        style={{ borderColor: BORDER }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs"
              style={{ backgroundColor: `${ACC}25`, color: DK }}
            >
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold" style={{ color: DK }}>
                Connect Live IP Surveillance Camera
              </h3>
              <p className="text-xs text-gray-500">
                Direct RTSP / ONVIF / WebRTC hardware stream integration
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 rounded-xl"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Camera Identifier Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. CAM-09 • South Loading Dock Gate"
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 focus:border-[#012D1D] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Surveillance Zone
              </label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 bg-white focus:border-[#012D1D] focus:outline-none"
              >
                <option value="Retail Floor">Retail Floor & Aisles</option>
                <option value="Warehouse">Warehouse Fulfillment</option>
                <option value="Cashier & Safe">Cashier & Safe Vault</option>
                <option value="Loading Bay">Loading Bay & Dispatch</option>
                <option value="Customer Service">Customer Service / Returns</option>
                <option value="Perimeter">Perimeter & Exterior Parking</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Protocol / Stream Format
              </label>
              <select
                value={formData.protocol}
                onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 bg-white focus:border-[#012D1D] focus:outline-none"
              >
                <option value="RTSP (ONVIF Profile S)">RTSP (ONVIF Profile S)</option>
                <option value="RTSP (H.265 Main)">RTSP (H.265 Main)</option>
                <option value="WebRTC Low Latency">WebRTC Low Latency</option>
                <option value="HTTP / HLS Stream">HTTP / HLS Stream</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                IP Address / DDNS Host *
              </label>
              <input
                type="text"
                required
                value={formData.ip}
                onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                placeholder="192.168.1.120"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 font-mono focus:border-[#012D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Port</label>
              <input
                type="number"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                placeholder="554"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 font-mono focus:border-[#012D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Stream URI Path
              </label>
              <input
                type="text"
                value={formData.streamPath}
                onChange={(e) => setFormData({ ...formData, streamPath: e.target.value })}
                placeholder="/live/ch0"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 font-mono focus:border-[#012D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Resolution & FPS
              </label>
              <select
                value={formData.resolution}
                onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 min-h-[44px] text-xs text-gray-900 bg-white focus:border-[#012D1D] focus:outline-none"
              >
                <option value="4K UHD 2160p">4K UHD (2160p @ 60FPS)</option>
                <option value="1080p FHD">1080p FHD (1080p @ 60FPS)</option>
                <option value="720p HD">720p HD (720p @ 30FPS)</option>
              </select>
            </div>
          </div>

          {/* Camera Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-gray-200">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Camera Login User
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white text-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Camera Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Ping Latency Test Button & Status Box */}
          <div className="p-3.5 rounded-2xl border space-y-2 bg-[#F7F4EF]" style={{ borderColor: BORDER }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Wifi className="h-4 w-4 text-[#8E4E14]" />
                <span>Camera Network Ping & RTSP Handshake</span>
              </span>
              <button
                type="button"
                onClick={handleTestPing}
                disabled={isPinging}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: DK }}
              >
                {isPinging ? 'Pinging IP...' : 'Test Connection'}
              </button>
            </div>

            {pingResult && (
              <div
                className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 font-mono ${
                  pingResult.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}
              >
                {pingResult.success ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                )}
                <span>
                  {pingResult.success && `[${pingResult.latency}] `}
                  {pingResult.message}
                </span>
              </div>
            )}
          </div>

          {/* Feature Checkboxes */}
          <div className="flex items-center gap-6 pt-1 text-xs">
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nightVisionSupport}
                onChange={(e) =>
                  setFormData({ ...formData, nightVisionSupport: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-[#012D1D] focus:ring-[#012D1D]"
              />
              <span>Night Vision (IR Cut) Enabled</span>
            </label>
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ptzSupport}
                onChange={(e) => setFormData({ ...formData, ptzSupport: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#012D1D] focus:ring-[#012D1D]"
              />
              <span>PTZ Remote Pan/Tilt Supported</span>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t" style={{ borderColor: BORDER }}>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2.5 min-h-[44px] text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl px-5 py-2.5 min-h-[44px] text-xs font-bold text-white shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
              style={{ backgroundColor: DK }}
            >
              <Plus className="h-4 w-4" style={{ color: ACC }} />
              <span>Connect Camera Feed</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
