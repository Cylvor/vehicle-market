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
        return () => { isActive = false; };
    }, [canPersistInDb, id, title, price, image, mileage, fuel, year, transmission]);

    const toggleSaveVehicle = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link click when clicking heart
        if (isToggling) return;
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
            id, title, price, image, mileage, fuel, year, transmission,
        });

        setIsSaved(nextIsSaved);
        onSaveChange?.(nextIsSaved);
        setIsToggling(false);
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-md bg-white border border-slate-200 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
            <Link href={`/vehicles/${id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 p-1.5 pb-0">
                <div className="relative h-full w-full rounded-t-md overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        width={600}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSaveVehicle}
                    disabled={isToggling}
                    className="absolute top-4 right-4 z-20 h-10 w-10 rounded-md bg-white/90 backdrop-blur shadow-sm hover:bg-white text-slate-400 hover:text-red-500 border border-slate-200/50 transition-colors"
                >
                    <Heart className={`h-5 w-5 ${isSaved ? "text-red-500" : ""}`} fill={isSaved ? "currentColor" : "none"} />
                </Button>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <div className="mt-auto space-y-4 pt-2">
                    <div className="flex items-baseline gap-1.5">
                        <p className="text-[22px] font-extrabold tracking-tight text-slate-900">{price}</p>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Drive away</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[13px] font-semibold text-slate-600 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
                            <Gauge className="h-4 w-4 text-blue-500" />
                            <span className="truncate">{mileage}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="truncate">{year} • {fuel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}