import Image from "next/image";
import Link from "next/link";
import { Heart, Fuel, Gauge, Calendar, Cog } from "lucide-react";
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
        <div className="group relative flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-background shadow-sm transition-all"
                >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Save vehicle</span>
                </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-xl font-bold text-primary">{price}</p>
                </div>

                <div className="mt-auto pt-4 grid grid-cols-2 gap-x-2 gap-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-1.5 rounded-md">
                        <Calendar className="h-4 w-4 text-primary/70" />
                        <span className="font-medium">{year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-1.5 rounded-md">
                        <Gauge className="h-4 w-4 text-primary/70" />
                        <span className="font-medium">{mileage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-1.5 rounded-md">
                        <Fuel className="h-4 w-4 text-primary/70" />
                        <span className="font-medium">{fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-1.5 rounded-md">
                        <Cog className="h-4 w-4 text-primary/70" />
                        <span className="font-medium">{transmission}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
