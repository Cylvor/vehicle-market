"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, ArrowRight } from "lucide-react";

const HERO_SLIDES = [
    {
        image: "/images/hero/car1.jpg",
        badge: "Smart Discovery",
        title: "Find your perfect car.",
        titleHighlight: "Instantly.",
    },
    {
        image: "/images/hero/car3.jpg",
        badge: "Premium Selection",
        title: "Premium models.",
        titleHighlight: "Unmatched.",
    },
    {
        image: "/images/hero/car4.jpg",
        badge: "Transparent Pricing",
        title: "Better deals.",
        titleHighlight: "Zero Stress.",
    },
];

const SUGGESTIONS = [
    "Black SUV under $40k",
    "Electric sedans with autopilot",
    "Sports cars with V8 engines",
    "Family minivans 2022+",
];

const AUTO_PLAY_INTERVAL = 6000;

export function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const nextSlide = useCallback(() => {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative h-[100svh] min-h-[750px] w-full overflow-hidden bg-black text-white flex items-center justify-center">

            {/* --- Background Image Slider --- */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src={HERO_SLIDES[activeSlide].image}
                            alt="Vehicle background"
                            fill
                            priority
                            className="object-cover brightness-[0.35]" // Darkened for better text/search contrast
                        />
                        {/* Radial vignette to focus the center */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- Centered Content Overlay --- */}
            <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12 flex flex-col items-center text-center mt-12">

                {/* Dynamic Headline */}
                <div className="h-[140px] flex flex-col items-center justify-end mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${activeSlide}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <span className="mb-4 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md text-gray-300">
                                {HERO_SLIDES[activeSlide].badge}
                            </span>
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
                                {HERO_SLIDES[activeSlide].title}{" "}
                                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    {HERO_SLIDES[activeSlide].titleHighlight}
                                </span>
                            </h1>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- AI Search Bar --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full max-w-3xl relative group"
                >
                    {/* Glowing effect behind search bar */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />

                    <div className="relative flex items-center w-full rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-2 shadow-2xl transition-all group-hover:bg-black/50 group-hover:border-white/30">

                        <div className="flex h-12 w-12 items-center justify-center pl-2">
                            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                        </div>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Describe your dream ride (e.g. 'Red sports car under $50k')"
                            className="h-14 w-full bg-transparent px-2 text-lg text-white placeholder-gray-400 focus:outline-none sm:text-xl"
                        />

                        <button className="flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 font-semibold text-white transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-900/50">
                            <span className="hidden sm:inline">Search</span>
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>

                {/* AI Search Suggestions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-3"
                >
                    <span className="text-sm text-gray-400 mr-2">Try asking:</span>
                    {SUGGESTIONS.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-white"
                        >
                            {suggestion}
                        </button>
                    ))}
                </motion.div>

            </div>

            {/* Decorative Slide Indicators */}
            <div className="absolute bottom-10 z-20 flex gap-3">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${activeSlide === index ? "w-10 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "w-4 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Bottom Gradient Fade to transition smoothly into the next section */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    );
}