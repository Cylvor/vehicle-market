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
        <div className="flex flex-col min-h-full bg-white text-slate-600 pb-10">
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
        </div>
    );
}
