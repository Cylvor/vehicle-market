import Link from "next/link";
import { getVehicles } from "@/actions/vehicle";
import { RecentlyAddedCarousel } from "@/components/modules/home/recently-added-carousel";

export async function RecentlyAddedCars() {
    const vehicles = await getVehicles();
    const recentVehicles = vehicles.slice(0, 8).map((vehicle) => ({
        id: vehicle.id,
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ""}`,
        price: `$${vehicle.price.toLocaleString()}`,
        image: vehicle.images?.[0] || "/placeholder-car.png",
        mileage: `${vehicle.odometer.toLocaleString()} km`,
        fuel: vehicle.fuel,
        year: vehicle.year.toString(),
        transmission: vehicle.transmission,
    }));

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
            <div className="container-width">
                <div className="rounded-3xl border border-border/70 bg-card/70 p-4 md:p-6 lg:p-7 backdrop-blur-sm">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase">
                                NEW ARRIVALS
                            </span>
                            <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-foreground">Recently Added Cars</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Fresh listings from verified sellers.</p>
                        </div>
                        <Link href="/search" className="hidden sm:inline rounded-[6px] border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground/20 hover:bg-muted transition-colors">
                            Explore all →
                        </Link>
                    </div>

                    {recentVehicles.length === 0 ? (
                        <div className="rounded-2xl border border-border/70 bg-card p-10 text-center text-muted-foreground">
                            No active listings yet.
                        </div>
                    ) : (
                        <RecentlyAddedCarousel vehicles={recentVehicles} />
                    )}
                </div>
            </div>
        </section>
    );
}
