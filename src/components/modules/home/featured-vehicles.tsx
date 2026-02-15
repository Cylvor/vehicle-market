import { VehicleCard } from "../vehicles/vehicle-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock Data
const FEATURED_VEHICLES = [
    {
        id: "1",
        title: "2023 Tesla Model 3 Long Range",
        price: "$58,900",
        image: "/vehicles/tesla-model-3.svg",
        mileage: "12,500 km",
        fuel: "Electric",
        year: "2023",
        transmission: "Automatic",
    },
    {
        id: "2",
        title: "2022 Ford Ranger Raptor",
        price: "$72,500",
        image: "/vehicles/ford-ranger.svg",
        mileage: "25,000 km",
        fuel: "Diesel",
        year: "2022",
        transmission: "Automatic",
    },
    {
        id: "3",
        title: "2024 Toyota RAV4 Hybrid",
        price: "$48,990",
        image: "/vehicles/toyota-rav4.svg",
        mileage: "5,000 km",
        fuel: "Hybrid",
        year: "2024",
        transmission: "CVT",
    },
    {
        id: "4",
        title: "2019 BMW M3 Competition",
        price: "$95,000",
        image: "/vehicles/bmw-m3.svg",
        mileage: "42,000 km",
        fuel: "Petrol",
        year: "2019",
        transmission: "Automatic",
    },
];

export function FeaturedVehicles() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Featured Vehicles</h2>
                    <Button variant="ghost" className="gap-2">
                        View All <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_VEHICLES.map((vehicle) => (
                        <VehicleCard key={vehicle.id} {...vehicle} />
                    ))}
                </div>
            </div>
        </section>
    );
}
