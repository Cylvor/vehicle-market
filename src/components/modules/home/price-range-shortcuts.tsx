import Link from "next/link";
import Image from "next/image";

const PRICE_SHORTCUTS = [
    { label: "Under 5M", href: "/search?maxPrice=5000000" },
    { label: "5M – 10M", href: "/search?minPrice=5000000&maxPrice=10000000" },
    { label: "10M+", href: "/search?minPrice=10000000" },
];

export function PriceRangeShortcuts() {
    return (
        <section className="py-14 bg-background">
            <div className="container-width">
                <div className="rounded-md border border-border/70 bg-card/70 p-6 md:p-8 backdrop-blur-sm">
                    <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                        SMART FILTERS
                    </span>
                    <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Price Range Shortcuts</h2>
                    <p className="mt-2 text-muted-foreground">Jump into listings based on your budget.</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PRICE_SHORTCUTS.map((shortcut) => (
                            <Link
                                key={shortcut.label}
                                href={shortcut.href}
                                className="rounded-md border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <span>{shortcut.label}</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative h-36 overflow-hidden rounded-md border border-border/70">
                            <Image src="/vehicles/tesla-model-3.svg" alt="Affordable car option" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                        <div className="relative h-36 overflow-hidden rounded-md border border-border/70">
                            <Image src="/vehicles/ford-ranger.svg" alt="Premium car option" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
