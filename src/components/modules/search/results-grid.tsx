import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { getVehicles } from "@/actions/vehicle";
import { SortSelect } from "./filter-sidebar";
import { Sparkles, Grid3x3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            {/* Header Section */}
            <div className="rounded-[6px] border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/30">
                            <Grid3x3 className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                                {results.length} {results.length === 1 ? "Result" : "Results"} Found
                            </h2>
                            {hasActiveFilters && (
                                <p className="mt-2 text-slate-500">
                                    Refined search results
                                </p>
                            )}
                        </div>
                        {hasActiveFilters && (
                            <Badge className="ml-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full px-3 py-1">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Filtered
                            </Badge>
                        )}
                    </div>
                    <SortSelect />
                </div>
            </div>

            {/* Results Grid */}
            {results.length === 0 ? (
                <div className="rounded-[6px] border border-dashed border-slate-300 bg-slate-50 p-12 md:p-16 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                        <Grid3x3 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">No vehicles found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                        {hasActiveFilters
                            ? "Try adjusting your filters to see more results."
                            : "No active listings available at the moment. Check back soon!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

            {/* Pagination - future implementation */}
            {/* {results.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-8">
                    <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">1</Button>
                    <Button variant="ghost" size="sm">2</Button>
                    <Button variant="ghost" size="sm">3</Button>
                    <span className="text-muted-foreground">...</span>
                    <Button variant="ghost" size="sm">12</Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )} */}
        </div>
    );
}
