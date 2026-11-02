import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import LibraryStats from "@/components/home/LibraryStats";
import Faq from "@/components/home/Faq";

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <NewArrivals />
      <LibraryStats />
      <Faq />
    </div>
  );
}