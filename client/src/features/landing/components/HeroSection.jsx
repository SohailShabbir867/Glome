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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf8f2] via-[#f7f0e4] to-[#ede3d4] pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-[#e8ded0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headline, CTAs, and Trust Points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 z-10 text-center lg:text-left space-y-6"
          >
            {/* Eyebrow with horizontal line */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#596b63]">
                {heroData.badge}
              </span>
              <span className="h-px w-16 bg-[#c4b5a3]" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#14211d] leading-[1.12]">
              {heroData.titlePart1} <br />
              {heroData.titlePart2}
              <span className="italic font-normal text-[#0b3b2c]">{heroData.titleAccent}</span>
            </h1>

            {/* Description */}
            <p className="max-w-md mx-auto lg:mx-0 text-sm sm:text-base text-[#596b63] leading-relaxed">
              {heroData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3b2c] hover:bg-[#124e3b] px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-black/10 transition-colors"
                >
                  <span>{heroData.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#14211d] bg-transparent hover:bg-[#14211d]/5 px-7 py-3 text-xs sm:text-sm font-semibold text-[#14211d] transition-colors"
                >
                  {heroData.secondaryCta}
                </Link>
              </motion.div>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-[#e2d6c6] grid grid-cols-3 gap-3">
              {heroData.trustPoints.map((point) => {
                const Icon = ICONS_MAP[point.icon] || Truck;
                return (
                  <div
                    key={point.title}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left"
                  >
                    <div className="text-[#0b3b2c] mb-1.5">
                      <Icon className="h-4 sm:h-5 w-4 sm:w-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#14211d]">
                      {point.title}
                    </span>
                    <span className="text-[10px] text-[#708077] leading-tight">
                      {point.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Center Column: Model Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-2xl shadow-black/10 border-4 border-white/60">
                <img
                  src={heroData.modelImage}
                  alt="Modern Fashion Model"
                  className="h-full w-full object-cover object-top hover:scale-104 transition-transform duration-700"
                />
              </div>

              {/* Floating Cursive Script Text */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-3 -right-4 sm:-right-8 font-serif italic text-base sm:text-xl text-[#0b3b2c] font-normal tracking-wide drop-shadow-sm select-none"
                style={{ transform: 'rotate(-4deg)' }}
              >
                Better <br /> Style <br /> Bigger <br /> Dreams
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 3 Category Showcase Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-3.5"
          >
            {heroData.sideCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  to={card.link}
                  className="group relative block overflow-hidden rounded-2xl bg-white p-2 shadow-md shadow-black/5 border border-white/60"
                >
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Badge Button */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-[#0b3b2c] px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm group-hover:bg-[#124e3b] transition-colors">
                    <span>{card.title}</span>
                    <ArrowRight className="h-3 w-3" />
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
