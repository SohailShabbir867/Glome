import { partnerBrands } from '../data/storeData';

export default function BrandLogosBar() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#708077] mb-8">
          Trusted by 10K+ Happy Customers
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-18 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          {partnerBrands.map((brand) => (
            <span
              key={brand.name}
              className="font-serif text-lg sm:text-xl lg:text-2xl font-black tracking-widest text-[#14211d] hover:text-[#0b3b2c] transition-colors"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
