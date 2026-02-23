import { BuyerSidebar } from "@/components/modules/dashboard/buyer-sidebar";
import { Suspense } from "react";
import { DashboardModeToggle } from "@/components/modules/dashboard/mode-toggle";

export default function BuyerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col pt-16 md:pt-20 bg-emerald-50/30 dark:bg-emerald-950/20">
            <Suspense fallback={<div className="h-12 border-b bg-muted" />}>
                <DashboardModeToggle currentMode="buyer" />
            </Suspense>
            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <Suspense fallback={<div className="w-64 h-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />}>
                            <BuyerSidebar />
                        </Suspense>
                    </aside>
                    <main className="flex-1 min-h-[500px]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
