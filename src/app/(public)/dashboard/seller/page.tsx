import { Car, MessageSquare, TrendingUp, DollarSign, Activity, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSellerVehiclePerformance } from "@/actions/vehicle";
import { getReceivedEnquiriesCount } from "@/actions/enquiry";
import Image from "next/image";

function getDaysAgo(date: Date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    return days;
}

export default async function SellerDashboardPage() {
    const performanceItems = await getSellerVehiclePerformance();
    const receivedMessagesCount = await getReceivedEnquiriesCount();
    const totalViews = performanceItems.reduce((accumulator, item) => accumulator + item.totalViews, 0);
    const activeListings = performanceItems.filter((item) => item.status === "active").length;
    const trendingPool = performanceItems.filter((item) => item.status === "active");
    const trendingCandidates = trendingPool.length > 0 ? trendingPool : performanceItems;
    const trendingVehicle = trendingCandidates.reduce<(typeof performanceItems)[number] | null>((best, current) => {
        if (!best || current.totalViews > best.totalViews) {
            return current;
        }

        return best;
    }, null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Dark Seller Header */}
            <div className="relative overflow-hidden rounded-[20px] bg-white p-8 shadow-sm border border-slate-200">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-[20px] blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200 uppercase tracking-widest">
                                <DollarSign className="h-3.5 w-3.5" /> Seller Dashboard
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 text-slate-900">
                            Performance Overview
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg max-w-xl">
                            Track each listed vehicle's individual viewing performance in real time.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 p-4 rounded-md bg-slate-50 border border-slate-200 shadow-sm">
                        <div className="text-center px-4 border-r border-slate-200">
                            <div className="text-3xl font-bold font-mono text-slate-900">{totalViews.toLocaleString()}</div>
                            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Total Views</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                                <TrendingUp className="h-5 w-5" />
                                <span className="text-3xl font-bold font-mono">+12%</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Engagement</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Premium Stat Card 1 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Listings</p>
                            <h3 className="text-4xl font-black text-slate-900 mt-2">{activeListings}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                            <Car className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" /> 100% capacity
                        </span>
                        <Link href="/sell/create" className="text-sm font-bold text-blue-600 flex items-center hover:underline">
                            Add new <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Premium Stat Card 2 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Views</p>
                            <h3 className="text-4xl font-black text-slate-900 mt-2">{totalViews.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
                            <Activity className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-medium text-indigo-600 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" /> +12% vs last wk
                        </span>
                        <span className="text-sm font-medium text-slate-500">Past 30 days</span>
                    </div>
                </div>

                {/* Premium Stat Card 3 */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-xl text-white group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <MessageSquare className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-bold text-blue-100 uppercase tracking-wider">Messages</p>
                                <h3 className="text-4xl font-black mt-2">{receivedMessagesCount.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-md shadow-inner">
                                <BellNotification />
                            </div>
                        </div>
                        <div className="pt-4 mt-6 border-t border-white/20 flex items-center justify-between">
                            <span className="text-sm font-bold bg-white text-blue-700 px-3 py-1 rounded-md shadow-sm">
                                {receivedMessagesCount.toLocaleString()} Messages Received
                            </span>
                            <ArrowUpRight className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Featured Active Listing Widget */}
                <div className="lg:col-span-2 rounded-[20px] border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Zap className="h-5 w-5 text-blue-500" /> Currently Trending
                        </h3>
                        <Link href="/dashboard/seller/listings">
                            <Button variant="outline" className="font-bold rounded-md h-9 hover:bg-blue-50 hover:text-blue-700">Manage Listings</Button>
                        </Link>
                    </div>

                    {trendingVehicle ? (
                        <div className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                            <div className="w-full sm:w-48 h-32 rounded-md border border-slate-200 bg-slate-100 overflow-hidden relative shrink-0">
                                <Image
                                    src={trendingVehicle.image}
                                    alt={trendingVehicle.title}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                    sizes="192px"
                                />
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider shadow-sm">
                                    {trendingVehicle.status === "sold" ? "Sold Out" : trendingVehicle.status}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between w-full">
                                <div>
                                    <div className="flex justify-between items-start gap-4">
                                        <h4 className="text-xl font-bold text-slate-900 line-clamp-1">{trendingVehicle.title}</h4>
                                        <span className="text-xl font-black text-blue-600">${trendingVehicle.price.toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Listed {getDaysAgo(trendingVehicle.createdAt)} days ago • {trendingVehicle.sellerLocation || "Location not set"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 pb-1">
                                    <div className="text-sm font-medium">
                                        <span className="text-slate-900 font-bold">{trendingVehicle.totalViews.toLocaleString()}</span> <span className="text-slate-500">views</span>
                                    </div>
                                    <div className="text-sm font-medium">
                                        <span className="text-slate-900 font-bold">{trendingVehicle.viewRate}%</span> <span className="text-slate-500">view rate</span>
                                    </div>
                                    <div className="text-sm font-medium">
                                        <span className="text-slate-900 font-bold">{trendingVehicle.savedRate}%</span> <span className="text-slate-500">saved rate</span>
                                    </div>
                                    <div className="text-sm font-medium">
                                        <span className="text-slate-900 font-bold">{trendingVehicle.totalSaved.toLocaleString()}</span> <span className="text-slate-500">saved</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 text-sm text-slate-500">No listings available to show trending data.</div>
                    )}
                </div>

                {/* List New Vehicle CTA */}
                <div className="relative overflow-hidden rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-8 flex flex-col items-center justify-center text-center group hover:bg-blue-50 hover:border-blue-300 transition-all">
                    <div className="p-4 bg-white rounded-md shadow-sm mb-6 group-hover:scale-110 group-hover:shadow-md transition-all">
                        <Car className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Sell another vehicle</h3>
                    <p className="text-sm text-slate-500 max-w-[200px] mb-8">
                        List your car in under 5 minutes and reach millions.
                    </p>
                    <Link href="/sell/create" className="w-full">
                        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg border-none shadow-blue-600/20">
                            Create New Listing
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helper icon component
function BellNotification() {
    return (
        <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-md h-3 w-3 bg-blue-500 border border-blue-200"></span>
            </span>
        </div>
    );
}
