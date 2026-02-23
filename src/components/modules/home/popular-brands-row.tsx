"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Keep your getVehicles logic if needed, or pass data as props.
// For UI demo, I am using the static data structure.

const BRAND_DATA: Record<string, { logo: string; image?: string }> = {
    "Toyota": { logo: "/images/brands/brand_logo/toyota-1.svg", image: "/images/brands/brand_images/toyota.jpg" },
    "Honda": { logo: "/images/brands/brand_logo/honda-automobiles-1.svg", image: "/images/brands/brand_images/honda.jpg" },
    "Nissan": { logo: "/images/brands/brand_logo/nissan-6.svg", image: "/images/brands/brand_images/nissan.jpg" },
    "Suzuki": { logo: "/images/brands/brand_logo/suzuki.svg", image: "/images/brands/brand_images/suzuki.jpg" },
    "Mazda": { logo: "/images/brands/brand_logo/mazda-2.svg", image: "/images/brands/brand_images/mazda.jpg" },
    "Ford": { logo: "/images/brands/brand_logo/ford-8.svg", image: "/images/brands/brand_images/ford.jpg" },
    "Mitsubishi": { logo: "/images/brands/brand_logo/mitsubishi-motors-new-logo.svg", image: "/images/brands/brand_images/mitsubishi.jpg" },
    "BMW": { logo: "/images/brands/brand_logo/bmw-8.svg", image: "/images/brands/brand_images/bmw.jpg" },
};

const BRAND_ORDER = ["Toyota", "Honda", "Nissan", "Suzuki", "Mazda", "Ford", "Mitsubishi", "BMW"];

export function PopularBrandsRow({ brandCounts = {} }: { brandCounts?: Record<string, number> }) {

    const brands = BRAND_ORDER.map((brand) => ({
        name: brand,
        count: brandCounts[brand] || 0,
        logo: BRAND_DATA[brand]?.logo || null,
        image: BRAND_DATA[brand]?.image || null,
    }));

    return (
        <section className="py-24 bg-white text-slate-900 overflow-hidden relative border-t border-slate-200/60">
            {/* Background Ambient styling (Subtle for light mode) */}
            <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-blue-50/50 blur-[120px] pointer-events-none" />

            <div className="container-width px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Brand</span>
                        </h2>
                    </motion.div>

                    <Link
                        href="/search"
                        className="group flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        View All Manufacturers
                        <div className="h-8 w-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <span className="text-lg leading-none">→</span>
                        </div>
                    </Link>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {brands.map((brand, idx) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link
                                href={`/search?make=${encodeURIComponent(brand.name)}`}
                                className="group flex flex-col h-[320px] rounded-md border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 relative"
                            >
                                {/* Image Block */}
                                <div className="relative h-48 w-full bg-slate-100 flex-shrink-0 rounded-t-md">
                                    {/* The Image inside should be overflow-hidden, but we need the logo OUTSIDE of the overflow bounds. So let's wrap the background image in an overflow-hidden child */}
                                    <div className="absolute inset-0 overflow-hidden rounded-t-md">
                                        {brand.image ? (
                                            <Image
                                                src={brand.image}
                                                alt={brand.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-slate-200" />
                                        )}
                                    </div>

                                    {/* Logo Placement (Placed in the Image Block, but it can now break the bounds because parent has no overflow-hidden) */}
                                    <div className="absolute bottom-[-20px] right-6 z-30">
                                        <div className="bg-white h-16 w-28 flex items-center justify-center rounded-md transition-transform duration-500 group-hover:scale-105">
                                            {brand.logo ? (
                                                <div className="relative h-12 w-20">
                                                    <Image
                                                        src={brand.logo}
                                                        alt={brand.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-slate-900 font-bold text-sm">{brand.name}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Block */}
                                <div className="flex flex-col flex-1 px-6 pt-8 pb-6 relative z-10 bg-white rounded-b-md">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {brand.name}
                                    </h3>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            {brand.count > 0 ? `${brand.count} Listings` : "Browse Now"}
                                        </p>
                                        <div className="text-blue-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <span className="text-lg leading-none">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}