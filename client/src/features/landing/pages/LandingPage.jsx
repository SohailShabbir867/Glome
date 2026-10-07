import HeroSection from '../components/HeroSection';
import MissionQuote from '../components/MissionQuote';
import CategoriesSection from '../components/CategoriesSection';
import ComparisonSection from '../components/ComparisonSection';
import StatsBar from '../components/StatsBar';
import PromoBanner from '../components/PromoBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import NewsletterSection from '../components/NewsletterSection';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Hero with Photo Montage Showcase & Trust Feature Bar */}
      <HeroSection />

      {/* Editorial Mission Quote Banner */}
      <MissionQuote />

      {/* The Problems We Solve vs The Glome Standard */}
      <ComparisonSection />

      {/* Deep Forest Green Metrics & Stats Strip */}
      <StatsBar />

      {/* Top Handpicked Categories */}
      <CategoriesSection />

      {/* Seasonal Promotional Savings Banner */}
      <PromoBanner />

      {/* Featured Artisan Products */}
      <FeaturedProducts />

      {/* VIP Circle Newsletter Subscription */}
      <NewsletterSection />
    </main>
  );
}
