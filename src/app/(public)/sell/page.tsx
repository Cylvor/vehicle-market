import { SellHero } from "@/components/modules/sell/sell-hero";
import { SellBenefits } from "@/components/modules/sell/sell-benefits";
import { HowItWorksSell } from "@/components/modules/sell/how-it-works-sell";
import { SellFaq } from "@/components/modules/sell/sell-faq";
import { CustomerReviews } from "@/components/modules/home/customer-reviews";
import { SellCarCtaBanner } from "@/components/modules/home/sell-car-cta-banner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sell Your Car - Get Maximum Value | Cylvor Vehicle Market",
    description: "Sell your car fast and securely with our premium platform. List in minutes, reach thousands of buyers, and get the best price for your vehicle.",
};

export default function SellPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Section (Gradient, no image) */}
            <SellHero />

            {/* 2. Step-by-Step Guide */}
            <HowItWorksSell />

            {/* 3. Benefits / Features */}
            <SellBenefits />

            {/* 4. Social Proof / Reviews (Reused from Home) */}
            <CustomerReviews />

            {/* 5. FAQs for Sellers */}
            <SellFaq />

            {/* 6. Final Call to Action Box / Banner */}
            <SellCarCtaBanner />
        </div>
    );
}
