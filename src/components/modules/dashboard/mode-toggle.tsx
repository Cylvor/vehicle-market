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
        <div className="w-full border-b border-slate-200 bg-white">
            <div className="w-full px-4 md:px-6 flex items-center justify-between">
                <Tabs value={currentMode} onValueChange={onTabChange}>
                    <TabsList className="bg-transparent p-0 h-10 w-full justify-start rounded-none border-b-0">
                        <TabsTrigger
                            value="buyer"
                            className="relative h-10 rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-bold text-slate-500 shadow-none transition-none data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none hover:text-slate-900"
                        >
                            Buying Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="seller"
                            className="relative h-10 rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-bold text-slate-500 shadow-none transition-none data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none hover:text-slate-900"
                        >
                            Selling Dashboard
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                    <UserSettingsModal>
                        <Button variant="outline" size="sm" className="h-8 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 shadow-sm font-bold px-3">
                            <Settings className="h-4 w-4 sm:mr-1.5" />
                            <span className="hidden sm:inline">Settings</span>
                        </Button>
                    </UserSettingsModal>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 hover:border-rose-300 shadow-sm font-bold px-3"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                    >
                        <LogOut className="h-4 w-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
