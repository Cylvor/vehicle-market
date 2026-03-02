import { Hero } from "@/components/modules/home/hero";
import { QuickSearchSection } from "@/components/modules/home/quick-search-section";
import { PopularBrandsRow } from "@/components/modules/home/popular-brands-row";
import { RecentlyAddedCars } from "@/components/modules/home/recently-added-cars";
import { WhyChooseUs } from "@/components/modules/home/why-choose-us";
import { HowItWorks } from "@/components/modules/home/how-it-works";
import { CustomerReviews } from "@/components/modules/home/customer-reviews";
import { FinanceEmiCta } from "@/components/modules/home/finance-emi-cta";
import { FaqSection } from "@/components/modules/home/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <QuickSearchSection />
      <PopularBrandsRow />
      <RecentlyAddedCars />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerReviews />
      <FinanceEmiCta />
      <FaqSection />
    </div>
  );
}
