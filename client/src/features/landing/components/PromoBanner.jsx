import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';

const PROMO_SLIDES = [
  {
    badge: 'Limited Time Offer',
    discount: 'Up to 50% OFF',
    subtitle: 'On Selected Items',
    description:
      'Elevate your wardrobe with premium season clearance staples before stock runs out.',
    link: '/explore?sale=true',
    image: '/images/promo-banner-items.jpg',
  },
  {
    badge: 'Flash Deal of the Week',
    discount: 'Flat 40% OFF',
    subtitle: 'On New Sneakers & Footwear',
    description: 'Engineered for performance and all-day comfort. Limited quantities available.',
    link: '/explore?category=shoes',
    image: '/images/promo-banner-items.jpg',
  },
];

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? PROMO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === PROMO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = PROMO_SLIDES[currentSlide];

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#041c20] via-[#072d31] to-[#0b4042] text-white shadow-2xl">
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Content */}
            <div className="lg:col-span-6 z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <Tag className="h-3.5 w-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {slide.discount} <br />
                <span className="text-emerald-300 font-semibold text-2xl sm:text-3xl lg:text-4xl">
                  {slide.subtitle}
                </span>
              </h2>

              <p className="max-w-md text-sm sm:text-base text-gray-300">{slide.description}</p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-100 text-[#072d31] px-7 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Slide navigation controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="p-2 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="p-2 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/15 shadow-xl shadow-black/40">
                <img
                  src={slide.image}
                  alt="Special Offer Display"
                  className="w-full h-64 sm:h-80 lg:h-92 object-cover object-center transform hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
