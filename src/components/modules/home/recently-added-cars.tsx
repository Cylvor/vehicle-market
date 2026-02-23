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
        <section className="py-24 bg-slate-50 border-t border-slate-200/60 overflow-hidden relative">
            <div className="container-width px-6 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Recently Added <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cars</span>
                        </h2>
                    </div>

                    <Link
                        href="/search"
                        className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        Explore all listings
                        <div className="h-8 w-8 rounded-md bg-white border border-slate-200 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                            <span className="text-lg leading-none">→</span>
                        </div>
                    </Link>
                </div>

                {/* Content Section */}
                {recentVehicles.length === 0 ? (
                    <div className="rounded-md border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm font-medium">
                        No active listings yet. check back soon.
                    </div>
                ) : (
                    <RecentlyAddedCarousel vehicles={recentVehicles} />
                )}
            </div>
        </section>
    );
}
