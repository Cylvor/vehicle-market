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
        <section className="py-24 bg-[#020617] text-white overflow-hidden relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-blue-900/10 blur-[120px] pointer-events-none" />
            
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
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-blue-500"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                                Premium Makers
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Brand</span>
                        </h2>
                    </motion.div>

                    <Link 
                        href="/search" 
                        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                        View All Manufacturers
                        <div className="h-8 w-8 rounded-md border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 transition-all">
                            <span className="text-white text-lg">→</span>
                        </div>
                    </Link>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                className="group relative block h-[360px] overflow-hidden rounded-md border border-white/10 bg-slate-900/50 transition-all hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(30,58,138,0.2)]"
                            >
                                {/* Image with Better Visibility */}
                                <div className="absolute inset-0 z-0">
                                    {brand.image ? (
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            fill
                                            // CHANGE: brightness increased from 0.4 to 0.75, goes to 1.0 on hover
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.75] group-hover:brightness-100"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-slate-800" />
                                    )}
                                    
                                    {/* CHANGE: Gradient adjusted to be lighter at top, darker at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/50 to-transparent opacity-90" />
                                </div>

                                {/* Logo Placement (Larger & Clearer) */}
                                <div className="absolute top-5 left-5 z-20">
                                    {/* CHANGE: Added shadow-lg and pure white background */}
                                    <div className="bg-white h-12 w-20 flex items-center justify-center rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105">
                                        {brand.logo ? (
                                            <div className="relative h-8 w-14">
                                                <Image
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain p-1" // Added padding so logo doesn't touch edges
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-black font-bold text-xs">{brand.name}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Brand Text */}
                                <div className="absolute bottom-6 left-6 z-10">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors drop-shadow-md">
                                        {brand.name}
                                    </h3>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mt-1">
                                        {brand.count > 0 ? `${brand.count} Listings` : "Browse Now"}
                                    </p>
                                </div>

                                {/* Decorative Line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full shadow-[0_0_10px_#3b82f6]" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}