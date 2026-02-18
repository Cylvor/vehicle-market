"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, SlidersHorizontal } from "lucide-react";
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
    const inputRef = useRef<HTMLInputElement | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const make = searchParams.get("make") ?? undefined;
    const minPrice = searchParams.get("minPrice") ?? "";
    const maxPrice = searchParams.get("maxPrice") ?? "";
    const bodyType = searchParams.get("bodyType") ?? undefined;
    const minYear = searchParams.get("minYear") ?? "";
    const maxYear = searchParams.get("maxYear") ?? "";

    // Count active filters
    const activeFiltersCount = [
        qParam,
        make,
        bodyType,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
    ].filter(Boolean).length;

    // Keep input in sync when URL changes (reset, back/forward, etc.)
    useEffect(() => {
        if (!inputRef.current) return;
        if (inputRef.current.value !== qParam) {
            inputRef.current.value = qParam;
        }
    }, [qParam]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!value) {
            updateParams({ q: undefined });
            return;
        }

        debounceRef.current = setTimeout(() => updateParams({ q: value }), 300);
    };

    const handleSearchSubmit = (value?: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const nextValue = value ?? inputRef.current?.value ?? "";
        updateParams({ q: nextValue || undefined });
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchSubmit((e.target as HTMLInputElement).value);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const handleReset = () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (inputRef.current) inputRef.current.value = "";
        updateParams({
            q: undefined,
            make: undefined,
            model: undefined,
            bodyType: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            minYear: undefined,
            maxYear: undefined,
            sort: undefined,
        });
    };

    return (
        <aside className="sticky top-6 h-fit">
            <div className="rounded-2xl border border-border/70 bg-card shadow-sm p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                            <SlidersHorizontal className="h-4 w-4" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">Filters</h3>
                        {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-2 py-0.5 text-xs font-semibold">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </div>
                    {activeFiltersCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={handleReset}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Search Input */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">Search Vehicles</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Make, model, or variant..."
                            className="pl-10 h-11 rounded-xl border-2 border-border/70 bg-background transition-all hover:border-primary/50 focus:border-primary focus:ring-0"
                            ref={inputRef}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                            onBlur={(e) => handleSearchSubmit((e.target as HTMLInputElement).value)}
                        />
                    </div>
                </div>

                {/* Accordion Filters */}
                <Accordion type="multiple" defaultValue={["make", "price", "body", "year"]} className="w-full">
                    {/* Make & Model */}
                    <AccordionItem value="make" className="border-b border-border/50">
                        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-3">
                            Make & Model
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                                {MAKES.map((m) => (
                                    <div key={m} className="flex items-center space-x-3 group">
                                        <Checkbox
                                            id={`filter-make-${m}`}
                                            checked={make === m}
                                            onCheckedChange={(checked) =>
                                                updateParams({ make: checked ? m : undefined })
                                            }
                                            className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <Label
                                            htmlFor={`filter-make-${m}`}
                                            className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors flex-1"
                                        >
                                            {m}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Price Range */}
                    <AccordionItem value="price" className="border-b border-border/50">
                        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-3">
                            Price Range
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">Min Price</Label>
                                    <Input
                                        type="number"
                                        placeholder="$0"
                                        min={0}
                                        value={minPrice}
                                        onChange={(e) => updateParams({ minPrice: e.target.value || undefined })}
                                        className="h-10 rounded-xl border-2 border-border/70 bg-background transition-all hover:border-primary/50 focus:border-primary focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">Max Price</Label>
                                    <Input
                                        type="number"
                                        placeholder="$∞"
                                        min={0}
                                        value={maxPrice}
                                        onChange={(e) => updateParams({ maxPrice: e.target.value || undefined })}
                                        className="h-10 rounded-xl border-2 border-border/70 bg-background transition-all hover:border-primary/50 focus:border-primary focus:ring-0"
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Body Type */}
                    <AccordionItem value="body" className="border-b border-border/50">
                        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-3">
                            Body Type
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="space-y-3">
                                {BODY_TYPES.map((type) => (
                                    <div key={type} className="flex items-center space-x-3 group">
                                        <Checkbox
                                            id={`filter-body-${type}`}
                                            checked={bodyType === type}
                                            onCheckedChange={(checked) =>
                                                updateParams({ bodyType: checked ? type : undefined })
                                            }
                                            className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <Label
                                            htmlFor={`filter-body-${type}`}
                                            className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors flex-1"
                                        >
                                            {type}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Year */}
                    <AccordionItem value="year" className="border-b-0">
                        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-3">
                            Year
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">From</Label>
                                    <Input
                                        type="number"
                                        placeholder="1900"
                                        min={1900}
                                        max={2100}
                                        value={minYear}
                                        onChange={(e) => updateParams({ minYear: e.target.value || undefined })}
                                        className="h-10 rounded-xl border-2 border-border/70 bg-background transition-all hover:border-primary/50 focus:border-primary focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">To</Label>
                                    <Input
                                        type="number"
                                        placeholder="2025"
                                        min={1900}
                                        max={2100}
                                        value={maxYear}
                                        onChange={(e) => updateParams({ maxYear: e.target.value || undefined })}
                                        className="h-10 rounded-xl border-2 border-border/70 bg-background transition-all hover:border-primary/50 focus:border-primary focus:ring-0"
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Reset Button */}
                {activeFiltersCount > 0 && (
                    <Button
                        variant="outline"
                        className="w-full h-11 rounded-xl border-2 border-border/70 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all font-semibold"
                        onClick={handleReset}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                    </Button>
                )}
            </div>
        </aside>
    );
}

// Sort Select Component
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
            <span className="text-sm font-semibold text-muted-foreground">Sort by:</span>
            <div className="relative">
                <select
                    className="h-10 w-[200px] appearance-none rounded-xl border-2 border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-0 focus:shadow-md cursor-pointer"
                    value={current}
                    onChange={handleChange}
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
