import { SellerBio } from "@/components/modules/sellers/seller-bio";
import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { notFound } from "next/navigation";

// Mock Data
const SELLER_DATA = {
    id: "1",
    name: "Prestige Motors Sydney",
    type: "Dealer" as "Dealer",
    rating: 4.8,
    reviewCount: 156,
    location: "Alexandria, NSW",
    memberSince: "2018",
};

const SELLER_INVENTORY = [
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
        title: "2019 BMW M3 Competition",
        price: "$95,000",
        image: "/vehicles/bmw-m3.svg",
        mileage: "42,000 km",
        fuel: "Petrol",
        year: "2019",
        transmission: "Automatic",
    },
    {
        id: "3",
        title: "2022 Ford Ranger Raptor",
        price: "$82,000",
        image: "/vehicles/ford-ranger.svg",
        mileage: "18,000 km",
        fuel: "Diesel",
        year: "2022",
        transmission: "Automatic",
    },
];

export default function SellerPage({ params }: { params: { id: string } }) {
    // In a real app, fetch based on params.id
    if (params.id === "0") return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <SellerBio {...SELLER_DATA} />

            <div className="space-y-6">
                <h2 className="text-xl font-semibold tracking-tight">Current Inventory ({SELLER_INVENTORY.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SELLER_INVENTORY.map((vehicle) => (
                        <VehicleCard key={vehicle.id} {...vehicle} />
                    ))}
                </div>
            </div>
        </div>
    );
}
