import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { circleCategories } from '../data/storeData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CircleCategories() {
  return (
    <section className="bg-white py-14 sm:py-18 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#cf7a3a]">
                SHOP BY CATEGORY
              </span>
              <span className="h-px w-14 bg-[#cf7a3a]/40" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14211d]">
              Find What You Love
            </h2>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14211d] hover:text-[#0b3b2c] transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (8 circular categories) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5 sm:gap-6 text-center"
        >
          {circleCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <Link to={category.link} className="group block">
                {/* Circular Image Container */}
                <div className="relative mx-auto aspect-square w-24 sm:w-26 lg:w-28 overflow-hidden rounded-full bg-[#f4efe8] p-2 shadow-xs group-hover:shadow-md transition-shadow">
                  <div className="h-full w-full rounded-full overflow-hidden bg-white p-2 border border-[#e8ded0]">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Labels */}
                <div className="mt-3.5 space-y-0.5">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#14211d] group-hover:text-[#0b3b2c] transition-colors line-clamp-1">
                    {category.title}
                  </h3>
                  <p className="text-[10px] text-[#708077] line-clamp-1">{category.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
