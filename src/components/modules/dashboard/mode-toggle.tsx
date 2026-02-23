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
        <div className="w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <Tabs value={currentMode} onValueChange={onTabChange} className="w-full">
                    <TabsList className="bg-transparent p-0 h-12 w-full justify-start rounded-none border-b-0">
                        <TabsTrigger
                            value="buyer"
                            className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-slate-500 shadow-none transition-none data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none hover:text-slate-900 dark:hover:text-white"
                        >
                            Buying Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="seller"
                            className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-slate-500 shadow-none transition-none data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none hover:text-slate-900 dark:hover:text-white"
                        >
                            Selling Dashboard
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
