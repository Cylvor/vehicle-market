"use client";

import { Star } from "lucide-react";
import { useRef } from "react";

const REVIEWS = [
    {
        name: "Liam O'Connor",
        location: "Sydney, NSW",
        text: "Found a brilliant Hilux in no time. The seller verification gave me peace of mind. Absolute legend of a platform!",
    },
    {
        name: "Chloe Davies",
        location: "Melbourne, VIC",
        text: "Listing my little Corolla took five minutes, and I had three serious buyers message me by the afternoon. Too easy.",
    },
    {
        name: "Jack Thompson",
        location: "Brisbane, QLD",
        text: "The search filters are spot on. Narrowed down exactly what I was looking for without digging through spam listings.",
    },
    {
        name: "Mia Robinson",
        location: "Perth, WA",
        text: "Bought my first car here! The interface is so clean and easy to use. No confusing clutter anywhere. Highly recommend.",
    },
    {
        name: "Oliver Smith",
        location: "Adelaide, SA",
        text: "Priced my Ranger fairly using their insights and it sold over the weekend. Great community of genuine buyers here.",
    },
    {
        name: "Charlotte White",
        location: "Hobart, TAS",
        text: "Loved the direct messaging feature. Organised an inspection and test drive without having to give out my personal number initially.",
    },
    {
        name: "Noah Kelly",
        location: "Darwin, NT",
        text: "Solid range of 4x4s available. Kept coming back daily just to see what was newly listed. Ended up snagging a great deal.",
    },
    {
        name: "Amelia Taylor",
        location: "Gold Coast, QLD",
        text: "Honestly the smoothest car selling experience I've had. Clean dashboard, zero hidden fees to list. Cheers guys.",
    },
    {
        name: "Ethan Wright",
        location: "Newcastle, NSW",
        text: "Finally a marketplace that isn't clunky. The app layout on my phone made browsing for cars on the train a breeze.",
    },
    {
        name: "Isabella Harris",
        location: "Geelong, VIC",
        text: "Was skeptical at first, but the quality of the listings is miles above other classified sites. Very happy with my purchase.",
    },
];

export function CustomerReviews() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-white border-t border-slate-200/60 overflow-hidden relative">
            {/* Background Ambient styling */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/50 blur-[120px] rounded-md pointer-events-none" />

            <div className="container-width px-6 relative z-10">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-blue-600"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
                                Real Feedback
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reviews</span>
                        </h2>
                        <p className="text-lg text-slate-500">Trusted by buyers and sellers across Australia.</p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-slate-50 px-6 py-5 shadow-sm flex flex-col items-center justify-center min-w-[200px]">
                        <p className="text-3xl font-black text-slate-900">4.9<span className="text-xl text-slate-400 font-bold">/5</span></p>
                        <div className="mt-2 flex items-center gap-1 text-blue-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-5 w-5 fill-current" />
                            ))}
                        </div>
                        <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Based on 1,200+ reviews</p>
                    </div>
                </div>

                {/* Horizontal Scrolling Reviews Track */}
                <div className="relative pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-12 pt-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {REVIEWS.map((review) => (
                            <article
                                key={review.name}
                                className="w-[85vw] sm:w-[400px] shrink-0 snap-start rounded-md border border-slate-200 bg-white p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-1 text-blue-500 mb-6">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star key={index} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-base leading-relaxed text-slate-700 italic">"{review.text}"</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{review.name}</p>
                                        <p className="text-xs text-slate-500">{review.location}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
