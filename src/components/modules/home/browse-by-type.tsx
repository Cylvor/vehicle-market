import Link from "next/link";
import { Car, Truck, Bike, Bus } from "lucide-react";

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
        <section className="py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
            <div className="container-width">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Browse by Type</h2>
                    <Link href="/search" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
                        View all types &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {VEHICLE_TYPES.map((type) => (
                        <Link
                            key={type.label}
                            href={`/search?type=${type.label.toLowerCase()}`}
                            className="group flex flex-col items-center justify-center p-6 bg-card hover:bg-card/80 border border-border/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 mb-3">
                                <type.icon className="h-6 w-6" />
                            </div>
                            <span className="font-semibold text-sm text-foreground">{type.label}</span>
                            <span className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80">{type.count}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
