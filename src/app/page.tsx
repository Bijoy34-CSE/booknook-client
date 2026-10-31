import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <NewArrivals />
      <TopCategories />
      <HowItWorks />
    </div>
  );
}