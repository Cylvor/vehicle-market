import Link from "next/link";
import { Car, Truck, Bike, Bus } from "lucide-react"; // Using available icons, might need custom SVGs for specific vehicle types

const VEHICLE_TYPES = [
    { label: "SUVs", icon: Car, count: "14,250" },
    { label: "Utes", icon: Truck, count: "8,500" },
    { label: "Sedans", icon: Car, count: "5,120" },
    { label: "Hatchbacks", icon: Car, count: "4,300" },
    { label: "Convertibles", icon: Car, count: "1,200" },
    { label: "Vans", icon: Bus, count: "2,100" },
    { label: "Coupes", icon: Car, count: "980" },
    { label: "Wagons", icon: Car, count: "1,450" },
];

export function BrowseByType() {
    return (
        <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Type</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {VEHICLE_TYPES.map((type) => (
                        <Link
                            key={type.label}
                            href={`/search?type=${type.label.toLowerCase()}`}
                            className="flex flex-col items-center justify-center p-4 bg-background rounded-lg hover:shadow-md transition-shadow border"
                        >
                            <type.icon className="h-8 w-8 text-primary mb-3" />
                            <span className="font-medium text-sm text-foreground">{type.label}</span>
                            <span className="text-xs text-muted-foreground mt-1">{type.count}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
