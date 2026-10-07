import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { topCategories } from '../data/mockData';

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Top Categories
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Explore our wide variety of styles curated for your everyday lifestyle
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
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
              className="group relative flex flex-col rounded-3xl bg-[#f8f9fa] border border-gray-100 p-5 hover:bg-gray-100/70 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white flex items-center justify-center p-4 shadow-sm border border-gray-100">
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
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-1">
                    <span>Shop Now</span>
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
