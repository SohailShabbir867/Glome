import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroData } from '../data/storeData';

const ICONS_MAP = {
  Truck,
  ShieldCheck,
  RotateCcw,
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6ee] via-[#f5ede0] to-[#ece1cf] pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-[#e6dcce]">
      {/* Subtle luxury ambient blur */}
      <div className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-[#0b3b2c]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-0 h-80 w-80 rounded-full bg-[#cf7a3a]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, and Trust Points (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-center lg:text-left space-y-6"
          >
            {/* Eyebrow badge with horizontal rule */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#596b63]">
                {heroData.badge}
              </span>
              <span className="h-px w-14 bg-[#c4b5a3]" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold tracking-tight text-[#14211d] leading-[1.08]">
              {heroData.titlePart1} <br />
              {heroData.titlePart2}
              <span className="italic font-normal text-[#0b3b2c] ml-1.5">{heroData.titleAccent}</span>
            </h1>

            {/* Description */}
            <p className="max-w-md mx-auto lg:mx-0 text-sm sm:text-base text-[#596b63] leading-relaxed">
              {heroData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#0b3b2c]/20 transition-all"
                >
                  <span>{heroData.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#14211d] bg-transparent hover:bg-[#14211d]/5 px-7 py-3 text-xs sm:text-sm font-semibold text-[#14211d] transition-colors"
                >
                  {heroData.secondaryCta}
                </Link>
              </motion.div>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-[#e2d6c6] grid grid-cols-3 gap-2 sm:gap-4">
              {heroData.trustPoints.map((point) => {
                const Icon = ICONS_MAP[point.icon] || Truck;
                return (
                  <div
                    key={point.title}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#0b3b2c]/10 text-[#0b3b2c] flex items-center justify-center mb-2 group-hover:bg-[#0b3b2c] group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#14211d]">
                      {point.title}
                    </span>
                    <span className="text-[10px] text-[#708077] leading-tight mt-0.5">
                      {point.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Center Column: Model Photography (4 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              {/* Main Model Card */}
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-xl shadow-black/10 border-4 border-white/80 bg-stone-200">
                <img
                  src={heroData.modelImage}
                  alt="Glome Collection Model"
                  className="h-full w-full object-cover object-top hover:scale-104 transition-transform duration-700"
                />

                {/* Subtle gradient overlay at bottom of model card */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Glass Tag */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md px-3.5 py-2.5 shadow-lg border border-white/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#708077] font-semibold">
                      Featured Suit
                    </span>
                    <span className="text-xs font-bold text-[#14211d]">
                      Tailored Navy Ensemble
                    </span>
                  </div>
                  <span className="rounded-full bg-[#0b3b2c] px-2.5 py-1 text-[11px] font-bold text-white">
                    $189
                  </span>
                </div>
              </div>

              {/* Floating Artistic Script Text - Positioned at top-left of image so it doesn't collide with side cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-3.5 -left-3 sm:-left-5 font-serif italic text-sm sm:text-base text-[#0b3b2c] font-normal tracking-wide bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-sm border border-stone-200/80 select-none"
                style={{ transform: 'rotate(-3deg)' }}
              >
                Better Style, Bigger Dreams
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 3 Category Showcase Cards (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-3.5"
          >
            {heroData.sideCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <Link
                  to={card.link}
                  className="group relative block overflow-hidden rounded-2xl bg-white p-2 shadow-sm hover:shadow-md transition-shadow border border-white/80"
                >
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Badge Button */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c] px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm group-hover:bg-[#124e3b] transition-colors">
                    <span>{card.title}</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
