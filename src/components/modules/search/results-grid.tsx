import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { getVehicles } from "@/actions/vehicle";

type ResultsGridFilters = {
    make?: string;
    model?: string;
    bodyType?: string;
    minPrice?: string;
    maxPrice?: string;
};

type ResultsGridProps = {
    filters?: ResultsGridFilters;
};

export async function ResultsGrid({ filters }: ResultsGridProps) {
    const results = await getVehicles(filters);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{results.length} Results Found</h2>
                {/* Sorting - future implementation */}
                {/* <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest Listed</option>
                    </select>
                </div> */}
            </div>

            {results.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No vehicles found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {/* <div className="flex items-center justify-center gap-2 py-8">
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
            </div> */}
        </div>
    );
}
