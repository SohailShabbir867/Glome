import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { topCategories } from '../data/mockData';

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#faf7f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#cf7a3a]">
              Handpicked Styles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d] mt-1">
              Top Categories
            </h2>
            <p className="mt-1 text-sm text-[#596b63]">
              Curated everyday fashion for comfort, confidence, and durability
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b3b2c] hover:text-[#cf7a3a] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative flex flex-col rounded-3xl bg-white border border-[#e8e4db] p-5 hover:border-[#cf7a3a]/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#fbf9f4] flex items-center justify-center p-4 border border-[#e8e4db]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain object-center group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Category Details */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#14211d] group-hover:text-[#0b3b2c] transition-colors">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#cf7a3a] mt-1">
                    <span>Shop Collection</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
