"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, CarFront, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

const SUGGESTIONS = [
    "Perfect vehicle for a family of 4",
    "Perfect electric vehicle",
    "Sporty sedan under $40k",
    "Reliable truck for towing",
];

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section className="relative min-h-[700px] w-full bg-slate-50 flex items-center justify-center pt-32 pb-16 overflow-hidden">
            {/* --- Subtle Background Elements --- */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Top right blob */}
                <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-md bg-blue-100/50 blur-[100px]" />
                {/* Bottom left blob */}
                <div className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] rounded-md bg-indigo-100/40 blur-[120px]" />
            </div>

            {/* --- Main Content Container --- */}
            <div className="relative z-10 w-full max-w-5xl px-6 sm:px-12 flex flex-col items-center justify-center -mt-8">



                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center max-w-5xl mb-12"
                >
                    <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl leading-[1.05] text-slate-900 mb-8">
                        Find the perfect car. <br className="hidden md:block" />
                        <span className="text-blue-600">Without the hassle.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 font-medium">
                        Search thousands of verified vehicles from trusted sellers. Your dream ride is just a search away.
                    </p>
                </motion.div>

                {/* --- Professional Search Box --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full max-w-2xl bg-white rounded-md shadow-2xl shadow-blue-900/5 ring-1 ring-slate-200/60 p-2 flex flex-col sm:flex-row items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                >
                    {/* AI Search Input */}
                    <div className="relative flex-1 flex items-center w-full h-[48px] pl-4 pr-2">
                        <Sparkles className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 animate-pulse" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="e.g. Perfect vehicle for a family of 4..."
                            className="w-full bg-transparent text-lg font-medium text-slate-900 placeholder-slate-400/80 focus:outline-none h-full tracking-tight"
                        />
                    </div>

                    {/* Search Button */}
                    <button className="w-full sm:w-auto h-[48px] px-6 bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all text-white font-semibold text-sm rounded-md shadow-md flex items-center justify-center gap-2 flex-shrink-0">
                        Search Now
                    </button>
                </motion.div>

                {/* AI Search Suggestions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl"
                >
                    <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Try asking:</span>
                    {SUGGESTIONS.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="group flex items-center gap-2 rounded-md border border-slate-200/60 bg-white/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-md active:translate-y-0"
                        >
                            {suggestion}
                            <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}