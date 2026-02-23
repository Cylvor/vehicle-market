"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    MessageSquare,
    Car,
    LogOut,
    PlusCircle,
    TrendingUp,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col h-full bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden min-h-[calc(100vh-8rem)] text-slate-300">

            <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                <Link href="/sell/create" className="w-full">
                    <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20 shadow-lg font-semibold rounded-xl border-none">
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
                                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-slate-800 text-white shadow-inner"
                                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-emerald-400" : "text-slate-500")} />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-xl transition-colors"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                >
                    <LogOut className="h-4 w-4" />
                    {isSigningOut ? "Signing Out..." : "Sign Out"}
                </Button>
            </div>
        </div>
    );
}
