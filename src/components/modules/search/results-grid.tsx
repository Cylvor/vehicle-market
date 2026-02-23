import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { getVehicles } from "@/actions/vehicle";
import { SortSelect } from "./filter-sidebar";
import { Grid3x3 } from "lucide-react";

type ResultsGridFilters = {
    q?: string;
    make?: string;
    model?: string;
    bodyType?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    sort?: string;
};

type ResultsGridProps = {
    filters?: ResultsGridFilters;
};

export async function ResultsGrid({ filters }: ResultsGridProps) {
    const results = await getVehicles(filters);
    const hasActiveFilters = Object.values(filters || {}).some((value) => value !== undefined && value !== "");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {results.length} {results.length === 1 ? "car" : "cars"} for sale
                    </h2>
                    {hasActiveFilters && (
                        <p className="text-sm text-slate-500 mt-1 font-medium">
                            Based on your selected filters
                        </p>
                    )}
                </div>
                <SortSelect />
            </div>

            {results.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 md:p-16 text-center shadow-sm">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4 border border-slate-100">
                        <Grid3x3 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">No vehicles found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                        {hasActiveFilters
                            ? "Try broadening your search criteria or clearing some filters to see more results."
                            : "No active listings available at the moment. Check back soon!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {results.map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            id={vehicle.id}
                            title={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`}
                            price={`$${vehicle.price.toLocaleString()}`}
                            image={vehicle.images?.[0] || '/placeholder-car.png'}
                            mileage={`${vehicle.odometer.toLocaleString()} km`}
                            fuel={vehicle.fuel}
                            year={vehicle.year.toString()}
                            transmission={vehicle.transmission}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}