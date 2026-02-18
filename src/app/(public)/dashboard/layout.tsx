import { DashboardSidebar } from "@/components/modules/dashboard/dashboard-sidebar";
import { DashboardModeToggle } from "@/components/modules/dashboard/mode-toggle";
import { Suspense } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col pt-16 md:pt-20">
            <Suspense fallback={<div className="h-12 border-b bg-muted" />}>
                <DashboardModeToggle />
            </Suspense>
            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <Suspense fallback={<div className="w-64 h-full bg-muted animate-pulse" />}>
                            <DashboardSidebar />
                        </Suspense>
                    </aside>
                    <main className="flex-1 min-h-[500px] border rounded-lg p-6 shadow-sm bg-card">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
