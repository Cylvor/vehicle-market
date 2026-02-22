"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { isVehicleSaved, toggleVehicleSaved, addSavedVehicle, removeSavedVehicle } from "@/lib/saved-vehicles";
import { isVehicleSavedInDb, toggleVehicleSavedInDb } from "@/actions/saved-vehicles";

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
    const { userId } = useAuth();
    const [isSaved, setIsSaved] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const canPersistInDb = Boolean(userId) && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

    useEffect(() => {
        let isActive = true;

        async function resolveSavedState() {
            if (canPersistInDb) {
                const savedInDb = await isVehicleSavedInDb(id);
                if (!isActive) return;

                setIsSaved(savedInDb);
                if (savedInDb) {
                    addSavedVehicle({ id, title, price, image, mileage, fuel, year, transmission });
                } else {
                    removeSavedVehicle(id);
                }
                return;
            }

            setIsSaved(isVehicleSaved(id));
        }

        void resolveSavedState();

        return () => {
            isActive = false;
        };
    }, [canPersistInDb, id, title, price, image, mileage, fuel, year, transmission]);

    const toggleSaveVehicle = async () => {
        if (isToggling) {
            return;
        }

        setIsToggling(true);

        if (canPersistInDb) {
            const result = await toggleVehicleSavedInDb(id);

            if (result) {
                setIsSaved(result.isSaved);
                if (result.isSaved) {
                    addSavedVehicle({ id, title, price, image, mileage, fuel, year, transmission });
                } else {
                    removeSavedVehicle(id);
                }
                onSaveChange?.(result.isSaved);
                setIsToggling(false);
                return;
            }
        }

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
        setIsToggling(false);
    };

    return (
        <article className="font-sans group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={340}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5 md:p-6 font-sans">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-sans line-clamp-2 text-xl font-semibold leading-tight text-slate-900">
                        {title}
                    </h3>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleSaveVehicle}
                        disabled={isToggling}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? "Unsave vehicle" : "Save vehicle"}
                        className="z-20 h-10 w-10 shrink-0 rounded-full text-primary hover:bg-primary/10 hover:text-primary"
                    >
                        <Heart className="h-6 w-6" fill={isSaved ? "currentColor" : "none"} />
                        <span className="sr-only">{isSaved ? "Unsave vehicle" : "Save vehicle"}</span>
                    </Button>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Gauge className="h-4 w-4" />
                        <span className="text-sm font-medium">{mileage}</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-2xl font-bold tracking-tight text-slate-900">{price}</p>
                        <span className="text-sm text-slate-500 underline">Drive away</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{year} • {fuel} • {transmission}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
