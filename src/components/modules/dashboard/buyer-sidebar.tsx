"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Heart,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { UserSettingsModal } from "@/components/modules/dashboard/user-settings-modal";
import { DashboardModeToggle } from "@/components/modules/dashboard/mode-toggle";

const buyerItems = [
    {
        title: "Overview",
        href: "/dashboard/buyer",
        icon: LayoutDashboard,
    },
    {
        title: "Saved Vehicles",
        href: "/dashboard/buyer/saved",
        icon: Heart,
    },
    {
        title: "Enquiries Sent",
        href: "/dashboard/buyer/enquiries",
        icon: MessageSquare,
    },
];

export function BuyerSidebar() {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        if (isSigningOut) return;
        setIsSigningOut(true);
        await signOut({ redirectUrl: "/" });
    };

    return (
        <div className="flex flex-col min-h-full bg-white text-slate-600">
            {/* Dashboard Mode Switcher */}
            <DashboardModeToggle currentMode="buyer" />

            <div className="flex-1 py-6 space-y-6">
                <div className="px-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                        Buyer Tools
                    </div>
                    <div className="space-y-1">
                        {buyerItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                                        : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-blue-600" : "text-slate-400")} />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Account Management footer section */}
            <div className="px-4 py-6 border-t border-slate-100 mt-auto bg-slate-50/50">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                    Account
                </div>
                <div className="space-y-1">
                    <UserSettingsModal>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-200 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                            <Settings className="h-4 w-4 text-slate-400" />
                            Settings
                        </button>
                    </UserSettingsModal>
                    <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-200 font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                        <LogOut className="h-4 w-4 text-slate-400" />
                        {isSigningOut ? "Signing out..." : "Sign out"}
                    </button>
                </div>
            </div>
        </div>
    );
}
