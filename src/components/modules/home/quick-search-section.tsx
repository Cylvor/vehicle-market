"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BODY_TYPES = [
    { label: "Brand-new", image: "/images/body-types/Brand new.png", isBrandNew: true },
    { label: "SUV", image: "/images/body-types/SUV.png", value: "SUV" },
    { label: "Ute", image: "/images/body-types/UTE.png", value: "Ute" },
    { label: "Hatch", image: "/images/body-types/Hatch.png", value: "Hatchback" },
    { label: "Offroad 4x4", image: "/images/body-types/offroad4x4.png", value: "SUV" },
    { label: "Electric", image: "/images/body-types/Electric.png" },
    { label: "Performance", image: "/images/body-types/Performance.png" },
];

const MAKE_MODELS: Record<string, string[]> = {
    Toyota: ["Corolla", "Camry", "RAV4", "Hilux"],
    Mazda: ["Mazda3", "CX-5", "BT-50", "CX-9"],
    Ford: ["Ranger", "Everest", "Mustang", "Focus"],
    Hyundai: ["i30", "Tucson", "Santa Fe", "Kona"],
    Mitsubishi: ["Triton", "Outlander", "ASX", "Pajero Sport"],
    Kia: ["Sportage", "Cerato", "Seltos", "Sorento"],
    Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
    BMW: ["3 Series", "X3", "X5", "M3"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"],
};

const BODY_TYPE_OPTIONS = ["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Convertible", "Van", "Wagon"];
const LOCATION_OPTIONS = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export function QuickSearchSection() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedBodyType, setSelectedBodyType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const makeOptions = Object.keys(MAKE_MODELS);
    const modelOptions = selectedMake ? MAKE_MODELS[selectedMake] ?? [] : [];

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
                threshold: 0,
                rootMargin: "0px 0px -2% 0px",
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    function buildSearchQuery(overrides?: {
        make?: string;
        model?: string;
        bodyType?: string;
        location?: string;
    }) {
        const params = new URLSearchParams();
        const make = overrides?.make ?? selectedMake;
        const model = overrides?.model ?? selectedModel;
        const bodyType = overrides?.bodyType ?? selectedBodyType;
        const location = overrides?.location ?? selectedLocation;

        if (make) params.set("make", make);
        if (model) params.set("model", model);
        if (bodyType) params.set("bodyType", bodyType);
        if (location) params.set("location", location);

        return params.toString();
    }

    function handleSubmit() {
        const query = buildSearchQuery();
        router.push(query ? `/search?${query}` : "/search");
    }

    function handleClearAll() {
        setSelectedMake("");
        setSelectedModel("");
        setSelectedBodyType("");
        setSelectedLocation("");
        router.push("/search");
    }

    function handleBodyTypeTileClick(bodyType?: string) {
        if (!bodyType) {
            router.push("/search");
            return;
        }

        setSelectedBodyType(bodyType);
        const query = buildSearchQuery({ bodyType });
        router.push(query ? `/search?${query}` : "/search");
    }

    return (
        <section
            id="quick-search"
            ref={sectionRef}
            className={`pt-10 lg:pt-14 pb-16 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            <div className="container-width">
                <div className="rounded-3xl border border-border shadow-sm bg-card p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8 border-b border-border/50 mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Find your next car</h2>
                            <p className="mt-2 text-muted-foreground text-lg">Search through thousands of verified listings.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3 rounded-full bg-accent/10 px-6 py-3 border border-transparent shadow-none">
                            <Sparkles className="h-5 w-5 text-foreground" />
                            <span className="text-lg font-bold text-foreground">Quick search</span>
                            <Badge className="ml-2 bg-foreground text-background hover:bg-foreground/90 rounded-full px-3">NEW</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground ml-1">Make</label>
                            <div className="relative">
                                <select
                                    className="h-[60px] w-full appearance-none rounded-2xl border-2 border-slate-200 bg-background px-6 text-lg font-medium text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-0 focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedMake}
                                    onChange={(event) => {
                                        const nextMake = event.target.value;
                                        setSelectedMake(nextMake);
                                        setSelectedModel("");
                                    }}
                                >
                                    <option value="">All makes</option>
                                    {makeOptions.map((make) => (
                                        <option key={make} value={make}>
                                            {make}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground ml-1">Model</label>
                            <div className="relative">
                                <select
                                    className="h-[60px] w-full appearance-none rounded-2xl border-2 border-slate-200 bg-background px-6 text-lg font-medium text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-0 focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedModel}
                                    onChange={(event) => setSelectedModel(event.target.value)}
                                    disabled={!selectedMake}
                                >
                                    <option value="">All models</option>
                                    {modelOptions.map((model) => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground ml-1">Body type</label>
                            <div className="relative">
                                <select
                                    className="h-[60px] w-full appearance-none rounded-2xl border-2 border-slate-200 bg-background px-6 text-lg font-medium text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-0 focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedBodyType}
                                    onChange={(event) => setSelectedBodyType(event.target.value)}
                                >
                                    <option value="">All body types</option>
                                    {BODY_TYPE_OPTIONS.map((bodyType) => (
                                        <option key={bodyType} value={bodyType}>
                                            {bodyType}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-base font-bold text-foreground ml-1">Location</label>
                            <div className="relative">
                                <select
                                    className="h-[60px] w-full appearance-none rounded-2xl border-2 border-slate-200 bg-background px-6 text-lg font-medium text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-0 focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedLocation}
                                    onChange={(event) => setSelectedLocation(event.target.value)}
                                >
                                    <option value="">All states</option>
                                    {LOCATION_OPTIONS.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-end">
                            <Button 
                                className="h-[60px] w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/30" 
                                onClick={handleSubmit}
                            >
                                <Search className="mr-2 h-6 w-6" />
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-y-4 pt-4">
                        <div className="flex flex-wrap items-center gap-6 text-foreground/80">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Filters:</span>
                            <button className="text-base font-medium hover:text-primary transition-colors underline-offset-4 hover:underline">New Arrivals</button>
                            <button className="text-base font-medium hover:text-primary transition-colors underline-offset-4 hover:underline">Under $50k</button>
                            <button className="text-base font-medium hover:text-primary transition-colors underline-offset-4 hover:underline">Electric</button>
                            <button className="text-base font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1" onClick={handleClearAll}>
                                Clear all filters
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5 pt-7">
                        {BODY_TYPES.map((type) => (
                            <button
                                key={type.label}
                                className="group flex flex-col items-center text-center"
                                onClick={() => handleBodyTypeTileClick(type.value)}
                            >
                                <div className="relative h-16 w-full max-w-[160px]">
                                    <Image
                                        src={type.image}
                                        alt={type.label}
                                        fill
                                        sizes="(max-width: 768px) 130px, 160px"
                                        className="object-contain"
                                    />
                                </div>

                                <span className="mt-3 text-xl md:text-xl font-semibold text-foreground leading-none">
                                    {type.isBrandNew ? <Star className="inline h-6 w-6 fill-current mr-1" /> : null}
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
