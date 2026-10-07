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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1626] via-[#0b1220] to-[#080d17] text-white pt-8 pb-14 lg:pt-14 lg:pb-20">
      {/* Background ambient lighting effects */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NEW SEASON COLLECTION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Style That <br />
              Fits{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Your Life
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-300 leading-relaxed">
              Discover premium clothing, trendy shoes and stylish accessories — all in one place.
              Crafted for comfort, designed for confidence.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-200 active:scale-98"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200"
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#121c2e]">
                <img
                  src="/images/hero-fashion-rack.jpg"
                  alt="Modern Boutique Showcase"
                  className="w-full h-85 sm:h-110 lg:h-125 object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Editorial Callout Badge on the top-right */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/50 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-300 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Better Style, Bigger Dreams
                </div>

                {/* Floating pill badge on the image */}
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 bg-[#0c1424]/85 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Curated Quality</div>
                    <div className="text-sm font-semibold text-white">100% Handpicked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip (matching mockup feature bar) */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trustFeatures.map((feature) => {
              const IconComponent = ICONS_MAP[feature.icon] || Truck;
              return (
                <div
                  key={feature.id}
                  className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-300">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{feature.description}</p>
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
