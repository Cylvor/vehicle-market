"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardModeToggle() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentMode = searchParams.get("mode") === "seller" ? "seller" : "buyer";
    const [activeTab, setActiveTab] = useState(currentMode);

    useEffect(() => {
        setActiveTab(currentMode);
    }, [currentMode]);

    const onTabChange = (value: string) => {
        setActiveTab(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("mode", value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                    <TabsList className="bg-transparent p-0 h-12 w-full justify-start rounded-none border-b-0">
                        <TabsTrigger
                            value="buyer"
                            className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            Buying Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="seller"
                            className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            Selling Dashboard
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
