"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Bookmark, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MAKES = ["Toyota", "Mazda", "Ford", "Hyundai", "Mitsubishi", "Kia", "Tesla", "BMW", "Mercedes-Benz"];
const BODY_TYPES = ["SUV", "Ute", "Sedan", "Hatchback", "Convertible", "Van", "Coupe", "Wagon"];

const SORT_OPTIONS = [
    { value: "newest", label: "Newest Listed" },
    { value: "oldest", label: "Oldest Listed" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
] as const;

function useUpdateSearchParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useCallback(
        (updates: Record<string, string | undefined>) => {
            const next = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(updates)) {
                if (value === undefined || value === "") {
                    next.delete(key);
                } else {
                    next.set(key, value);
                }
            }
            const q = next.toString();
            router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
        },
        [pathname, router, searchParams]
    );
}

export function FilterSidebar() {
    const searchParams = useSearchParams();
    const updateParams = useUpdateSearchParams();

    const qParam = searchParams.get("q") ?? "";
    const make = searchParams.get("make") ?? undefined;
    const bodyType = searchParams.get("bodyType") ?? undefined;
    const minPriceParam = searchParams.get("minPrice") ?? "";
    const maxPriceParam = searchParams.get("maxPrice") ?? "";
    const minYearParam = searchParams.get("minYear") ?? "";
    const maxYearParam = searchParams.get("maxYear") ?? "";

    const [searchQuery, setSearchQuery] = useState(qParam);
    const [minPrice, setMinPrice] = useState(minPriceParam);
    const [maxPrice, setMaxPrice] = useState(maxPriceParam);
    const [minYear, setMinYear] = useState(minYearParam);
    const [maxYear, setMaxYear] = useState(maxYearParam);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => setSearchQuery(qParam), [qParam]);
    useEffect(() => setMinPrice(minPriceParam), [minPriceParam]);
    useEffect(() => setMaxPrice(maxPriceParam), [maxPriceParam]);
    useEffect(() => setMinYear(minYearParam), [minYearParam]);
    useEffect(() => setMaxYear(maxYearParam), [maxYearParam]);

    const activeFiltersCount = [qParam, make, bodyType, minPriceParam, maxPriceParam, minYearParam, maxYearParam].filter(Boolean).length;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => updateParams({ q: value || undefined }), 300);
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        if (type === 'min') {
            setMinPrice(value);
            updateParams({ minPrice: value || undefined });
        } else {
            setMaxPrice(value);
            updateParams({ maxPrice: value || undefined });
        }
    };

    const handleYearChange = (type: 'min' | 'max', value: string) => {
        if (type === 'min') {
            setMinYear(value);
            updateParams({ minYear: value || undefined });
        } else {
            setMaxYear(value);
            updateParams({ maxYear: value || undefined });
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setMinPrice("");
        setMaxPrice("");
        setMinYear("");
        setMaxYear("");
        updateParams({
            q: undefined, make: undefined, model: undefined, bodyType: undefined,
            minPrice: undefined, maxPrice: undefined, minYear: undefined, maxYear: undefined, sort: undefined,
        });
    };

    return (
        <aside className="sticky top-28 h-fit space-y-6">
            <Button variant="outline" className="w-[140px] border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full h-10 font-semibold bg-white shadow-sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save search
            </Button>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Filters</h3>
                    {activeFiltersCount > 0 && (
                        <button onClick={handleReset} className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors">
                            Clear all
                        </button>
                    )}
                </div>

                <div className="relative flex items-center bg-slate-100/80 rounded-lg p-1.5 focus-within:ring-2 ring-blue-500/20 transition-all">
                    <Sparkles className="h-5 w-5 text-blue-600 ml-2 shrink-0" />
                    <Input
                        placeholder="Quick search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-base font-medium placeholder:text-slate-500 h-9"
                    />
                    <Badge variant="outline" className="mr-2 border-slate-300 text-[10px] font-bold tracking-wider px-1.5 py-0.5 uppercase bg-white text-slate-600">
                        New
                    </Badge>
                    <Search className="h-5 w-5 text-slate-400 mr-2 shrink-0 cursor-pointer" />
                </div>

                <div className="flex flex-col pt-2 border-t border-slate-100">
                    <FilterRow title="Location" isActive={false}><p className="text-slate-500">Location selection coming soon.</p></FilterRow>

                    <FilterRow title="Year" isActive={!!(minYearParam || maxYearParam)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Min Year</Label>
                                <Input type="number" placeholder="From" value={minYear} onChange={(e) => handleYearChange('min', e.target.value)} className="rounded-lg h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Max Year</Label>
                                <Input type="number" placeholder="To" value={maxYear} onChange={(e) => handleYearChange('max', e.target.value)} className="rounded-lg h-11" />
                            </div>
                        </div>
                    </FilterRow>

                    <FilterRow title="Make" isActive={!!make}>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {MAKES.map((m) => (
                                <div key={m} className="flex items-center space-x-3 group">
                                    <Checkbox id={`make-${m}`} checked={make === m} onCheckedChange={(c) => updateParams({ make: c ? m : undefined })} className="h-5 w-5 rounded-[6px] border-slate-300 data-[state=checked]:bg-blue-600" />
                                    <Label htmlFor={`make-${m}`} className="text-base font-medium cursor-pointer flex-1 group-hover:text-blue-600 transition-colors">
                                        {m}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </FilterRow>

                    <FilterRow title="Body type" isActive={!!bodyType}>
                        <div className="space-y-4">
                            {BODY_TYPES.map((type) => (
                                <div key={type} className="flex items-center space-x-3 group">
                                    <Checkbox id={`body-${type}`} checked={bodyType === type} onCheckedChange={(c) => updateParams({ bodyType: c ? type : undefined })} className="h-5 w-5 rounded-[6px] border-slate-300 data-[state=checked]:bg-blue-600" />
                                    <Label htmlFor={`body-${type}`} className="text-base font-medium cursor-pointer flex-1 group-hover:text-blue-600 transition-colors">
                                        {type}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </FilterRow>

                    <FilterRow title="Price" isActive={!!(minPriceParam || maxPriceParam)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Min Price</Label>
                                <Input type="number" placeholder="$0" value={minPrice} onChange={(e) => handlePriceChange('min', e.target.value)} className="rounded-lg h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-600 font-semibold">Max Price</Label>
                                <Input type="number" placeholder="$ Any" value={maxPrice} onChange={(e) => handlePriceChange('max', e.target.value)} className="rounded-lg h-11" />
                            </div>
                        </div>
                    </FilterRow>
                </div>
            </div>
        </aside>
    );
}

function FilterRow({ title, children, isActive }: { title: string, children: React.ReactNode, isActive: boolean }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center justify-between py-4 cursor-pointer group border-b border-slate-100 last:border-0 hover:bg-slate-50/50 -mx-6 px-6 transition-colors">
                    <span className="text-[16px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        {title}
                        {isActive && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900">{title}</DialogTitle>
                </DialogHeader>
                <div className="pt-4 pb-2">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function SortSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const current = searchParams.get("sort") || "newest";

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            const next = new URLSearchParams(searchParams.toString());
            if (value && value !== "newest") {
                next.set("sort", value);
            } else {
                next.delete("sort");
            }
            const q = next.toString();
            router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700 hidden sm:block">Sort by:</span>
            <div className="relative">
                <select
                    className="h-11 w-full sm:w-[220px] appearance-none border border-slate-200 bg-white px-4 py-2 pr-10 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg cursor-pointer"
                    value={current}
                    onChange={handleChange}
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
}