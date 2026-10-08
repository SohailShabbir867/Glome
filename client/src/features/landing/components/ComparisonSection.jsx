import { Link } from 'react-router-dom';
import { AlertCircle, TrendingDown, Layers, Globe2, CheckCircle2, ArrowRight } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: TrendingDown,
    title: 'High Markup Retail',
    description:
      'Traditional department stores mark up clothing up to 800% simply to cover excessive store overhead and distributor middlemen.',
  },
  {
    icon: Layers,
    title: 'Misleading Sizes & Fits',
    description:
      'Inconsistent size charts and deceptive fabrics cause shoe blisters and ill-fitting apparel that end up unused in closets.',
  },
  {
    icon: AlertCircle,
    title: 'Disposable Fast Fashion',
    description:
      'Flimsy stitching and synthetic blends designed to pill, shrink, or lose shape after just a couple of standard washes.',
  },
  {
    icon: Globe2,
    title: 'Opaque Supply Chains',
    description:
      'Lack of traceability on factory working conditions, ethical wages, and toxic runoff from harsh synthetic dyes.',
  },
];

const GLOME_ADVANTAGES = [
  '100% Certified Organic Linens & Hand-Stitched Leathers',
  'True-To-Fit Guarantee with Free Size Swaps at Your Door',
  'Artisan Direct Pricing — Save up to 50% Compared to Luxury Labels',
  'Rigorous 50-Wash Durability & Color-Retention Benchmarks',
  'Full Ethical Traceability from Loom to Your Wardrobe',
];

export default function ComparisonSection() {
  return (
    <section className="bg-[#faf7f2] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-[#cf7a3a]">
            The Glome Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14211d] mt-2">
            The Problems We Solve
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#596b63]">
            How we bridge the gap between throwaway fast fashion and overpriced department store
            labels.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 4 Pain Point Cards */}
          <div className="lg:col-span-7 space-y-4">
            {PAIN_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-2xl border border-[#eedecf] bg-white p-5 sm:p-6 shadow-sm hover:border-[#cf7a3a]/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#fdf5ee] text-[#cf7a3a] shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#14211d]">
                        {point.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#596b63] mt-1 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: The Glome Way (Dark Forest Card) */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-3xl bg-[#0b3b2c] text-white p-7 sm:p-9 shadow-2xl flex flex-col justify-between border border-[#144e3b]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4a373]">
                  Our Commitment
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                  The Glome Way
                </h3>
                <p className="text-xs sm:text-sm text-[#dce7e2] mt-2 leading-relaxed">
                  We rebuild everyday fashion from the ground up — prioritizing longevity, artisanal
                  comfort, and zero retail markup.
                </p>

                <div className="mt-8 space-y-4">
                  {GLOME_ADVANTAGES.map((adv) => (
                    <div key={adv} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-[#124e3b] p-1 text-[#d4a373] shrink-0 border border-white/10">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#f1f6f4] leading-snug">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#144e3b]">
                <Link
                  to="/shop"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#cf7a3a] hover:bg-[#b8672e] py-3.5 px-6 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 active:scale-98"
                >
                  <span>Shop With Confidence</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
