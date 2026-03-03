"use client";

import { useEffect, useState } from "react";
import { useCompare } from "@/hooks/use-compare";
import { getVehiclesByIds } from "@/actions/vehicle";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Loader2, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// Specs to compare from our vehicle schema
const SPEC_KEYS = [
    { label: "Price", key: "price", render: (v: any) => formatCurrency(v.price) },
    { label: "Year", key: "year" },
    { label: "Make", key: "make" },
    { label: "Model", key: "model" },
    { label: "Variant", key: "variant", render: (v: any) => v.variant || "-" },
    { label: "Odometer", key: "odometer", render: (v: any) => `${v.odometer.toLocaleString()} km` },
    { label: "Fuel Type", key: "fuel" },
    { label: "Transmission", key: "transmission" },
    { label: "Body Type", key: "bodyType" },
    { label: "Colour", key: "colour", render: (v: any) => v.colour || "-" },
];

export function ComparisonTable() {
    const { compareItems, removeVehicle, isMounted } = useCompare();
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isMounted) return;

        const loadVehicles = async () => {
            setIsLoading(true);
            try {
                if (compareItems.length > 0) {
                    const data = await getVehiclesByIds(compareItems);
                    // Sort data to match the order in compareItems
                    const orderedData = compareItems
                        .map(id => data.find(v => v.id === id))
                        .filter(Boolean);
                    setVehicles(orderedData);
                } else {
                    setVehicles([]);
                }
            } catch (error) {
                console.error("Failed to load vehicles for comparison", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadVehicles();
    }, [compareItems, isMounted]);

    if (!isMounted || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-slate-400">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-emerald-500" />
                <p>Loading your vehicles...</p>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 md:p-24 bg-slate-900 border border-slate-800 rounded-xl text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <X className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Vehicles Selected</h3>
                <p className="text-slate-400 mb-8 max-w-md">
                    You haven't added any vehicles to your comparison yet. Go to the research page to find vehicles you'd like to compare.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    <Link href="/research">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Find Vehicles
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-emerald-900/50 rounded-xl shadow-2xl shadow-black/40 bg-slate-900/80 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 md:p-6 border-b border-r border-slate-800 bg-slate-950/50 w-48 min-w-[12rem] sticky left-0 z-10 backdrop-blur-md">
                            <span className="text-emerald-400 uppercase tracking-wider text-xs font-bold">Specifications</span>
                        </th>
                        {vehicles.map((vehicle) => (
                            <th key={vehicle.id} className="p-4 md:p-6 border-b border-slate-800 min-w-[16rem] w-[300px] align-top relative bg-slate-900/50">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeVehicle(vehicle.id)}
                                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 z-10"
                                    title="Remove from comparison"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="aspect-video bg-slate-950 rounded-lg mb-4 flex items-center justify-center text-xs text-slate-600 overflow-hidden relative border border-slate-800">
                                    <Image
                                        src={vehicle.images?.[0] || "/placeholder-car.png"}
                                        alt={vehicle.model}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-lg leading-tight mb-2 h-12 line-clamp-2 text-slate-100">
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </h3>
                                <p className="text-2xl font-black text-white mb-4">{formatCurrency(vehicle.price)}</p>
                                <Button asChild className="w-full bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 hover:border-emerald-500 transition-all">
                                    <Link href={`/vehicles/${vehicle.id}`}>
                                        View Details <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {SPEC_KEYS.map((spec) => (
                        <tr key={spec.key} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 border-r border-slate-800/50 bg-slate-950/30 font-semibold text-sm text-slate-400 sticky left-0 z-10 backdrop-blur-sm">
                                {spec.label}
                            </td>
                            {vehicles.map((vehicle) => (
                                <td key={`${vehicle.id}-${spec.key}`} className="p-4 text-sm whitespace-nowrap lg:whitespace-normal font-medium text-slate-200">
                                    {spec.render ? spec.render(vehicle) : vehicle[spec.key as keyof typeof vehicle] || "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {/* Features Row */}
                    <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 border-r border-slate-800/50 bg-slate-950/30 font-semibold text-sm text-slate-400 sticky left-0 z-10 backdrop-blur-sm align-top">
                            Key Features
                        </td>
                        {vehicles.map((vehicle) => (
                            <td key={`${vehicle.id}-features`} className="p-4 text-sm align-top">
                                {vehicle.features && vehicle.features.length > 0 ? (
                                    <ul className="list-disc pl-4 space-y-1 text-slate-300 marker:text-emerald-500">
                                        {vehicle.features.slice(0, 5).map((feature: string, i: number) => (
                                            <li key={i} className="truncate" title={feature}>{feature}</li>
                                        ))}
                                        {vehicle.features.length > 5 && (
                                            <li className="text-slate-500 italic">+{vehicle.features.length - 5} more</li>
                                        )}
                                    </ul>
                                ) : (
                                    <span className="text-slate-500 italic">No features listed</span>
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
