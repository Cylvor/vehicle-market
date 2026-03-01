"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { UserSettingsModal } from "@/components/modules/dashboard/user-settings-modal";

export function DashboardModeToggle({ currentMode }: { currentMode: "buyer" | "seller" }) {
    const router = useRouter();
    const { signOut } = useClerk();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const onTabChange = (value: string) => {
        if (value === "buyer") {
            router.push("/dashboard/buyer");
        } else {
            router.push("/dashboard/seller");
        }
    };

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);
        await signOut({ redirectUrl: "/" });
    };

    return (
        <div className="w-full border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Tabs value={currentMode} onValueChange={onTabChange}>
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

                <div className="flex items-center gap-1 sm:gap-2">
                    <UserSettingsModal>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                            <Settings className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Settings</span>
                        </Button>
                    </UserSettingsModal>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-500"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                    >
                        <LogOut className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
