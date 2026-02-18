import Link from "next/link";
import Image from "next/image";
import { getVehicles } from "@/actions/vehicle";

const BRAND_DATA: Record<string, { logo: string; image?: string }> = {
    "Toyota": { logo: "/images/brands/brand_logo/toyota-1.svg", image: "/images/brands/brand_images/toyota.jpg" },
    "Honda": { logo: "/images/brands/brand_logo/honda-automobiles-1.svg", image: "/images/brands/brand_images/honda.jpg" },
    "Nissan": { logo: "/images/brands/brand_logo/nissan-6.svg", image: "/images/brands/brand_images/nissan.jpg" },
    "Suzuki": { logo: "/images/brands/brand_logo/suzuki.svg", image: "/images/brands/brand_images/suzuki.jpg" },
    "Mazda": { logo: "/images/brands/brand_logo/mazda-2.svg", image: "/images/brands/brand_images/mazda.jpg" },
    "Ford": { logo: "/images/brands/brand_logo/ford-8.svg", image: "/images/brands/brand_images/ford.jpg" },
    "Mitsubishi": { logo: "/images/brands/brand_logo/mitsubishi-motors-new-logo.svg", image: "/images/brands/brand_images/mitsubishi.jpg" },
    "BMW": { logo: "/images/brands/brand_logo/bmw-8.svg", image: "/images/brands/brand_images/bmw.jpg" },
    "Hyundai": { logo: "https://logo.clearbit.com/hyundai.com" },
    "Kia": { logo: "https://logo.clearbit.com/kia.com" },
    "Tesla": { logo: "https://logo.clearbit.com/tesla.com" },
    "Mercedes-Benz": { logo: "https://logo.clearbit.com/mercedes-benz.com" },
    "Audi": { logo: "https://logo.clearbit.com/audi.com" },
};

const BRAND_ORDER = ["Toyota", "Honda", "Nissan", "Suzuki", "Mazda", "Ford", "Mitsubishi", "BMW"];

export async function PopularBrandsRow() {
    const vehicles = await getVehicles();

    const brandCounts = vehicles.reduce<Record<string, number>>((acc, vehicle) => {
        const brand = vehicle.make.trim();
        acc[brand] = (acc[brand] ?? 0) + 1;
        return acc;
    }, {});

    // For demo purposes, we want to ensure brands with custom assets show up first
    // Combine brands with listings and fallback brands, prioritizing those with custom images/logos
    const brandsToShow = Array.from(new Set([
        ...BRAND_ORDER, // Prioritize our ordered list which has custom assets first
        ...Object.keys(brandCounts) // Then other brands with listings
    ])).slice(0, 8);

    const brands = brandsToShow.map((brand) => ({
        name: brand,
        count: brandCounts[brand] || 0,
        logo: BRAND_DATA[brand]?.logo || null,
        image: BRAND_DATA[brand]?.image || null,
    }));

    return (
        <section className="py-16 lg:py-20 bg-muted/10">
            <div className="container-width">
                <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                            POPULAR MAKERS
                        </span>
                        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Explore by Brand</h2>
                        <p className="mt-2 text-muted-foreground max-w-lg">Discover vehicles from the world's most trusted manufacturers.</p>
                    </div>
                     <Link href="/search" className="hidden md:flex rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground/20 hover:bg-muted transition-colors">
                        View all brands →
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/search?make=${encodeURIComponent(brand.name)}`}
                            className="group relative flex h-48 flex-col justify-end overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-lg hover:border-primary/20"
                        >
                            {/* Background Image or Gradient */}
                            <div className="absolute inset-0 z-0">
                                {brand.image ? (
                                    <Image
                                        src={brand.image}
                                        alt={`${brand.name} background`}
                                        fill
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-card to-muted" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-colors" />
                            </div>

                            {/* Content Overlay */}
                            <div className="relative z-10 p-5 flex flex-col items-center text-center">
                                <div className="mb-3 flex h-14 w-24 items-center justify-center rounded-lg bg-white/95 p-2 shadow-sm backdrop-blur-sm transition-transform group-hover:-translate-y-1">
                                    {brand.logo ? (
                                        <Image
                                            src={brand.logo}
                                            alt={`${brand.name} logo`}
                                            width={60}
                                            height={40}
                                            className="max-h-full w-auto object-contain"
                                        />
                                    ) : (
                                        <span className="text-lg font-bold text-foreground">{brand.name}</span>
                                    )}
                                </div>
                                
                                <h3 className="text-lg font-bold text-white group-hover:text-primary-foreground transition-colors">{brand.name}</h3>
                                <p className="text-xs font-medium text-white/70">
                                    {brand.count > 0 ? `${brand.count} listings` : "Browse collection"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
