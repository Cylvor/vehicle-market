import { SellerSidebar } from "@/components/modules/dashboard/seller-sidebar";
import { Suspense } from "react";
import { DashboardModeToggle } from "@/components/modules/dashboard/mode-toggle";

export default function SellerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col pt-16 bg-slate-50 overflow-hidden">
            <Suspense fallback={<div className="h-12 border-b bg-muted" />}>
                <DashboardModeToggle currentMode="seller" />
            </Suspense>
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden lg:block w-64 flex-shrink-0 z-10 overflow-y-auto border-r border-slate-200 bg-white">
                    <Suspense fallback={<div className="w-full h-full bg-slate-50 animate-pulse" />}>
                        <SellerSidebar />
                    </Suspense>
                </aside>
                <main className="flex-1 min-w-0 w-full overflow-y-auto">
                    <div className="container mx-auto p-4 md:p-8 min-h-[500px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
