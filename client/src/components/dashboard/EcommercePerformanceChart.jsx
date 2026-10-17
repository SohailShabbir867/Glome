import { useState } from 'react';
import { TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

/* ── RoomBridge Exact Design Tokens ─────────────────────────────────────────── */
const DK = '#012D1D';
const BTN = '#8E4E14';
const ACC = '#FFAB69';
const CR = '#F7F4EF';
const BORDER = '#E8E2D9';

// Multi-timeline dataset for Glome E-Commerce
const TIMELINE_DATA = {
  '7D': [
    { label: 'Mon', fullDate: 'Oct 25, 2026', revenue: 1840, orders: 16 },
    { label: 'Tue', fullDate: 'Oct 26, 2026', revenue: 2420, orders: 22 },
    { label: 'Wed', fullDate: 'Oct 27, 2026', revenue: 3150, orders: 28 },
    { label: 'Thu', fullDate: 'Oct 28, 2026', revenue: 2980, orders: 25 },
    { label: 'Fri', fullDate: 'Oct 29, 2026', revenue: 4120, orders: 36 },
    { label: 'Sat', fullDate: 'Oct 30, 2026', revenue: 3890, orders: 33 },
    { label: 'Sun', fullDate: 'Oct 31, 2026', revenue: 4820, orders: 42 },
  ],
  '30D': [
    { label: 'W1', fullDate: 'Oct 1 - Oct 7', revenue: 14200, orders: 124 },
    { label: 'W2', fullDate: 'Oct 8 - Oct 14', revenue: 18450, orders: 156 },
    { label: 'W3', fullDate: 'Oct 15 - Oct 21', revenue: 16800, orders: 142 },
    { label: 'W4', fullDate: 'Oct 22 - Oct 28', revenue: 22300, orders: 188 },
    { label: 'W5', fullDate: 'Oct 29 - Oct 31', revenue: 12850, orders: 112 },
  ],
  '90D': [
    { label: 'Aug', fullDate: 'August 2026', revenue: 54200, orders: 460 },
    { label: 'Sep', fullDate: 'September 2026', revenue: 68400, orders: 580 },
    { label: 'Oct', fullDate: 'October 2026', revenue: 84600, orders: 722 },
  ],
  '1Y': [
    { label: 'Jan', fullDate: 'January 2026', revenue: 38000, orders: 320 },
    { label: 'Feb', fullDate: 'February 2026', revenue: 42000, orders: 350 },
    { label: 'Mar', fullDate: 'March 2026', revenue: 49000, orders: 410 },
    { label: 'Apr', fullDate: 'April 2026', revenue: 52000, orders: 435 },
    { label: 'May', fullDate: 'May 2026', revenue: 58000, orders: 490 },
    { label: 'Jun', fullDate: 'June 2026', revenue: 63000, orders: 530 },
    { label: 'Jul', fullDate: 'July 2026', revenue: 69000, orders: 575 },
    { label: 'Aug', fullDate: 'August 2026', revenue: 74000, orders: 620 },
    { label: 'Sep', fullDate: 'September 2026', revenue: 82000, orders: 690 },
    { label: 'Oct', fullDate: 'October 2026', revenue: 94000, orders: 780 },
    { label: 'Nov', fullDate: 'Nov (Proj)', revenue: 104000, orders: 860 },
    { label: 'Dec', fullDate: 'Dec (Proj)', revenue: 128000, orders: 1050 },
  ],
};

export default function EcommercePerformanceChart({
  title = 'Sales & Revenue Performance',
  subtitle = 'Gross e-commerce merchandise volume and transaction growth',
  accentColor = ACC,
  gradientId = 'glomeSalesGrad',
}) {
  const [timeframe, setTimeframe] = useState('7D');
  const [metric, setMetric] = useState('revenue'); // 'revenue' | 'orders'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const rawData = TIMELINE_DATA[timeframe] || TIMELINE_DATA['7D'];
  const values = rawData.map((d) => (metric === 'revenue' ? d.revenue : d.orders));
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const first = values[0] || 0;
  const last = values[values.length - 1] || 0;
  const total = values.reduce((a, b) => a + b, 0);

  const trendRaw = first > 0 ? ((last - first) / first) * 100 : last > 0 ? 100 : 0;
  const trend = Number(trendRaw.toFixed(1));
  const isUp = trend >= 0;

  // SVG dimensions
  const W = 620;
  const H = 160;
  const topPad = 16;
  const botPad = 28;
  const chartHeight = H - topPad - botPad;

  // Normalized coordinate points
  const pts = rawData.map((d, i) => {
    const val = metric === 'revenue' ? d.revenue : d.orders;
    const x = rawData.length > 1 ? (i / (rawData.length - 1)) * (W - 30) + 15 : W / 2;
    const y = topPad + (1 - (val - min * 0.5) / (max - min * 0.5 || 1)) * chartHeight;
    return { ...d, val, x, y };
  });

  const linePts = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area = pts.length
    ? `M ${pts[0].x} ${H - botPad} L ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${pts[pts.length - 1].x} ${H - botPad} Z`
    : '';

  return (
    <div
      className="bg-white rounded-2xl border shadow-sm p-5 sm:p-6 transition-all space-y-5"
      style={{ borderColor: BORDER }}
    >
      {/* 1. Header with Title, Metric Switcher, and Trend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              E-Commerce Analytics
            </p>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: isUp ? '#D1FAE5' : '#FEE2E2',
                color: isUp ? '#065F46' : '#991B1B',
              }}
            >
              <TrendingUp className={`h-3 w-3 ${isUp ? '' : 'rotate-180'}`} />
              {isUp ? '+' : ''}
              {trend}%
            </span>
          </div>
          <h3 className="font-serif font-extrabold text-base sm:text-lg mt-0.5" style={{ color: DK }}>
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Metric and Timeframe Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Revenue vs Orders Toggle */}
          <div
            className="flex items-center rounded-xl p-1 border text-xs font-bold"
            style={{ backgroundColor: CR, borderColor: BORDER }}
          >
            <button
              type="button"
              onClick={() => setMetric('revenue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metric === 'revenue'
                  ? 'bg-white shadow-xs font-extrabold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={metric === 'revenue' ? { color: DK } : {}}
            >
              <DollarSign className="h-3.5 w-3.5" style={{ color: BTN }} />
              <span>Revenue</span>
            </button>
            <button
              type="button"
              onClick={() => setMetric('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                metric === 'orders'
                  ? 'bg-white shadow-xs font-extrabold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={metric === 'orders' ? { color: DK } : {}}
            >
              <ShoppingBag className="h-3.5 w-3.5" style={{ color: BTN }} />
              <span>Orders</span>
            </button>
          </div>

          {/* Timeframe selector (7D, 30D, 90D, 1Y) */}
          <div
            className="flex items-center rounded-xl p-1 border text-xs font-bold"
            style={{ backgroundColor: CR, borderColor: BORDER }}
          >
            {['7D', '30D', '90D', '1Y'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTimeframe(t);
                  setHoveredPoint(null);
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeframe === t
                    ? 'bg-white shadow-xs font-extrabold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                style={timeframe === t ? { color: DK } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Canvas */}
      <div
        className="relative rounded-2xl p-4 border transition-all"
        style={{ backgroundColor: CR, borderColor: BORDER }}
      >
        {/* Floating Tooltip when hovering over a node */}
        {hoveredPoint && (
          <div
            className="absolute z-10 -top-2 transform -translate-y-full px-3 py-2 rounded-xl bg-white border shadow-md text-xs pointer-events-none transition-all"
            style={{
              left: `${(hoveredPoint.x / W) * 100}%`,
              borderColor: BORDER,
              transform: 'translate(-50%, -10px)',
            }}
          >
            <p className="font-bold text-gray-500 text-[10px]">{hoveredPoint.fullDate}</p>
            <p className="font-serif font-black text-sm" style={{ color: DK }}>
              {metric === 'revenue'
                ? `$${hoveredPoint.val.toLocaleString()}`
                : `${hoveredPoint.val} Orders`}
            </p>
            <p className="text-[11px] text-gray-500">
              {metric === 'revenue'
                ? `${hoveredPoint.orders} completed orders`
                : `$${hoveredPoint.revenue.toLocaleString()} gross value`}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-36 sm:h-44 overflow-visible"
          role="img"
          aria-label={title}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.32" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal dashed guide lines */}
          {[0.25, 0.5, 0.75].map((r) => (
            <line
              key={r}
              x1="0"
              x2={W}
              y1={topPad + r * chartHeight}
              y2={topPad + r * chartHeight}
              stroke="#E8E2D9"
              strokeDasharray="4 3"
            />
          ))}

          {/* Area fill */}
          <path d={area} fill={`url(#${gradientId})`} />

          {/* Main curve line */}
          <polyline
            points={linePts}
            fill="none"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points with interactive hover */}
          {pts.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer"
            >
              {/* Invisible wider target for touch and hover */}
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
              {/* Visible circle node */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint?.label === p.label ? '6' : '4.5'}
                fill={hoveredPoint?.label === p.label ? '#ffffff' : accentColor}
                stroke={hoveredPoint?.label === p.label ? accentColor : '#ffffff'}
                strokeWidth="2.5"
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between text-[11px] font-bold text-gray-400 px-2 mt-2">
          {pts.map((p, idx) => (
            <span
              key={idx}
              className={`transition-colors cursor-pointer ${
                hoveredPoint?.label === p.label ? 'text-[#012D1D] font-black' : ''
              }`}
              onMouseEnter={() => setHoveredPoint(p)}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Summary Row (Start, Peak, Run-Rate, Total) matching RoomBridge */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div
          className="rounded-xl p-3 border text-center transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <p className="text-[10px] uppercase font-bold text-gray-400">Period Start</p>
          <p className="font-serif font-extrabold text-sm sm:text-base mt-0.5" style={{ color: DK }}>
            {metric === 'revenue' ? `$${first.toLocaleString()}` : `${first} Orders`}
          </p>
        </div>

        <div
          className="rounded-xl p-3 border text-center transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <p className="text-[10px] uppercase font-bold text-gray-400">Peak Volume</p>
          <p className="font-serif font-extrabold text-sm sm:text-base mt-0.5" style={{ color: DK }}>
            {metric === 'revenue' ? `$${max.toLocaleString()}` : `${max} Orders`}
          </p>
        </div>

        <div
          className="rounded-xl p-3 border text-center transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <p className="text-[10px] uppercase font-bold text-gray-400">Current Velocity</p>
          <p className="font-serif font-extrabold text-sm sm:text-base mt-0.5" style={{ color: DK }}>
            {metric === 'revenue' ? `$${last.toLocaleString()}` : `${last} Orders`}
          </p>
        </div>

        <div
          className="rounded-xl p-3 border text-center transition-all"
          style={{ backgroundColor: CR, borderColor: BORDER }}
        >
          <p className="text-[10px] uppercase font-bold text-gray-400">Total Run-Rate</p>
          <p className="font-serif font-extrabold text-sm sm:text-base mt-0.5" style={{ color: DK }}>
            {metric === 'revenue' ? `$${total.toLocaleString()}` : `${total} Orders`}
          </p>
        </div>
      </div>

      {/* 4. Periodic Breakdown Cards with Mini Progress Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {pts.slice(0, 7).map((d, i) => {
          const pct = Math.round((d.val / max) * 100);
          return (
            <div
              key={i}
              className="rounded-xl p-2.5 border text-xs flex flex-col justify-between transition-all hover:bg-white"
              style={{ backgroundColor: CR, borderColor: BORDER }}
            >
              <div className="flex items-center justify-between text-gray-400 text-[11px]">
                <span className="font-semibold">{d.label}</span>
                <span className="font-bold" style={{ color: DK }}>
                  {metric === 'revenue' ? `$${d.val}` : d.val}
                </span>
              </div>
              <div className="w-full bg-gray-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: ACC }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
