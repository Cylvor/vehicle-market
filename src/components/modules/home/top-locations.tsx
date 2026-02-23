import Link from "next/link";
import { MapPin } from "lucide-react";

const TOP_LOCATIONS = [
    { name: "Colombo", listings: "24,000+" },
    { name: "Kandy", listings: "8,500+" },
    { name: "Gampaha", listings: "7,800+" },
    { name: "Galle", listings: "5,900+" },
    { name: "Kurunegala", listings: "4,400+" },
    { name: "Negombo", listings: "3,100+" },
];

export function TopLocations() {
    return (
        <section className="py-16 lg:py-20 bg-background">
            <div className="container-width">
                <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                    HOT MARKETS
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Top Locations</h2>
                <p className="mt-2 text-muted-foreground">Explore active markets by city and region.</p>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {TOP_LOCATIONS.map((location) => (
                        <Link
                            key={location.name}
                            href={`/search?location=${encodeURIComponent(location.name)}`}
                            className="rounded-md border border-border/70 bg-card p-4 shadow-sm hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/10 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-2 text-foreground font-semibold">
                                <MapPin className="h-4 w-4 text-accent" />
                                {location.name}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{location.listings} listings</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
