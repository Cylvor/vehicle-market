import Image from "next/image";
import Link from "next/link";
import { Gauge, Heart, MapPin } from "lucide-react";
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
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-gradient-to-b from-background via-card to-card shadow-md hover:shadow-xl transition-all hover:border-primary/40 hover:-translate-y-1 font-sans">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
                        {title}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="z-20 h-8 w-8 shrink-0 rounded-full text-accent hover:bg-accent/10 hover:text-accent"
                    >
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Save vehicle</span>
                    </Button>
                </div>

                <div className="mt-auto space-y-1.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{mileage}</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-xl font-bold tracking-tight text-foreground">{price}</p>
                        <span className="text-xs text-muted-foreground underline">Drive away</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-xs">{year} • {fuel} • {transmission}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
