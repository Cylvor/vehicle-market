"use client";

import { useCompare, Math_MAX_COMPARE } from "@/hooks/use-compare";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, ArrowRight, Gauge, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ResearchClientProps {
    vehicles: any[];
}

export function ResearchClient({ vehicles }: ResearchClientProps) {
    const { compareItems, addVehicle, removeVehicle, isMounted } = useCompare();

    if (!isMounted) return null;

    return (
        <div className="relative min-h-[500px]">
            {vehicles.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">No vehicles available for research</h2>
                    <p className="text-muted-foreground">Check back later when more vehicles are listed.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
                    {vehicles.map((vehicle) => {
                        const isSelected = compareItems.includes(vehicle.id);
                        return (
                            <ResearchVehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                isSelected={isSelected}
                                onAdd={() => addVehicle(vehicle.id)}
                                onRemove={() => removeVehicle(vehicle.id)}
                            />
                        );
                    })}
                </div>
            )}

            {/* Floating Compare Bar */}
            {compareItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-950/90 backdrop-blur-md border-t border-emerald-800 shadow-2xl z-50 transform transition-all duration-300 translate-y-0">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-white">
                                <span className="font-bold text-lg">{compareItems.length}</span>
                                <span className="text-emerald-300 ml-1">/ {Math_MAX_COMPARE} Selected</span>
                            </div>
                            <div className="hidden md:flex gap-2 isolate">
                                {compareItems.map((id) => {
                                    const v = vehicles.find((item) => item.id === id);
                                    if (!v) return null;
                                    return (
                                        <div key={id} className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-emerald-500 shadow-sm">
                                            <Image
                                                src={v.images?.[0] || "/placeholder-car.png"}
                                                alt={v.model}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                onClick={() => removeVehicle(id)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                            >
                                                <MinusCircle className="w-3 h-3" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Button
                            asChild
                            size="lg"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-8 shadow-lg shadow-emerald-500/20"
                        >
                            <Link href="/research/compare">
                                Compare Now <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function ResearchVehicleCard({ vehicle, isSelected, onAdd, onRemove }: { vehicle: any, isSelected: boolean, onAdd: () => void, onRemove: () => void }) {
    const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`.trim();

    return (
        <article className={`group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500 ring-opacity-50 shadow-emerald-500/20 shadow-lg' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/50'}`}>
            <Link href={`/vehicles/${vehicle.id}`} className="absolute inset-0 z-0">
                <span className="sr-only">View {title}</span>
            </Link>

            <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <Image
                    src={vehicle.images?.[0] || "/placeholder-car.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-5 z-10 bg-slate-900 border-t border-slate-800">
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {title}
                </h3>

                <div className="space-y-4 pt-2">
                    <div className="flex items-baseline gap-1.5">
                        <p className="text-[22px] font-extrabold tracking-tight text-white">{formatCurrency(vehicle.price)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[13px] font-semibold text-slate-400 pt-3 border-t border-slate-800">
                        <div className="flex items-center gap-1.5">
                            <Gauge className="h-4 w-4 text-emerald-500" />
                            <span className="truncate">{vehicle.odometer} km</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-emerald-500" />
                            <span className="truncate">{vehicle.fuel}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/50">
                    {isSelected ? (
                        <Button
                            onClick={(e) => { e.preventDefault(); onRemove(); }}
                            variant="destructive"
                            className="w-full font-semibold"
                        >
                            <MinusCircle className="w-4 h-4 mr-2" />
                            Remove from Compare
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) => { e.preventDefault(); onAdd(); }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add to Compare
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
