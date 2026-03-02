"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    MessageSquare,
    Car,
    PlusCircle,
    TrendingUp,
    FileText,
    Settings,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { UserSettingsModal } from "@/components/modules/dashboard/user-settings-modal";
import { DashboardModeToggle } from "@/components/modules/dashboard/mode-toggle";

const sellerItems = [
    {
        title: "Overview",
        href: "/dashboard/seller",
        icon: LayoutDashboard,
    },
    {
        title: "My Listings",
        href: "/dashboard/seller/listings",
        icon: Car,
    },
    {
        title: "Messages Received",
        href: "/dashboard/seller/messages",
        icon: MessageSquare,
    },
    {
        title: "Performance",
        href: "/dashboard/seller/performance",
        icon: TrendingUp,
    },
    {
        title: "Invoices",
        href: "/dashboard/seller/invoices",
        icon: FileText,
    },
];

export function SellerSidebar() {
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
            <DashboardModeToggle currentMode="seller" />

            <div className="p-4 border-b border-slate-100 bg-white">
                <Link href="/sell/create" className="w-full">
                    <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 shadow-lg font-bold rounded-md border-none">
                        <PlusCircle className="h-4 w-4" />
                        Create Listing
                    </Button>
                </Link>
            </div>

            <div className="flex-1 py-6 space-y-6">
                <div className="px-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                        Seller Tools
                    </div>
                    <div className="space-y-1">
                        {sellerItems.map((item) => (
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
