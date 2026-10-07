const STATS = [
  { value: '1,200+', label: 'Verified Styles' },
  { value: '40+', label: 'Artisan Workshops' },
  { value: '15,000+', label: 'Happy Customers' },
  { value: '24/7', label: 'Dedicated Concierge' },
];

export default function StatsBar() {
  return (
    <section className="bg-[#06261b] text-white py-14 border-y border-[#144e3b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className={idx > 0 ? 'pt-6 sm:pt-0' : ''}>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#d4a373]">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#dce7e2]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
