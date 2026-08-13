import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import ShopByCategory from "@/components/home/ShopByCategory";
import AboutMeru from "@/components/home/AboutMeru";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection/>
      <ShopByCategory/>
      <AboutMeru/>
      <Newsletter/>
    </>
  );
}