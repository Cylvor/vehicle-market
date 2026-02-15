"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    ShieldCheck,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminItems = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Listings",
        href: "/admin/listings",
        icon: FileText,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Moderation Queue",
        href: "/admin/moderation",
        icon: ShieldCheck,
    },
    {
        title: "Reports",
        href: "/admin/reports",
        icon: AlertCircle,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full border-r bg-zinc-900 text-zinc-100 min-h-[calc(100vh-4rem)]">
            <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <ShieldCheck className="h-6 w-6 text-red-500" />
                    <span>Admin</span>
                </div>
            </div>
            <div className="flex-1 px-4 py-6 space-y-2">
                {adminItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-white",
                            pathname === item.href ? "bg-red-600 text-white" : "text-zinc-400"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="p-4 border-t border-zinc-800 mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm">
                    <LogOut className="h-4 w-4" />
                    Exit Admin
                </Button>
            </div>
        </div>
    );
}
