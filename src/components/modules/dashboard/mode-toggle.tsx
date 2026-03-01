"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export function DashboardModeToggle({ currentMode }: { currentMode: "buyer" | "seller" }) {
    const router = useRouter();

    const onTabChange = (value: string) => {
        if (value === "buyer") {
            router.push("/dashboard/buyer");
        } else {
            router.push("/dashboard/seller");
        }
    };

    return (
        <div className="w-full bg-white px-4 py-4 border-b border-slate-100">
            <Tabs value={currentMode} onValueChange={onTabChange} className="w-full">
                <TabsList className="bg-slate-100/50 p-1 h-12 w-full grid grid-cols-2 rounded-xl border border-slate-200">
                    <TabsTrigger
                        value="buyer"
                        className="relative h-9.5 rounded-lg border border-transparent px-3 py-2 text-sm font-bold text-slate-500 shadow-none transition-all data-[state=active]:bg-white data-[state=active]:border-slate-200 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:text-slate-900"
                    >
                        Buying
                    </TabsTrigger>
                    <TabsTrigger
                        value="seller"
                        className="relative h-9.5 rounded-lg border border-transparent px-3 py-2 text-sm font-bold text-slate-500 shadow-none transition-all data-[state=active]:bg-white data-[state=active]:border-slate-200 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:text-slate-900"
                    >
                        Selling
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
