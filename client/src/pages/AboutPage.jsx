import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Leaf,
  ArrowRight,
  Award,
  Users,
  Package,
} from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '5+', label: 'Years Experience', icon: Award },
  { value: '50K+', label: 'Happy Customers', icon: Users },
  { value: '10K+', label: 'Curated Products', icon: Package },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    description:
      'We provide only the best products for our customers, ethically crafted from premium materials that endure through every season.',
  },
  {
    icon: Sparkles,
    title: 'Style',
    description:
      'Fashion is a form of self-expression. We curate timeless, versatile silhouettes designed for effortless day-to-night living.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description:
      'Your satisfaction is our top priority. Dedicated 24/7 support, frictionless checkout, and easy 30-day hassle-free returns.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We care about a better future. Committed to mindful manufacturing, recyclable packaging, and verified fair-trade workshops.',
  },
];

const TEAM = [
  {
    name: 'Ayesha Khan',
    role: 'Founder & CEO',
    image: '/images/team-ayesha.jpg',
    bio: 'Visionary behind Glome’s signature minimalist aesthetic and ethical supply chain.',
  },
  {
    name: 'Usman Ali',
    role: 'Operations Lead',
    image: '/images/team-usman.jpg',
    bio: 'Oversees global logistics, workshop standards, and warehouse fulfillment.',
  },
  {
    name: 'Sara Malik',
    role: 'Marketing Manager',
    image: '/images/team-sara.jpg',
    bio: 'Drives brand narrative, editorial partnerships, and customer community growth.',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Customer Support',
    image: '/images/team-bilal.jpg',
    bio: 'Leads our dedicated concierge team ensuring 5-star shopper satisfaction.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f2ea] via-[#f3ebe0] to-[#eae1d2] py-16 sm:py-20 lg:py-24 border-b border-[#e5dcce]">
        <div className="absolute top-0 right-1/4 -z-0 h-80 w-80 rounded-full bg-[#0b3b2c]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -z-0 h-80 w-80 rounded-full bg-[#cf7a3a]/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b3b2c]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0b3b2c]">
              <Sparkles className="h-3.5 w-3.5" />
              Our Story &amp; Values
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14211d] leading-tight"
          >
            About <span className="text-[#0b3b2c] italic font-normal">Glome</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-[#596b63] leading-relaxed"
          >
            We&apos;re more than just an online store — we&apos;re a community that believes in
            style, quality, and self-expression.
          </motion.p>
        </div>
      </section>

      {/* 2. Our Story Section with Local Images */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
                  Our Story
                </span>
                <span className="h-px w-12 bg-[#0b3b2c]/30" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14211d] leading-snug">
                Born From a Passion for Timeless Craft &amp; Modern Comfort
              </h2>

              <p className="text-sm sm:text-base text-[#596b63] leading-relaxed">
                Glome was founded with a clear, uncompromising mission: to make quality fashion
                accessible to everyone. What started as a curated footwear and apparel atelier has
                grown into a trusted destination for tens of thousands of shoppers who value style,
                comfort, and confidence.
              </p>

              <p className="text-sm sm:text-base text-[#596b63] leading-relaxed">
                Every piece in our collection—from Italian leather loafers to heavyweight organic
                cotton fleece hoodies—is vetted for material integrity, ethical manufacturing, and
                flawless longevity. We believe true style should never come at the cost of the
                planet or your comfort.
              </p>

              {/* Stats Bar */}
              <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-4">
                {STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#0b3b2c]">
                        <Icon className="h-4 w-4" />
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#14211d]">
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#596b63]">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Local Imagery (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-white bg-stone-200">
                <img
                  src="/images/about-story.jpg"
                  alt="Glome studio and wardrobe collection"
                  className="h-[380px] sm:h-[440px] w-full object-cover hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glass Tag */}
                <div className="absolute bottom-5 inset-x-5 flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg border border-white/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#708077]">
                      Curated In-House
                    </span>
                    <span className="text-xs font-bold text-[#14211d]">
                      Ethical Studio &amp; Atelier
                    </span>
                  </div>
                  <span className="rounded-full bg-[#0b3b2c] px-3 py-1 text-[11px] font-bold text-white">
                    Est. 2021
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="bg-white py-16 sm:py-24 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
              Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14211d]">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-[#596b63]">
              The foundation of everything we design, source, and deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-[#fbf9f5] p-6 sm:p-7 space-y-3.5 hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b3b2c] text-white shadow-sm group-hover:bg-[#124e3b] transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#14211d]">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-[#596b63] leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Meet Our Team Section with Local Team Photos */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b3b2c]">
              Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14211d]">
              Meet Our Team
            </h2>
            <p className="text-sm sm:text-base text-[#596b63]">
              Passionate creators, operators, and stylists dedicated to elevating your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-white p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all text-center space-y-3.5"
              >
                {/* Photo */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#14211d]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#0b3b2c]">{member.role}</p>
                  <p className="text-[11px] text-[#708077] pt-1 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Footer Section */}
      <section className="bg-[#0b3b2c] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#dce7e2]">
            Ready to explore?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Elevate Your Everyday Wardrobe With Glome
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#dce7e2]/90 leading-relaxed">
            Discover our curated essentials, handcrafted shoes, and new season drops with free
            express shipping.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0b3b2c] px-8 py-3.5 text-xs sm:text-sm font-bold shadow-lg hover:bg-[#faf7f2] hover:scale-103 active:scale-97 transition-all"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
