import { AdminSidebar } from "@/components/modules/admin/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <aside className="w-full md:w-64 flex-shrink-0 bg-zinc-900">
                <AdminSidebar />
            </aside>
            <main className="flex-1 bg-muted/10 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
