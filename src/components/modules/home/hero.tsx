"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_SLIDES = [
    {
        image: "/images/hero/car1.jpg",
        title: "The perfect place\nto find your car",
        description:
            "Explore top-rated new and used vehicles with verified sellers, transparent details, and trusted pricing.",
    },
    {
        image: "/images/hero/car3.jpg",
        title: "Premium models\nfor every journey",
        description:
            "From city cars to performance sedans, find your best match with confidence and speed.",
    },
    {
        image: "/images/hero/car4.jpg",
        title: "Find better deals\nwithout the stress",
        description:
            "Get a cleaner buying experience with trusted data, fair pricing, and easy exploration.",
    },
    {
        image: "/images/hero/car6.jpg",
        title: "Command the road\nin luxury",
        description:
            "Discover iconic SUVs that blend rugged capability with sophisticated comfort and style.",
    },
];

export function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background" />

            {/* Abstract Shapes */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 w-full">
                <div className="relative overflow-hidden w-full h-[100svh] min-h-[460px] sm:min-h-[560px]">
                    {HERO_SLIDES.map((slide, index) => (
                        <div
                            key={slide.image}
                            className={`absolute inset-0 transition-[opacity,transform] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                index === activeSlide
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-[1.04]"
                            }`}
                        >
                            <Image
                                src={slide.image}
                                alt="Featured luxury sedan"
                                fill
                                priority={index === 0}
                                className="object-cover"
                            />
                        </div>
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-r from-[#0c1020]/95 via-[#0c1020]/75 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    <div className="absolute inset-y-0 left-0 w-full max-w-[92%] sm:max-w-[62%] lg:max-w-[52%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center text-white">
                        <div className="relative min-h-[220px] sm:min-h-[250px] lg:min-h-[300px]">
                            {HERO_SLIDES.map((slide, index) => (
                                <div
                                    key={`content-${slide.image}`}
                                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                                        index === activeSlide
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-5 pointer-events-none"
                                    }`}
                                >
                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
                                        {slide.title.split("\n")[0]} <br className="hidden sm:block" />
                                        {slide.title.split("\n")[1]}
                                    </h1>
                                    <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/80 max-w-xl leading-relaxed">
                                        {slide.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#quick-search"
                            className="mt-7 inline-flex w-fit items-center rounded-md border border-white/40 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
                        >
                            Explore Now
                        </a>
                    </div>

                    <div className="absolute left-6 right-6 bottom-6 z-20 flex items-center gap-2 sm:left-10 sm:right-10 sm:bottom-8 lg:left-14 lg:right-14">
                        {HERO_SLIDES.map((slide, index) => (
                            <button
                                key={`indicator-${slide.image}`}
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => setActiveSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    index === activeSlide
                                        ? "w-14 bg-white"
                                        : "w-6 bg-white/45 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
