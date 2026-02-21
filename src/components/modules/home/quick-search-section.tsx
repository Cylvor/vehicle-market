"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Star, ChevronDown, RotateCcw } from "lucide-react";
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
};

const PRICE_OPTIONS = ["10000", "20000", "30000", "40000", "50000", "75000", "100000"];
const BODY_TYPE_OPTIONS = ["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Van"];
const LOCATION_OPTIONS = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export function QuickSearchSection() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Filter States
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedBodyType, setSelectedBodyType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const makeOptions = Object.keys(MAKE_MODELS);
    const modelOptions = selectedMake ? MAKE_MODELS[selectedMake] ?? [] : [];

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(node); }
        }, { threshold: 0.1 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const handleClearAll = () => {
        setSelectedMake(""); setSelectedModel(""); setSelectedBodyType("");
        setSelectedLocation(""); setMinPrice(""); setMaxPrice("");
    };

    const handleSubmit = () => {
        const params = new URLSearchParams();
        if (selectedMake) params.set("make", selectedMake);
        if (selectedModel) params.set("model", selectedModel);
        if (selectedBodyType) params.set("bodyType", selectedBodyType);
        if (selectedLocation) params.set("location", selectedLocation);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        router.push(`/search?${params.toString()}`);
    };

    const inputClasses = "h-[50px] w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 transition-all hover:border-blue-900/30 focus:border-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-900/5 cursor-pointer";

    return (
        <section ref={sectionRef} className={`py-12 bg-slate-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="container-width px-6">
                <div className="rounded-[32px] bg-white border border-slate-200/60 shadow-xl p-8 md:p-10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Find your next car</h2>
                            <p className="mt-1 text-slate-500">Browse thousands of trusted local listings.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={handleClearAll} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors">
                                <RotateCcw className="h-4 w-4" /> Clear Filters
                            </button>
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                                <Sparkles className="h-4 w-4 text-blue-900" />
                                <span className="text-xs font-bold text-blue-900 uppercase tracking-tight">Quick Search</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Grid - Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Make</label>
                            <div className="relative">
                                <select className={inputClasses} value={selectedMake} onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel(""); }}>
                                    <option value="">All makes</option>
                                    {makeOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Model</label>
                            <div className="relative">
                                <select className={inputClasses} value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake}>
                                    <option value="">All models</option>
                                    {modelOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Body Type</label>
                            <div className="relative">
                                <select className={inputClasses} value={selectedBodyType} onChange={(e) => setSelectedBodyType(e.target.value)}>
                                    <option value="">Any body type</option>
                                    {BODY_TYPE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                            <div className="relative">
                                <select className={inputClasses} value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                                    <option value="">All locations</option>
                                    {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Filter Grid - Row 2 (Price & Search) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Min Price</label>
                            <div className="relative">
                                <select className={inputClasses} value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                                    <option value="">No Min</option>
                                    {PRICE_OPTIONS.map(p => <option key={p} value={p}>${Number(p).toLocaleString()}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Max Price</label>
                            <div className="relative">
                                <select className={inputClasses} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                                    <option value="">No Max</option>
                                    {PRICE_OPTIONS.map(p => <option key={p} value={p}>${Number(p).toLocaleString()}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <Button onClick={handleSubmit} className="h-[50px] w-full rounded-[6px] bg-[#001f3f] hover:bg-blue-900 text-white font-bold text-lg shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98]">
                                <Search className="mr-2 h-5 w-5" /> Search
                            </Button>
                        </div>
                    </div>

                    {/* Body Type Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 pt-10 mt-8 border-t border-slate-100">
                        {BODY_TYPES.map((type) => (
                            <button key={type.label} className="group flex flex-col items-center p-3 rounded-2xl hover:bg-slate-50 transition-all" onClick={() => { setSelectedBodyType(type.value || type.label); handleSubmit(); }}>
                                <div className="relative h-10 w-full max-w-[100px] transition-transform group-hover:scale-110">
                                    <Image src={type.image} alt={type.label} fill className="object-contain" />
                                </div>
                                <span className="mt-3 text-[13px] font-bold text-slate-600 flex items-center gap-1 group-hover:text-blue-900">
                                    {type.isBrandNew && <Star className="h-3 w-3 fill-blue-900 text-blue-900" />} {type.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}