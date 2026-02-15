import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data (Expanded)
const MOCK_RESULTS = [
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
    {
        id: "5",
        title: "2021 Mazda CX-5",
        price: "$32,990",
        image: "/vehicles/toyota-rav4.svg", // Reuse placeholder
        mileage: "45,000 km",
        fuel: "Petrol",
        year: "2021",
        transmission: "Automatic",
    },
    {
        id: "6",
        title: "2020 Hyundai i30 N",
        price: "$38,500",
        image: "/vehicles/bmw-m3.svg", // Reuse placeholder
        mileage: "30,000 km",
        fuel: "Petrol",
        year: "2020",
        transmission: "Manual",
    },
];

export function ResultsGrid() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{MOCK_RESULTS.length} Results Found</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest Listed</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_RESULTS.map((vehicle) => (
                    <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 py-8">
                <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <span className="text-muted-foreground">...</span>
                <Button variant="ghost" size="sm">12</Button>
                <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
