"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { Badge } from "@/components/ui/badge";
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
        <div className="space-y-4">
            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40"
                    onClick={handlePrevious}
                    aria-label="Previous cars"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40"
                    onClick={handleNext}
                    aria-label="Next cars"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} className="w-full shrink-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {slide.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        className="group relative rounded-2xl ring-1 ring-foreground/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <Badge className="absolute left-3 top-3 z-30 rounded-full border border-background/30 bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background">
                                            Just listed
                                        </Badge>
                                        <VehicleCard {...vehicle} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                            index === activeSlide ? "w-8 bg-accent" : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
