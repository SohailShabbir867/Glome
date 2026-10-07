import HeroSection from '../components/HeroSection';
import CircleCategories from '../components/CircleCategories';
import BestSellersSection from '../components/BestSellersSection';
import PromoBannersSection from '../components/PromoBannersSection';
import TrendingNowSection from '../components/TrendingNowSection';
import BrandLogosBar from '../components/BrandLogosBar';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero with Model Showcase & 3 Side Cards */}
      <HeroSection />

      {/* 2. Shop by Category (8 Circle Categories) */}
      <CircleCategories />

      {/* 3. Featured Products - Best Sellers with Color Swatches */}
      <BestSellersSection />

      {/* 4. Promotional Triple Banners */}
      <PromoBannersSection />

      {/* 5. Trending Now - Popular Right Now */}
      <TrendingNowSection />

      {/* 6. Partner Brand Trust Bar */}
      <BrandLogosBar />
    </main>
  );
}
