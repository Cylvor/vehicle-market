"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function QuickSearchInput({ initialQuery = "" }: { initialQuery?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sync with URL
    const qParam = searchParams.get("q") ?? "";
    useEffect(() => {
        setSearchQuery(qParam);
    }, [qParam]);

    const updateParams = useCallback(
        (value: string | undefined) => {
            const next = new URLSearchParams(searchParams.toString());
            if (value) {
                next.set("q", value);
            } else {
                next.delete("q");
            }
            const q = next.toString();
            router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
        },
        [pathname, router, searchParams]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => updateParams(value || undefined), 300);
    };

    return (
        <div className="relative flex items-center bg-slate-100/80 rounded-md p-1.5 focus-within:ring-2 ring-blue-500/20 transition-all w-full sm:w-[320px]">
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
    );
}
