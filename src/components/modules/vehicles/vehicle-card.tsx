"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { isVehicleSaved, toggleVehicleSaved } from "@/lib/saved-vehicles";

interface VehicleCardProps {
    id: string;
    title: string;
    price: string;
    image: string;
    mileage: string;
    fuel: string;
    year: string;
    transmission: string;
    onSaveChange?: (isSaved: boolean) => void;
}

export function VehicleCard({ id, title, price, image, mileage, fuel, year, transmission, onSaveChange }: VehicleCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(isVehicleSaved(id));
    }, [id]);

    const toggleSaveVehicle = () => {
        const { isSaved: nextIsSaved } = toggleVehicleSaved({
            id,
            title,
            price,
            image,
            mileage,
            fuel,
            year,
            transmission,
        });

        setIsSaved(nextIsSaved);
        onSaveChange?.(nextIsSaved);
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-border/80 bg-gradient-to-b from-background via-card to-card shadow-md hover:shadow-xl transition-all hover:border-primary/40 hover:-translate-y-1 font-sans">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={340}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-foreground">
                        {title}
                    </h3>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleSaveVehicle}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? "Unsave vehicle" : "Save vehicle"}
                        className="z-20 h-10 w-10 shrink-0 rounded-full text-primary hover:bg-primary/10 hover:text-primary"
                    >
                        <Heart className="h-6 w-6" fill={isSaved ? "currentColor" : "none"} />
                        <span className="sr-only">{isSaved ? "Unsave vehicle" : "Save vehicle"}</span>
                    </Button>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        <span className="text-sm font-medium">{mileage}</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-2xl font-bold tracking-tight text-foreground">{price}</p>
                        <span className="text-sm text-muted-foreground underline">Drive away</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{year} • {fuel} • {transmission}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
