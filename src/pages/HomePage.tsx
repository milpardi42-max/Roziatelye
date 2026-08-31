import { Hero } from "@/components/home/Hero";
import {
  PatternDiscovery,
  TrendingPatterns,
  BestSellingPatterns,
  FeaturedArtists,
  FeaturedPortfolios,
  StylesSection,
  FeaturedProducts,
  ExclusiveCollection,
  CategoryShowcase,
  EducationSection,
  B2BSection,
  ArtistStories,
  Newsletter,
} from "@/components/home/HomeSections";

export function HomePage() {
  return (
    <>
      <Hero />
      <PatternDiscovery />
      <TrendingPatterns />
      <FeaturedProducts />
      <BestSellingPatterns />
      <FeaturedArtists />
      <FeaturedPortfolios />
      <StylesSection />
      <CategoryShowcase />
      <ExclusiveCollection />
      <EducationSection />
      <B2BSection />
      <ArtistStories />
      <Newsletter />
    </>
  );
}
