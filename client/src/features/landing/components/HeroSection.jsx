import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, Sparkles } from 'lucide-react';
import { trustFeatures } from '../data/mockData';

const ICONS_MAP = {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b3b2c] text-white pt-8 pb-14 lg:pt-14 lg:pb-20">
      {/* Background radial gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#124e3b]/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-[#cf7a3a]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#d4a373] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE GLOME COLLECTION • 2026</span>
            </div>

            {/* Main Headline (Editorial Serif like RoomBridge) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.18] text-white">
              We built Glome because you deserve{' '}
              <span className="italic font-normal text-[#d4a373]">better style.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-[#dce7e2] leading-relaxed">
              Finding high-quality, durable shoes and modern clothing shouldn't be complicated.
              Curated for comfort, designed for everyday elegance, and priced fairly without retail
              markups.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 active:scale-98"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200"
              >
                Our Story & Ethics
              </Link>
            </div>
          </div>

          {/* Right Column: RoomBridge-style multi-card photo montage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 max-w-lg mx-auto lg:max-w-none">
              {/* Card 1: Main clothes rack photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/15 h-48 sm:h-56 group bg-[#06261b]">
                <img
                  src="/images/hero-fashion-rack.jpg"
                  alt="Curated Boutique Outerwear"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                  Modern Outerwear
                </span>
              </div>

              {/* Card 2: Runner Sneakers */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/15 h-48 sm:h-56 group bg-white p-3 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
                  alt="Performance Sneakers"
                  className="h-32 sm:h-38 w-full object-contain group-hover:scale-108 transition-transform duration-500"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14211d]">Everyday Runners</span>
                  <span className="text-[#cf7a3a] font-bold">$79.99</span>
                </div>
              </div>

              {/* Card 3: RoomBridge signature terracotta feature card */}
              <div className="rounded-2xl p-5 bg-[#cf7a3a] text-white shadow-xl flex flex-col justify-between h-44 sm:h-48">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                    Verified Fit
                  </span>
                  <h3 className="font-serif text-lg font-bold mt-1 text-white leading-snug">
                    Step Into Better Style
                  </h3>
                  <p className="text-xs text-white/90 mt-1.5 leading-relaxed">
                    Over 15,000 satisfied customers across the country.
                  </p>
                </div>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white underline underline-offset-4 hover:text-white/80"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Card 4: Women's Dress cutout */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/15 h-44 sm:h-48 group bg-white p-2.5 flex flex-col justify-between">
                <img
                  src="/images/category-womens-dress.jpg"
                  alt="Pleated Maxi Dress"
                  className="h-28 sm:h-32 w-full object-contain group-hover:scale-108 transition-transform duration-500"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#14211d]">Pleated Maxi Dress</span>
                  <span className="text-[#0b3b2c] font-bold">New In</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-14 pt-10 border-t border-[#144e3b]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trustFeatures.map((feature) => {
              const IconComponent = ICONS_MAP[feature.icon] || Truck;
              return (
                <div
                  key={feature.id}
                  className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/15 text-[#d4a373] group-hover:scale-110 group-hover:border-[#cf7a3a]/40 transition-all duration-300">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#d4a373] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#dce7e2] mt-0.5">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
