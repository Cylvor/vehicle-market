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
        <section className="py-20 lg:py-24 bg-background">
            <div className="container-width">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Vehicles</h2>
                        <p className="text-muted-foreground mt-2">Hand-picked vehicles from our top rated sellers.</p>
                    </div>
                    <Button variant="ghost" className="hidden sm:flex items-center gap-2 hover:bg-accent/10">
                        View All <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURED_VEHICLES.map((vehicle) => (
                        <div key={vehicle.id} className="transition-all duration-300 hover:scale-[1.02]">
                            <VehicleCard {...vehicle} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center sm:hidden">
                    <Button variant="outline" className="w-full h-12">
                        View All Vehicles
                    </Button>
                </div>
            </div>
        </section>
    );
}
