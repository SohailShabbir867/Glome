import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import PromoBanner from '../components/PromoBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import NewsletterSection from '../components/NewsletterSection';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero with Showcase & Trust Features */}
      <HeroSection />

      {/* Top Categories */}
      <CategoriesSection />

      {/* Promotional Discount Banner */}
      <PromoBanner />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* VIP Newsletter Callout */}
      <NewsletterSection />
    </main>
  );
}
