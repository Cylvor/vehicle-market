import { getSellerPerformanceCharts, getSellerVehiclePerformance } from "@/actions/vehicle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function SellerPerformancePage() {
    const performanceItems = await getSellerVehiclePerformance();
    const charts = await getSellerPerformanceCharts();
    const maxDailyValue = Math.max(1, ...charts.byDate.map((point) => Math.max(point.views, point.saved)));
    const maxVehicleValue = Math.max(1, ...performanceItems.map((item) => Math.max(item.totalViews, item.totalSaved)));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
                    <p className="text-muted-foreground">View listing-wise vehicle performance and viewing rate.</p>
                </div>
                <Link href="/dashboard/seller/listings">
                    <Button variant="outline">Manage Listings</Button>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg">Performance by Date</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Views and saved adds over the last 7 days.</p>
                    </div>

                    {charts.byDate.length === 0 ? (
                        <div className="p-6 text-sm text-slate-500 dark:text-slate-400">No performance data available yet.</div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-7 gap-3 items-end h-56">
                                {charts.byDate.map((point) => (
                                    <div key={point.date} className="flex flex-col items-center gap-2">
                                        <div className="w-full h-44 flex items-end justify-center gap-1">
                                            <div
                                                className="w-3 rounded-t bg-blue-500"
                                                style={{ height: `${Math.max(4, (point.views / maxDailyValue) * 100)}%` }}
                                                title={`Views: ${point.views}`}
                                            />
                                            <div
                                                className="w-3 rounded-t bg-emerald-500"
                                                style={{ height: `${Math.max(4, (point.saved / maxDailyValue) * 100)}%` }}
                                                title={`Saved: ${point.saved}`}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{point.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Views</div>
                                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Saved</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-lg">Vehicle-wise Performance</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Compare each vehicle's views and saved adds.</p>
                    </div>

                    {performanceItems.length === 0 ? (
                        <div className="p-6 text-sm text-slate-500 dark:text-slate-400">No listings found.</div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {performanceItems.slice(0, 6).map((item) => (
                                <div key={`chart-${item.id}`} className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.totalViews} views • {item.totalSaved} saved</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-2 rounded-md bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-md bg-blue-500"
                                                style={{ width: `${Math.max(2, (item.totalViews / maxVehicleValue) * 100)}%` }}
                                            />
                                        </div>
                                        <div className="h-2 rounded-md bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                            <div
                                                className="h-full rounded-md bg-emerald-500"
                                                style={{ width: `${Math.max(2, (item.totalSaved / maxVehicleValue) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg">Performance by Listing</h3>
                </div>

                {performanceItems.length === 0 ? (
                    <div className="p-6 text-sm text-slate-500 dark:text-slate-400">No listings found.</div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {performanceItems.map((item) => (
                            <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative h-16 w-24 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-slate-900 dark:text-white truncate">{item.title}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">Status: {item.status === "sold" ? "sold out" : item.status}</p>
                                </div>
                                <div className="grid grid-cols-4 gap-6 sm:gap-10 text-sm">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Views</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{item.totalViews.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Viewing Rate</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{item.viewRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Saved</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{item.totalSaved.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Saved Rate</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{item.savedRate}%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
