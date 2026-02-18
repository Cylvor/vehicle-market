"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
// If you are using Shadcn UI Badge/Button, we can override their classes, 
// or you can just use standard HTML elements for full control over the dark theme.
import { Button } from "@/components/ui/button";

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
    const slides = useMemo(() => {
        const grouped: RecentVehicleCard[][] = [];

        for (let index = 0; index < vehicles.length; index += 2) {
            grouped.push(vehicles.slice(index, index + 2));
        }

        return grouped;
    }, [vehicles]);

    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [slides.length]);

    if (slides.length === 0) return null;

    function handlePrevious() {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    function handleNext() {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    }

    return (
        <div className="space-y-6">
            {/* Carousel Controls */}
            <div className="flex items-center justify-end gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    onClick={handlePrevious}
                    aria-label="Previous cars"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    onClick={handleNext}
                    aria-label="Next cars"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            {/* Carousel Track */}
            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} className="w-full shrink-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                                {slide.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        className="group relative rounded-2xl border border-white/5 bg-slate-900/40 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_10px_30px_-10px_rgba(30,58,138,0.5)]"
                                    >
                                        {/* Luxury Badge */}
                                        <div className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-full border border-blue-400/30 bg-[#020617]/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_5px_#3b82f6]"></span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                                Just Listed
                                            </span>
                                        </div>
                                        
                                        {/* Assuming VehicleCard handles its own internal layout, 
                                            we wrap it so the outer effects apply cleanly. */}
                                        <div className="overflow-hidden rounded-2xl h-full">
                                            <VehicleCard {...vehicle} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Indicators */}
            <div className="flex items-center justify-center gap-2 pt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            index === activeSlide 
                            ? "w-10 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                            : "w-4 bg-white/20 hover:bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}