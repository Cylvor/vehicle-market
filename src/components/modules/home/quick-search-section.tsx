"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BODY_TYPES = [
    { label: "Brand-new", image: "/images/body-types/Brand new.png", isBrandNew: true },
    { label: "SUV", image: "/images/body-types/SUV.png" },
    { label: "Ute", image: "/images/body-types/UTE.png" },
    { label: "Hatch", image: "/images/body-types/Hatch.png" },
    { label: "Offroad 4x4", image: "/images/body-types/offroad4x4.png" },
    { label: "Electric", image: "/images/body-types/Electric.png" },
    { label: "Performance", image: "/images/body-types/Performance.png" },
];

export function QuickSearchSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(node);
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="quick-search"
            ref={sectionRef}
            className={`pt-10 lg:pt-14 pb-16 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            <div className="container-width">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 md:p-8">
                    <div className="flex items-start justify-between gap-4 pb-6">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">Find your next car</h2>
                        <div className="hidden md:flex items-center gap-3 rounded-xl bg-background px-4 py-3 border border-border/60">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-lg font-semibold text-foreground">Quick search</span>
                            <Badge variant="outline" className="font-semibold text-primary border-primary/40 bg-primary/5">NEW</Badge>
                            <Search className="h-5 w-5 text-foreground" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
                        <div className="space-y-2 md:col-span-1">
                            <label className="text-sm font-medium text-foreground">Make</label>
                            <select className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                                <option>All makes</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-1">
                            <label className="text-sm font-medium text-muted-foreground">Model</label>
                            <select className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" disabled>
                                <option>All models</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-1">
                            <label className="text-sm font-medium text-foreground">Body type</label>
                            <select className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                                <option>All body types</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-1">
                            <label className="text-sm font-medium text-foreground">Location</label>
                            <select className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                                <option>All states</option>
                            </select>
                        </div>

                        <div className="md:pt-7">
                            <Button className="h-12 w-full rounded-xl text-base font-semibold">Show 219,330 cars</Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-foreground/90">
                        <button className="text-lg font-medium">New and used</button>
                        <button className="text-lg font-medium">Price min</button>
                        <button className="text-lg font-medium">Price max</button>
                        <button className="text-lg font-semibold text-primary">Clear all</button>
                    </div>

                    <div className="h-px w-full bg-border" />

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5 pt-7">
                        {BODY_TYPES.map((type) => (
                            <button
                                key={type.label}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className="relative h-14 w-full max-w-[150px]">
                                    <Image
                                        src={type.image}
                                        alt={type.label}
                                        fill
                                        sizes="(max-width: 768px) 120px, 150px"
                                        className="object-contain"
                                    />
                                </div>

                                <span className="mt-3 text-2xl md:text-3xl font-semibold text-foreground leading-none">
                                    {type.isBrandNew ? <Star className="inline h-5 w-5 fill-current mr-1" /> : null}
                                    {type.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
