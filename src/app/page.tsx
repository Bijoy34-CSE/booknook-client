import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <TopCategories />
      <HowItWorks />
    </div>
  );
}