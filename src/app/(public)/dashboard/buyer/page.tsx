import { Heart, MessageSquare, Activity, Search, ShieldCheck, Clock, Settings, Zap, Gauge } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BuyerDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Header Area */}
            <div className="relative overflow-hidden rounded-[20px] bg-slate-900 dark:bg-slate-950 p-8 shadow-2xl border border-slate-800 text-white">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-md blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-widest backdrop-blur-md">
                                <Search className="h-3.5 w-3.5" /> Buyer Profile
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-widest backdrop-blur-md">
                                <ShieldCheck className="h-3.5 w-3.5" /> Verified
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4">
                            Welcome back
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg max-w-xl">
                            You have 4 saved vehicles and 3 active enquiries. The market is moving fast today.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Stat Card 1 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Saved Vehicles</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">4</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                            <Heart className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Clock className="h-4 w-4" /> 2 new this week
                        </span>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="relative overflow-hidden rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:border-emerald-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Enquiries</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">3</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <Clock className="h-4 w-4" /> 1 unread reply
                        </span>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-emerald-600 to-teal-800 p-6 shadow-xl text-white group cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Activity className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider">Search Alerts</p>
                                <h3 className="text-4xl font-black mt-2">12</h3>
                            </div>
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-md shadow-inner">
                                <Activity className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="pt-4 mt-6 border-t border-white/20 flex items-center justify-between">
                            <span className="text-sm font-bold bg-white text-emerald-700 px-3 py-1 rounded-md shadow-sm flex items-center gap-1">
                                <Zap className="h-4 w-4" /> Last alert: Toyota SUV
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Resume Search Card */}
            <div className="relative overflow-hidden rounded-[20px] bg-slate-900 dark:bg-black p-8 shadow-xl group border border-slate-800">
                <div className="absolute inset-0 bg-[url('/images/hero/car4.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-sm font-bold mb-4 backdrop-blur-md">
                            <Gauge className="h-4 w-4" /> Pick up where you left off
                        </div>
                        <h3 className="text-3xl font-black mb-2">Continue your search</h3>
                        <p className="text-slate-300 text-lg">
                            You were looking at <strong className="text-white">Hybrid SUVs under $35,000</strong>.
                            There are 24 new matches since yesterday.
                        </p>
                    </div>
                    <Link href="/search">
                        <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all flex items-center gap-2 shrink-0 border-none">
                            <Search className="h-5 w-5" />
                            View Matches
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Mini-Feed */}
            <div className="rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Settings className="h-5 w-5 text-emerald-600" /> Recent Activity
                </h3>
                <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                            <div className="h-16 w-24 shrink-0 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                <div className="absolute inset-0 bg-[url('/images/hero/car3.jpg')] bg-cover bg-center" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg hover:text-emerald-600 transition-colors cursor-pointer">2021 Toyota RAV4 Cruiser</h4>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Price dropped by $1,200 yesterday</p>
                            </div>
                            <Button variant="outline" size="sm" className="hidden sm:flex rounded-md font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400">
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
