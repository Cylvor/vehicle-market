import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";

// Mock saved vehicles (reusing data structure)
const SAVED_VEHICLES = [
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

export default function SavedVehiclesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Saved Vehicles</h2>
                <p className="text-muted-foreground">Cars you have favourited or saved for later.</p>
            </div>

            {SAVED_VEHICLES.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    You haven't saved any vehicles yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SAVED_VEHICLES.map((vehicle) => (
                        <VehicleCard key={vehicle.id} {...vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
}
