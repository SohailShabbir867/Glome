import { useState, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Radio,
  Wifi,
  Crosshair,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CameraFeedCard({
  camera,
  isSolo = false,
  onToggleSolo = () => {},
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [visionMode, setVisionMode] = useState('normal'); // 'normal' | 'night' | 'thermal'
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [showPtz, setShowPtz] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [showAiBoxes, setShowAiBoxes] = useState(true);

  // Live ticking clock with milliseconds for authentic CCTV feel
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const padMs = (n) => String(n).padStart(3, '0');
      const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
        now.getDate()
      )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
        now.getSeconds()
      )}.${padMs(now.getMilliseconds())}`;
      setCurrentTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 80);
    return () => clearInterval(interval);
  }, []);

  // PTZ Control handlers
  const handlePan = (dir) => {
    setPanOffset((prev) => {
      const step = 15;
      if (dir === 'up') return { ...prev, y: Math.max(prev.y - step, -50) };
      if (dir === 'down') return { ...prev, y: Math.min(prev.y + step, 50) };
      if (dir === 'left') return { ...prev, x: Math.max(prev.x - step, -50) };
      if (dir === 'right') return { ...prev, x: Math.min(prev.x + step, 50) };
      return { x: 0, y: 0 };
    });
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => {
      const next = Number((prev + delta).toFixed(1));
      if (next < 1.0) return 1.0;
      if (next > 4.0) return 4.0;
      return next;
    });
  };

  const handleTakeSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 500);
  };

  // Vision Mode Filter styling
  const getFilterStyle = () => {
    if (visionMode === 'night') {
      return 'brightness(110%) contrast(140%) hue-rotate(85deg) saturate(250%)';
    }
    if (visionMode === 'thermal') {
      return 'invert(100%) hue-rotate(180deg) contrast(170%) saturate(300%)';
    }
    return 'none';
  };

  return (
    <div
      className={`relative group rounded-2xl overflow-hidden bg-stone-950 border transition-all shadow-lg flex flex-col ${
        isSolo ? 'w-full h-[620px]' : 'h-[320px] sm:h-[360px]'
      }`}
      style={{ borderColor: 'rgba(255, 171, 105, 0.25)' }}
    >
      {/* 1. Camera Video Feed Area */}
      <div className="relative flex-1 w-full overflow-hidden bg-black select-none">
        {/* Shutter Flash Animation on Snapshot */}
        <AnimatePresence>
          {snapshotTaken && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-40 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Scaled & Panned Simulated Stream Image */}
        <div
          className="w-full h-full transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            filter: getFilterStyle(),
          }}
        >
          <img
            src={camera.image}
            alt={camera.name}
            className="w-full h-full object-cover opacity-90 filter contrast-105 brightness-95"
          />
        </div>

        {/* Phosphor Night Vision Green Scanline Tint Overlay */}
        {visionMode === 'night' && (
          <div className="absolute inset-0 pointer-events-none bg-emerald-950/20 mix-blend-color-dodge z-10" />
        )}

        {/* Ambient CRT Scanline Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)',
          }}
        />

        {/* AI Bounding Box Overlays */}
        {showAiBoxes &&
          camera.aiDetections &&
          camera.aiDetections.map((det, idx) => (
            <div
              key={idx}
              className="absolute z-20 pointer-events-none border-2 border-emerald-400 bg-emerald-500/15 rounded-sm transition-all"
              style={{
                top: det.box.top,
                left: det.box.left,
                width: det.box.width,
                height: det.box.height,
              }}
            >
              <div className="absolute -top-6 left-0 bg-emerald-500 text-black px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight rounded-t shadow-xs flex items-center gap-1">
                <Crosshair className="h-2.5 w-2.5" />
                <span>{det.label} ({det.confidence})</span>
              </div>
            </div>
          ))}

        {/* Top CCTV HUD Overlay */}
        <div className="absolute top-0 left-0 right-0 p-3 z-20 flex items-start justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white font-mono text-[11px]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-red-600/90 text-white font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                LIVE
              </span>
              <span className="font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-xs drop-shadow-md">
                {camera.name}
              </span>
            </div>
            <div className="text-[10px] text-[#FFAB69] font-mono font-semibold">
              {currentTime}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-black/60 border border-white/20 px-1.5 py-0.5 rounded text-[10px] text-white/90">
                {camera.resolution}
              </span>
              <span className="bg-black/60 border border-white/20 px-1.5 py-0.5 rounded text-[10px] text-emerald-400 font-bold">
                {camera.fps} FPS
              </span>
            </div>
            <div className="text-[9px] text-white/60 tracking-wider">
              {camera.bitrate} • IP: {camera.ip}
            </div>
          </div>
        </div>

        {/* Center Crosshair watermark in Solo mode */}
        {isSolo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
            <div className="w-16 h-16 border border-dashed border-[#FFAB69] rounded-full flex items-center justify-center">
              <Crosshair className="h-6 w-6 text-[#FFAB69]" />
            </div>
          </div>
        )}

        {/* PTZ Directional Pad Overlay (When active) */}
        <AnimatePresence>
          {showPtz && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-3 bottom-14 z-30 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/20 space-y-2 shadow-2xl"
            >
              <div className="text-[10px] font-mono font-bold text-[#FFAB69] text-center uppercase tracking-wider">
                PTZ Remote Pan
              </div>
              <div className="grid grid-cols-3 gap-1 w-28 h-28 place-items-center">
                <div />
                <button
                  type="button"
                  onClick={() => handlePan('up')}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFAB69] hover:text-black text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  ▲
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => handlePan('left')}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFAB69] hover:text-black text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={() => handlePan('reset')}
                  title="Reset to center"
                  className="w-8 h-8 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePan('right')}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFAB69] hover:text-black text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  ▶
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => handlePan('down')}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFAB69] hover:text-black text-white text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                >
                  ▼
                </button>
                <div />
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 pt-1 border-t border-white/10 font-mono">
                <span>Zoom: {zoomLevel}x</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleZoom(-0.2)}
                    className="p-1 rounded bg-white/15 hover:bg-white/30 cursor-pointer"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleZoom(0.2)}
                    className="p-1 rounded bg-white/15 hover:bg-white/30 cursor-pointer"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Quick Status & Vision Mode Pill HUD */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/15 text-[10px] font-mono text-white">
          <span className="text-white/60">Vision:</span>
          <button
            type="button"
            onClick={() => setVisionMode('normal')}
            className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
              visionMode === 'normal'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            RGB
          </button>
          <button
            type="button"
            onClick={() => setVisionMode('night')}
            className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
              visionMode === 'night'
                ? 'bg-emerald-500 text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Night Vision (IR)
          </button>
          <button
            type="button"
            onClick={() => setVisionMode('thermal')}
            className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-colors ${
              visionMode === 'thermal'
                ? 'bg-amber-500 text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Thermal
          </button>
        </div>
      </div>

      {/* 2. Bottom Camera Controls Toolbar */}
      <div
        className="px-3.5 py-2.5 bg-[#012D1D] text-white flex items-center justify-between text-xs border-t z-20"
        style={{ borderColor: 'rgba(255, 171, 105, 0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#FFAB69] font-mono font-bold">
            <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span className="truncate max-w-[140px] sm:max-w-none">{camera.zone}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] text-white/60 font-mono">
            <Wifi className="h-3 w-3 text-emerald-400" />
            <span>{camera.pingLatency}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* AI Box Toggle */}
          <button
            type="button"
            onClick={() => setShowAiBoxes(!showAiBoxes)}
            title={showAiBoxes ? 'Hide AI Detection Boxes' : 'Show AI Detection Boxes'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
              showAiBoxes
                ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300'
                : 'border-white/20 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>

          {/* PTZ Joystick Toggle */}
          {camera.ptzSupport && (
            <button
              type="button"
              onClick={() => setShowPtz(!showPtz)}
              title="Toggle PTZ Pan/Tilt/Zoom Remote"
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
                showPtz
                  ? 'bg-[#FFAB69] border-[#FFAB69] text-black font-bold'
                  : 'border-white/20 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Crosshair className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Audio Listen Toggle */}
          <button
            type="button"
            onClick={() => setIsAudioActive(!isAudioActive)}
            title={isAudioActive ? 'Mute Microphone' : 'Listen Live Audio'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
              isAudioActive
                ? 'bg-emerald-500 border-emerald-400 text-black'
                : 'border-white/20 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {isAudioActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Snapshot Button */}
          <button
            type="button"
            onClick={handleTakeSnapshot}
            title="Capture Instant Evidence Snapshot"
            className="p-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>

          {/* Solo / Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => onToggleSolo(camera.id)}
            title={isSolo ? 'Exit Solo Focus' : 'Enlarge Camera to Full Feed'}
            className="p-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            {isSolo ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
