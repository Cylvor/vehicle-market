"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Heart,
    MessageSquare,
    Car,
    Settings,
    LogOut,
    PlusCircle,
    TrendingUp,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const buyerItems = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Saved Vehicles",
        href: "/dashboard/saved",
        icon: Heart,
    },
    {
        title: "Enquiries Sent",
        href: "/dashboard/enquiries",
        icon: MessageSquare,
    },
    {
        title: "Account Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

const sellerItems = [
    {
        title: "Overview",
        href: "/dashboard", // Same overview page, but content changes via param
        icon: LayoutDashboard,
    },
    {
        title: "My Listings",
        href: "/dashboard/listings",
        icon: Car,
    },
    {
        title: "Messages Received",
        href: "/dashboard/messages", // Placeholder
        icon: MessageSquare,
    },
    {
        title: "Performance",
        href: "/dashboard/performance", // Placeholder
        icon: TrendingUp,
    },
    {
        title: "Invoices",
        href: "/dashboard/invoices", // Placeholder
        icon: FileText,
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") === "seller" ? "seller" : "buyer";

    const items = mode === "seller" ? sellerItems : buyerItems;

    return (
        <div className="flex flex-col h-full border-r bg-muted/10 min-h-[calc(100vh-8rem)] rounded-lg">

            {mode === "seller" && (
                <div className="p-4 border-b bg-primary/5">
                    <Link href="/sell/create">
                        <Button className="w-full gap-2 shadow-sm">
                            <PlusCircle className="h-4 w-4" />
                            Create Listing
                        </Button>
                    </Link>
                </div>
            )}

            <div className="flex-1 px-3 py-4 space-y-2">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {mode === 'seller' ? 'Seller Tools' : 'Buyer Tools'}
                </div>
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={`${item.href}?mode=${mode}`} // Persist mode in links
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 text-sm">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
