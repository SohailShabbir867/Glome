import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';

const PROMO_SLIDES = [
  {
    badge: 'Limited Time Offer',
    discount: 'Up to 50% OFF',
    subtitle: 'On Selected Artisan Footwear',
    description:
      'Engineered with premium memory-foam soles and breathable handwoven mesh. Step into comfort with season-end savings.',
    link: '/explore?sale=true',
    image: '/images/promo-banner-items.jpg',
  },
  {
    badge: 'Curated Drop',
    discount: 'Flat 40% OFF',
    subtitle: 'On Organic Cotton Hoodies & Outerwear',
    description:
      'Heavyweight 450 GSM French Terry cotton hoodies. Pre-shrunk for the perfect permanent fit.',
    link: '/explore?category=men',
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
    <section className="py-10 bg-[#faf7f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b3b2c] text-white shadow-2xl border border-[#144e3b]">
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#cf7a3a]/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Content */}
            <div className="lg:col-span-6 z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#d4a373]">
                <Tag className="h-3.5 w-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {slide.discount} <br />
                <span className="italic font-normal text-[#d4a373] text-2xl sm:text-3xl lg:text-4xl">
                  {slide.subtitle}
                </span>
              </h2>

              <p className="max-w-md text-sm sm:text-base text-[#dce7e2]">{slide.description}</p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] text-white px-7 py-3 text-sm font-semibold shadow-lg shadow-black/20 transition-all duration-200 active:scale-98"
                >
                  <span>Claim Savings</span>
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
