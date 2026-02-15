import Image from "next/image";
import Link from "next/link";
import { Heart, Fuel, Gauge, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
    id: string;
    title: string;
    price: string;
    image: string;
    mileage: string;
    fuel: string;
    year: string;
    transmission: string;
}

export function VehicleCard({ id, title, price, image, mileage, fuel, year, transmission }: VehicleCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>
            <div className="aspect-[16/10] overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/80 hover:bg-background hover:text-red-500"
                >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Save vehicle</span>
                </Button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
                <p className="text-xl font-bold text-primary mt-1">{price}</p>

                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Gauge className="h-4 w-4" />
                        <span>{mileage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Fuel className="h-4 w-4" />
                        <span>{fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>{transmission}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
