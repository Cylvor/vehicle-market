"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-foreground"
                    onClick={handleReset}
                >
                    Reset All
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={["make", "price", "body", "year"]} className="w-full">
                {/* Make & Model */}
                <AccordionItem value="make">
                    <AccordionTrigger>Make & Model</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <Input
                                placeholder="Search vehicles..."
                                className="mb-2"
                                ref={inputRef}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                                onBlur={(e) => handleSearchSubmit((e.target as HTMLInputElement).value)}
                            />
                            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                {MAKES.map((m) => (
                                    <div key={m} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`filter-make-${m}`}
                                            checked={make === m}
                                            onCheckedChange={(checked) =>
                                                updateParams({ make: checked ? m : undefined })
                                            }
                                        />
                                        <Label htmlFor={`filter-make-${m}`}>{m}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                min={0}
                                value={minPrice}
                                onChange={(e) => updateParams({ minPrice: e.target.value || undefined })}
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                min={0}
                                value={maxPrice}
                                onChange={(e) => updateParams({ maxPrice: e.target.value || undefined })}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Body Type */}
                <AccordionItem value="body">
                    <AccordionTrigger>Body Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {BODY_TYPES.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`filter-body-${type}`}
                                        checked={bodyType === type}
                                        onCheckedChange={(checked) =>
                                            updateParams({ bodyType: checked ? type : undefined })
                                        }
                                    />
                                    <Label htmlFor={`filter-body-${type}`}>{type}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Year */}
                <AccordionItem value="year">
                    <AccordionTrigger>Year</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="number"
                                placeholder="From"
                                min={1900}
                                max={2100}
                                value={minYear}
                                onChange={(e) => updateParams({ minYear: e.target.value || undefined })}
                            />
                            <Input
                                type="number"
                                placeholder="To"
                                min={1900}
                                max={2100}
                                value={maxYear}
                                onChange={(e) => updateParams({ maxYear: e.target.value || undefined })}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
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
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
                className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={current}
                onChange={handleChange}
            >
                {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
