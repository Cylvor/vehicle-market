"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DollarSign, Zap, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

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
        <section className="py-20 lg:py-24 bg-transparent">
            <div className="container-width">
                <div className="rounded-2xl border border-border/70 bg-card/70 p-8 md:p-12 lg:p-14 backdrop-blur-sm shadow-xl">
                    <div className="max-w-3xl mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Why sell with us?</h2>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                            We've built the most comprehensive seller toolkit to ensure you get the maximum value for your car with minimum stress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SELL_FEATURES.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative rounded-xl border border-border/50 bg-background/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/5 hover:shadow-lg"
                            >
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional CTA */}
                    <div className="mt-16 rounded-xl border border-blue-500/20 bg-blue-500/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Ready to get started?</h3>
                            <p className="text-muted-foreground">It takes less than 5 minutes to create your listing.</p>
                        </div>
                        <Button asChild className="shrink-0 h-12 px-8 font-bold bg-blue-600 hover:bg-blue-500 rounded-xl">
                            <Link href="/sell/create" className="flex items-center gap-2">
                                Create My Free Listing <Zap className="h-4 w-4 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
