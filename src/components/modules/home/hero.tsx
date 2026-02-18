"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HERO_SLIDES = [
    {
        image: "/images/hero/car1.jpg",
        title: "The perfect place\nto find your car",
        description: "Explore top-rated new and used vehicles with verified sellers, transparent details, and trusted pricing.",
    },
    {
        image: "/images/hero/car3.jpg",
        title: "Premium models\nfor every journey",
        description: "From city cars to performance sedans, find your best match with confidence and speed.",
    },
    {
        image: "/images/hero/car4.jpg",
        title: "Find better deals\nwithout the stress",
        description: "Get a cleaner buying experience with trusted data, fair pricing, and easy exploration.",
    },
    {
        image: "/images/hero/car6.jpg",
        title: "Command the road\nin luxury",
        description: "Discover iconic SUVs that blend rugged capability with sophisticated comfort and style.",
    },
];

const AUTO_PLAY_INTERVAL = 6000;

export function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative h-[100svh] min-h-[650px] w-full overflow-hidden bg-black text-white">
            
            {/* --- Background Image Slider --- */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src={HERO_SLIDES[activeSlide].image}
                            alt="Luxury Car"
                            fill
                            priority
                            className="object-cover brightness-[0.45]"
                        />
                        {/* Overlay Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- Content Overlay --- */}
            <div className="relative z-10 flex h-full items-center px-6 sm:px-12 lg:px-24">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${activeSlide}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl leading-[1.1]">
                                {HERO_SLIDES[activeSlide].title.split("\n").map((line, i) => (
                                    <span 
                                        key={i} 
                                        className={`block ${i === 1 ? 'text-blue-400' : 'text-white'}`}
                                    >
                                        {line}
                                    </span>
                                ))}
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-gray-300 sm:text-xl leading-relaxed">
                                {HERO_SLIDES[activeSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Buttons Section */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#1e3a8a" }} // Navy Blue Hover
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-blue-950 border border-blue-900 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-blue-950/50 transition-all"
                        >
                            View Inventory
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider backdrop-blur-md hover:bg-white/10 transition-colors"
                        >
                            Sell Your Car
                        </motion.button>
                    </div>

                    {/* Slide Indicators */}
                    <div className="mt-12 flex gap-2">
                        {HERO_SLIDES.map((_, index) => (
                            <div 
                                key={index}
                                className={`h-1 transition-all duration-500 rounded-full ${
                                    activeSlide === index ? "w-12 bg-blue-500" : "w-4 bg-gray-600"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Ambient Glow (Dark Navy) */}
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-900/20 blur-[120px]" />
            <div className="pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-full bg-blue-950/10 blur-[100px]" />
        </section>
    );
}