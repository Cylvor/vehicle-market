import { Heart, MessageSquare, Activity, Search, ShieldCheck, Clock, Settings, Zap, Gauge, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSavedVehiclesForCurrentUser } from "@/actions/saved-vehicles";
import { getSentEnquiries } from "@/actions/enquiry";
import Image from "next/image";

function getDaysAgo(date: string | Date) {
    const diffMs = Date.now() - new Date(date).getTime();
    const MathFloor = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (MathFloor === 0) return "Today";
    if (MathFloor === 1) return "Yesterday";
    return `${MathFloor} days ago`;
}

export default async function BuyerDashboardPage() {
    const savedVehicles = await getSavedVehiclesForCurrentUser();
    const activeEnquiries = await getSentEnquiries();

    // Recent activity merged list
    const recentActivity = [
        ...savedVehicles.map((v) => ({
            id: `save-${v.id}`,
            title: v.title,
            image: v.image,
            date: v.savedAt || new Date(),
            type: "saved" as const,
            priceStr: v.price
        })),
        ...activeEnquiries.map((e) => {
            const vehicleImage = Array.isArray(e.vehicleImages) ? e.vehicleImages[0] : "/images/hero/car1.jpg";
            return {
                id: `enq-${e.id}`,
                title: `${e.vehicleYear} ${e.vehicleMake} ${e.vehicleModel}`,
                image: typeof vehicleImage === "string" ? vehicleImage : "/images/hero/car1.jpg",
                date: e.createdAt,
                type: "enquiry" as const,
                priceStr: "Enquiry Sent"
            }
        })
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    const totalWatchlistValue = savedVehicles.reduce((acc, curr) => {
        const val = parseInt(curr.price.replace(/[^0-9]/g, "")) || 0;
        return acc + val;
    }, 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Area */}
            <div className="relative overflow-hidden rounded-[20px] bg-white p-8 shadow-sm border border-slate-200">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-[20px] blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200 uppercase tracking-widest">
                                <Search className="h-3.5 w-3.5" /> Buyer Profile
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-200 uppercase tracking-widest">
                                <ShieldCheck className="h-3.5 w-3.5" /> Verified
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 text-slate-900">
                            Welcome back
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg max-w-xl">
                            You have {savedVehicles.length} saved vehicles and {activeEnquiries.length} active enquiries. The market is moving fast today.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Stat Card 1 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Saved Vehicles</p>
                            <h3 className="text-4xl font-black text-slate-900 mt-2">{savedVehicles.length}</h3>
                        </div>
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-md border border-rose-100">
                            <Heart className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-medium text-rose-600 flex items-center gap-1">
                            <Clock className="h-4 w-4" /> Updated dynamically
                        </span>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white border border-slate-200 p-6 shadow-sm hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Enquiries</p>
                            <h3 className="text-4xl font-black text-slate-900 mt-2">{activeEnquiries.length}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" /> Awaiting responses
                        </span>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-xl text-white group cursor-pointer hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Activity className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-bold text-blue-100 uppercase tracking-wider">Watchlist Value</p>
                                <h3 className="text-3xl font-black mt-2">
                                    {new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(totalWatchlistValue)}
                                </h3>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-md shadow-inner">
                                <DollarSign className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="pt-4 mt-6 border-t border-white/20 flex items-center justify-between">
                            <span className="text-sm font-bold bg-white text-blue-700 px-3 py-1 rounded-md shadow-sm flex items-center gap-1">
                                <Zap className="h-4 w-4" /> Total price of saved vehicles
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Resume Search Card */}
            <div className="relative overflow-hidden rounded-[20px] bg-slate-900 p-8 shadow-xl group border border-slate-800">
                <div className="absolute inset-0 bg-[url('/images/hero/car4.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-sm font-bold mb-4 backdrop-blur-md">
                            <Gauge className="h-4 w-4" /> Pick up where you left off
                        </div>
                        <h3 className="text-3xl font-black mb-2">Continue your search</h3>
                        <p className="text-slate-300 text-lg">
                            You were looking at <strong className="text-white">Hybrid SUVs under $35,000</strong>.
                            There are 24 new matches since yesterday.
                        </p>
                    </div>
                    <Link href="/search">
                        <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all flex items-center gap-2 shrink-0 border-none">
                            <Search className="h-5 w-5" />
                            View Matches
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Mini-Feed */}
            <div className="rounded-[20px] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                    <Settings className="h-5 w-5 text-blue-600" /> Recent Activity
                </h3>
                <div className="space-y-6">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((item) => (
                            <div key={item.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="h-16 w-24 shrink-0 rounded-md bg-slate-100 overflow-hidden relative border border-slate-200">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-lg line-clamp-1">{item.title}</h4>
                                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${item.type === 'saved' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {item.type === 'saved' ? 'Saved' : 'Enquired'}
                                        </span>
                                        • {getDaysAgo(item.date)}
                                    </p>
                                </div>
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="font-bold text-slate-900">{item.priceStr}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-500 text-center py-6">No recent activity found. Start saving vehicles or making enquiries!</div>
                    )}
                </div>
            </div>
        </div>
    );
}
