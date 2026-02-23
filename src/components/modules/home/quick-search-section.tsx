"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Star, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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

function CustomSelect({
    value,
    onChange,
    options,
    placeholder,
    disabled = false
}: {
    value: string;
    onChange: (val: string) => void;
    options: { label: string; value: string }[];
    placeholder: string;
    disabled?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-focus the search input when the dropdown opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10);
        } else {
            setSearchTerm(""); // Reset search when closed
        }
    }, [isOpen]);

    const selectedOption = options.find(o => o.value === value);
    const filteredOptions = options.filter(o => o.label.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                className={`h-[56px] w-full rounded-md bg-slate-50 border border-transparent px-4 text-left text-[15px] font-semibold transition-colors flex items-center justify-between shadow-sm
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 focus:bg-white focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer'}
                    ${value ? 'text-slate-900' : 'text-slate-400'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span className="block truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-2 rounded-md bg-white shadow-2xl shadow-slate-200/50 border border-slate-100/80 overflow-hidden flex flex-col max-h-[320px] ring-1 ring-slate-900/5">
                    {/* Search Input */}
                    <div className="p-2 border-b border-slate-100/80 bg-slate-50/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full h-[40px] pl-9 pr-4 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-slate-700 placeholder-slate-400 transition-all"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto flex-1 py-1.5 min-h-0">
                        {!searchTerm && (
                            <button
                                type="button"
                                className={`w-full text-left px-5 py-3 text-[15px] font-medium transition-colors hover:bg-slate-50
                                    ${!value ? 'bg-blue-50/50 text-blue-700' : 'text-slate-500'}`}
                                onClick={() => { onChange(""); setIsOpen(false); }}
                            >
                                {placeholder}
                            </button>
                        )}
                        {filteredOptions.length === 0 ? (
                            <div className="px-5 py-4 text-sm font-medium text-slate-400 text-center">No results found</div>
                        ) : (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`w-full text-left px-5 py-3 text-[15px] font-medium transition-colors hover:bg-slate-50
                                        ${value === option.value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function QuickSearchSection() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Filter States
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedBodyType, setSelectedBodyType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

    const makeOptions = Object.keys(MAKE_MODELS);
    const modelOptions = selectedMake ? MAKE_MODELS[selectedMake] ?? [] : [];

    // Mapped Options
    const makeOptionsList = makeOptions.map(m => ({ label: m, value: m }));
    const modelOptionsList = modelOptions.map(m => ({ label: m, value: m }));
    const bodyTypeOptionsList = BODY_TYPE_OPTIONS.map(b => ({ label: b, value: b }));
    const locationOptionsList = LOCATION_OPTIONS.map(l => ({ label: l, value: l }));
    const priceOptionsList = PRICE_OPTIONS.map(p => ({ label: `$${Number(p).toLocaleString()}`, value: p }));

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
        setSelectedLocation(""); setPriceRange([0, 100000]);
    };

    const handleSubmit = () => {
        const params = new URLSearchParams();
        if (selectedMake) params.set("make", selectedMake);
        if (selectedModel) params.set("model", selectedModel);
        if (selectedBodyType) params.set("bodyType", selectedBodyType);
        if (selectedLocation) params.set("location", selectedLocation);
        if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
        if (priceRange[1] < 100000) params.set("maxPrice", priceRange[1].toString());
        router.push(`/search?${params.toString()}`);
    };

    return (
        <section ref={sectionRef} className={`py-12 bg-slate-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="container-width px-6">
                <div className="rounded-md bg-white border border-slate-200/60 shadow-md p-8 md:p-10">

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
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-md border border-blue-100">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-bold text-blue-700 uppercase tracking-tight">Quick Search</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Grid - Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Make</label>
                            <CustomSelect
                                value={selectedMake}
                                onChange={(val) => { setSelectedMake(val); setSelectedModel(""); }}
                                options={makeOptionsList}
                                placeholder="All makes"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Model</label>
                            <CustomSelect
                                value={selectedModel}
                                onChange={setSelectedModel}
                                options={modelOptionsList}
                                placeholder="All models"
                                disabled={!selectedMake}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Body Type</label>
                            <CustomSelect
                                value={selectedBodyType}
                                onChange={setSelectedBodyType}
                                options={bodyTypeOptionsList}
                                placeholder="Any body type"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Location</label>
                            <CustomSelect
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                options={locationOptionsList}
                                placeholder="All locations"
                            />
                        </div>
                    </div>

                    {/* Filter Grid - Row 2 (Price & Search) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5 sm:col-span-2 lg:col-span-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Price Range</label>
                                <span className="text-xs font-bold text-blue-600">
                                    ${priceRange[0].toLocaleString()} - {priceRange[1] >= 100000 ? '$100k+' : '$' + priceRange[1].toLocaleString()}
                                </span>
                            </div>
                            <div className="h-[56px] w-full rounded-md bg-slate-50 border border-transparent px-5 flex items-center shadow-sm hover:bg-slate-100 transition-colors">
                                <Slider
                                    defaultValue={[0, 100000]}
                                    value={priceRange}
                                    onValueChange={(val) => setPriceRange(val as [number, number])}
                                    max={100000}
                                    step={1000}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1 lg:col-span-2">
                            <Button onClick={handleSubmit} className="h-[56px] w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 border border-blue-500 transition-all active:scale-[0.98]">
                                <Search className="mr-2 h-5 w-5" /> Search Vehicles
                            </Button>
                        </div>
                    </div>

                    {/* Body Type Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 pt-10 mt-8 border-t border-slate-100">
                        {BODY_TYPES.map((type) => (
                            <button key={type.label} className="group flex flex-col items-center p-3 rounded-md hover:bg-slate-50 transition-all" onClick={() => { setSelectedBodyType(type.value || type.label); handleSubmit(); }}>
                                <div className="relative h-10 w-full max-w-[100px] transition-transform group-hover:scale-110">
                                    <Image src={type.image} alt={type.label} fill className="object-contain" />
                                </div>
                                <span className="mt-3 text-[13px] font-bold text-slate-600 flex items-center gap-1 group-hover:text-blue-600">
                                    {type.isBrandNew && <Star className="h-3 w-3 fill-blue-500 text-blue-500" />} {type.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}