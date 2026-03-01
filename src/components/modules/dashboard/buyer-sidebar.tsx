"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Heart,
    MessageSquare,
} from "lucide-react";

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

    return (
        <div className="flex flex-col h-full bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-md shadow-xl overflow-hidden min-h-[calc(100vh-8rem)] text-slate-300">
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
                                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
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
        </div>
    );
}
