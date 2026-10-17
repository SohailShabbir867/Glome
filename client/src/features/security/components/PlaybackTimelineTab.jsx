import { useState } from 'react';
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Calendar,
  Download,
  Film,
  CheckCircle2,
} from 'lucide-react';
import { PLAYBACK_RECORDINGS } from '../data/mockCameras';

// RoomBridge Design Tokens
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

export default function PlaybackTimelineTab({ cameras }) {
  const [selectedCameraId, setSelectedCameraId] = useState(cameras[0]?.id || 'cam-01');
  const [selectedDate, setSelectedDate] = useState('2026-10-17');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [timePosition, setTimePosition] = useState(480); // in minutes (08:00 AM)
  const [toastMessage, setToastMessage] = useState('');

  const selectedCamera = cameras.find((c) => c.id === selectedCameraId) || cameras[0];

  const formatMinutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  const handleExportClip = (title) => {
    setToastMessage(`Exporting 1080p forensic video clip: "${title}"... Download ready.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div
          className="p-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-md"
          style={{ backgroundColor: DK, border: `1px solid ${ACC}` }}
        >
          <CheckCircle2 className="h-4 w-4" style={{ color: ACC }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Filter & Camera Selector Bar */}
      <div
        className="p-4 sm:p-5 rounded-2xl bg-white border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ borderColor: BORDER }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Select Camera Channel
            </label>
            <select
              value={selectedCameraId}
              onChange={(e) => setSelectedCameraId(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-900 bg-white min-h-[44px] focus:outline-none focus:border-[#012D1D]"
            >
              {cameras.map((cam) => (
                <option key={cam.id} value={cam.id}>
                  {cam.name} ({cam.zone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              Playback Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-xl border border-gray-200 px-3.5 py-2 pl-9 text-xs font-mono font-bold text-gray-900 bg-white min-h-[44px] focus:outline-none focus:border-[#012D1D]"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Current Scrub:</span>
          <span className="font-mono text-xs font-extrabold px-3 py-1.5 rounded-xl bg-stone-100 text-gray-900">
            {formatMinutesToTime(timePosition)}
          </span>
        </div>
      </div>

      {/* Big Video Playback Simulation Canvas */}
      <div
        className="rounded-3xl overflow-hidden bg-black border shadow-2xl relative flex flex-col"
        style={{ borderColor: 'rgba(255, 171, 105, 0.3)' }}
      >
        <div className="relative w-full h-[400px] sm:h-[480px] bg-stone-950 overflow-hidden flex items-center justify-center select-none">
          {/* Main Simulated Stream */}
          <img
            src={selectedCamera?.image || '/images/hero-fashion-rack.jpg'}
            alt="Playback Feed"
            className="w-full h-full object-cover opacity-85 filter contrast-105"
          />

          {/* CRT scanlines texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)',
            }}
          />

          {/* HUD Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-white font-mono text-xs z-10">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-blue-600/90 text-white font-bold text-[10px] tracking-wider">
                DVR PLAYBACK ARCHIVE
              </span>
              <div className="font-bold text-white text-sm drop-shadow">{selectedCamera?.name}</div>
              <div className="text-[11px] text-[#FFAB69]">
                Timestamp: {selectedDate} {formatMinutesToTime(timePosition)} • {playbackSpeed}x Speed
              </div>
            </div>

            <div className="bg-black/60 px-3 py-1 rounded-xl border border-white/20 text-right">
              <div className="text-emerald-400 font-bold text-xs">H.265 NVR Master</div>
              <div className="text-[10px] text-white/60">Bitrate: 8.2 Mbps</div>
            </div>
          </div>

          {/* Watermark Play Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center z-10">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="h-18 w-18 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: DK, border: `2px solid ${ACC}` }}
              >
                <Play className="h-8 w-8 ml-1" style={{ color: ACC }} />
              </button>
            </div>
          )}
        </div>

        {/* 24-Hour Timeline Scrubber Bar */}
        <div
          className="p-4 sm:p-5 text-white border-t space-y-3"
          style={{ backgroundColor: '#021e14', borderColor: 'rgba(255, 171, 105, 0.2)' }}
        >
          {/* Timeline Visual Track with Event Highlights */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>00:00 (Midnight)</span>
              <span>06:00 AM</span>
              <span>12:00 PM (Noon)</span>
              <span>18:00 (6 PM)</span>
              <span>23:59</span>
            </div>

            <div className="relative w-full h-8 bg-black/60 rounded-xl overflow-hidden border border-white/10 flex items-center">
              {/* Green Continuous Recording Block */}
              <div className="absolute inset-y-0 left-0 right-0 bg-emerald-600/30" />

              {/* Event Marker Ticks (Yellow for motion, Red for alerts) */}
              <div
                className="absolute inset-y-0 bg-amber-400/80 w-3"
                style={{ left: '25%' }}
                title="Motion Detected: Staff Arrival (06:00)"
              />
              <div
                className="absolute inset-y-0 bg-rose-500 w-4 animate-pulse"
                style={{ left: '65%' }}
                title="Security Alert: Vault Door (15:30)"
              />
              <div
                className="absolute inset-y-0 bg-amber-400/80 w-4"
                style={{ left: '80%' }}
                title="Motion Detected: Loading Dock (19:15)"
              />

              {/* Current Time Playhead Scrubber */}
              <input
                type="range"
                min="0"
                max="1439"
                value={timePosition}
                onChange={(e) => setTimePosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Needle Indicator */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#FFAB69] shadow-lg pointer-events-none z-10"
                style={{ left: `${(timePosition / 1439) * 100}%` }}
              >
                <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-[#FFAB69] rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* Timeline Playback Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimePosition((prev) => Math.max(prev - 30, 0))}
                title="Jump Back 30 mins"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <Rewind className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md min-h-[38px]"
                style={{ backgroundColor: ACC, color: DK }}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTimePosition((prev) => Math.min(prev + 30, 1439))}
                title="Jump Forward 30 mins"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <FastForward className="h-4 w-4" />
              </button>
            </div>

            {/* Speed Multiplier */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/15 text-xs font-mono">
              <span className="text-white/60 px-2">Speed:</span>
              {[0.5, 1, 2, 4, 8].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                    playbackSpeed === spd ? 'bg-[#FFAB69] text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Evidence Clip Export */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExportClip('Timeline Section')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all cursor-pointer min-h-[38px]"
                style={{ backgroundColor: BTN }}
              >
                <Download className="h-3.5 w-3.5" style={{ color: ACC }} />
                <span>Export Clip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recorded Event Clips Table */}
      <div
        className="rounded-3xl bg-white p-6 border shadow-sm space-y-4"
        style={{ borderColor: BORDER }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold" style={{ color: DK }}>
              Archived NVR Incident Recordings
            </h3>
            <p className="text-xs text-gray-500">
              Download indexed evidence clips matching AI motion trips, door sensor triggers, and cash audits.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            4 Indexed Clips Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className="border-b text-gray-500 uppercase tracking-wider font-bold"
                style={{ backgroundColor: CR, borderColor: BORDER }}
              >
                <th className="py-3.5 px-4">Event Clip Title</th>
                <th className="py-3.5 px-4">Camera Channel</th>
                <th className="py-3.5 px-4">Recorded Window</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4">Event Tags</th>
                <th className="py-3.5 px-4 text-right">Download Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PLAYBACK_RECORDINGS.map((rec) => (
                <tr key={rec.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Film className="h-4 w-4" style={{ color: BTN }} />
                      <span className="font-bold text-gray-900">{rec.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono">{rec.camera}</td>
                  <td className="py-3.5 px-4 font-bold" style={{ color: DK }}>
                    {rec.timeRange} ({rec.duration})
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono">{rec.size}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1">
                      {rec.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-gray-700 text-[10px] font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleExportClip(rec.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
                      style={{ borderColor: BORDER, color: DK }}
                    >
                      <Download className="h-3.5 w-3.5 text-gray-500" />
                      <span>MP4 Clip</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
