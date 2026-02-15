import { Hero } from "@/components/modules/home/hero";
import { FeaturedVehicles } from "@/components/modules/home/featured-vehicles";
import { BrowseByType } from "@/components/modules/home/browse-by-type";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BrowseByType />
      <FeaturedVehicles />
    </div>
  );
}
