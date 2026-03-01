"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DollarSign, Zap, Globe, ShieldCheck } from "lucide-react";

const SELL_FEATURES = [
    {
        title: "Maximum Price",
        description: "Get the best market value for your vehicle with our appraisal tools.",
        icon: DollarSign,
    },
    {
        title: "Fast Listing",
        description: "List your car in under 5 minutes with our simplified process.",
        icon: Zap,
    },
    {
        title: "Huge Reach",
        description: "Reach thousands of serious car buyers across Australia every week.",
        icon: Globe,
    },
    {
        title: "Verified & Safe",
        description: "Built-in security and verification for a worry-free selling experience.",
        icon: ShieldCheck,
    },
];

export function SellBenefits() {
    return (
        <section className="py-24 bg-white border-t border-slate-200/60 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-64 bg-blue-50/60 blur-[100px] rounded-[100%] pointer-events-none z-0"></div>

            <div className="container-width px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        Why Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">With Us?</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        We've built the most comprehensive seller toolkit to ensure you get the maximum value for your car with minimum stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SELL_FEATURES.map((feature, index) => (
                        <article
                            key={feature.title}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 z-10 flex flex-col focus-within:ring-2 focus-within:ring-blue-500/50"
                        >
                            <div className="mb-6 h-16 w-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center shadow-sm justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/30 transition-all duration-500">
                                <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 text-base leading-relaxed">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Additional CTA */}
                <div className="mt-16 mx-auto max-w-5xl relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 z-10 transition-shadow hover:shadow-xl hover:shadow-slate-200/50">
                    {/* Decorative Background for CTA */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 z-0 pointer-events-none"></div>

                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to get started?</h3>
                        <p className="text-slate-500 text-lg">It takes less than 5 minutes to create your listing.</p>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <Button asChild className="h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 text-white rounded-xl transition-all w-full md:w-auto">
                            <Link href="/sell/create" className="flex items-center justify-center gap-2">
                                Create My Free Listing <Zap className="h-5 w-5 ml-1 drop-shadow-sm" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
