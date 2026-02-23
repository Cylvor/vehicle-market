"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";

type RecentVehicleCard = {
    id: string;
    title: string;
    price: string;
    image: string;
    mileage: string;
    fuel: string;
    year: string;
    transmission: string;
};

type RecentlyAddedCarouselProps = {
    vehicles: RecentVehicleCard[];
};

export function RecentlyAddedCarousel({ vehicles }: RecentlyAddedCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement;
            if (firstCard) {
                // card width + 24px gap
                const scrollAmount = firstCard.offsetWidth + 24;
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: "smooth"
                });
            }
        }
    };

    if (vehicles.length === 0) return null;

    return (
        <div className="relative group">
            {/* Carousel Controls */}
            <div className="absolute top-[45%] -translate-y-1/2 left-0 right-0 flex items-center justify-between pointer-events-none z-20 px-2 sm:-mx-6 lg:-mx-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 shadow-md hover:shadow-lg hover:scale-105"
                    onClick={() => scroll('left')}
                    aria-label="Previous cars"
                >
                    <ChevronLeft className="h-6 w-6 pr-0.5" />
                </button>
                <button
                    className="pointer-events-auto h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 shadow-md hover:shadow-lg hover:scale-105"
                    onClick={() => scroll('right')}
                    aria-label="Next cars"
                >
                    <ChevronRight className="h-6 w-6 pl-0.5" />
                </button>
            </div>

            {/* Carousel Track */}
            <div className="relative pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
                {/* hide scrollbar using standard utility classes: [&::-webkit-scrollbar]:hidden */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 pt-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {vehicles.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            // Using standard sm / lg responsive logic to fit 1, 2, or 4
                            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start relative"
                        >
                            {/* Luxury Badge */}
                            <div className="absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-md border border-blue-200 bg-white/95 px-2.5 py-1 shadow-sm backdrop-blur-sm pointer-events-none">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-900">
                                    Just Listed
                                </span>
                            </div>

                            <div className="h-full transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl rounded-md">
                                <VehicleCard {...vehicle} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}