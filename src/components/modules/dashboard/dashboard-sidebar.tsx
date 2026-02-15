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
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Listings",
        href: "/dashboard/listings",
        icon: Car,
    },
    {
        title: "Messages Received",
        href: "/dashboard/messages",
        icon: MessageSquare,
    },
    {
        title: "Performance",
        href: "/dashboard/performance",
        icon: TrendingUp,
    },
    {
        title: "Invoices",
        href: "/dashboard/invoices",
        icon: FileText,
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") === "seller" ? "seller" : "buyer";

    const items = mode === "seller" ? sellerItems : buyerItems;

    return (
        <div className="flex flex-col h-full bg-card border-r border-border/50 min-h-[calc(100vh-4rem)]">

            {mode === "seller" && (
                <div className="p-4 border-b border-border/50 bg-primary/5">
                    <Link href="/sell/create" className="w-full">
                        <Button className="w-full gap-2 shadow-premium font-semibold">
                            <PlusCircle className="h-4 w-4" />
                            Create Listing
                        </Button>
                    </Link>
                </div>
            )}

            <div className="flex-1 py-6 space-y-6">
                <div className="px-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                        {mode === 'seller' ? 'Seller Tools' : 'Buyer Tools'}
                    </div>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={`${item.href}?mode=${mode}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-border/50">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
