import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import CustomerReviews from '@/components/home/CustomerReviews';
import StoreInfo from '@/components/home/StoreInfo';
import PromoBanners from '@/components/home/PromoBanners';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AnimatedBackground from '@/components/home/AnimatedBackground';
import { sampleCategories } from '@/data/seed';

async function getBestSellers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/products?bestSeller=true&limit=10`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const bestSellers = await getBestSellers();

  return (
    <div className="page-enter relative min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <HeroBanner />

        <CategoryGrid categories={sampleCategories} />

        <PromoBanners />

        <FeaturedProducts
          products={bestSellers.slice(0, 10)}
          title="Best Sellers"
          link="/products?sort=popular"
        />

        <CustomerReviews />

        <StoreInfo />
      </div>
    </div>
  );
}
