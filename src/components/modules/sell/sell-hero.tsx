"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, DollarSign, Zap, Globe, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export function SellHero() {
    return (
        <div className="flex flex-col">
            {/* --- Hero Section --- */}
            <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src="/images/hero/car5.jpg"
                                alt="Sell My Car"
                                fill
                                priority
                                className="object-cover brightness-[0.45]"
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative z-10 flex h-full items-center px-6 sm:px-12 lg:px-24">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="mb-4 inline-block rounded-md border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 backdrop-blur-md">
                                SELLER HUB
                            </span>
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl leading-[1.1]">
                                Sell your car <br />
                                <span className="text-blue-400">faster than ever</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-gray-300 sm:text-xl leading-relaxed">
                                Get the best price for your vehicle. List in minutes and reach thousands of potential buyers across Australia with our premium selling platform.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Button asChild size="lg" className="h-14 px-10 text-lg font-bold bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                    <Link href="/sell/create">Start Listing Now</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10">
                                    <Link href="/research/compare">Check Market Value</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Features Section --- */}
            <section className="py-20 lg:py-24 bg-gradient-to-b from-background to-muted/20">
                <div className="container-width">
                    <div className="rounded-md border border-border/70 bg-card/70 p-8 md:p-12 lg:p-14 backdrop-blur-sm shadow-2xl">
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
                                    className="group relative rounded-md border border-border/50 bg-background/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/5 hover:shadow-xl"
                                >
                                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed leading-6 group-hover:text-foreground/90 transition-colors">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional CTA */}
                        <div className="mt-16 rounded-md border border-blue-500/20 bg-blue-500/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Ready to get started?</h3>
                                <p className="text-muted-foreground">It takes less than 5 minutes to create your listing.</p>
                            </div>
                            <Button asChild className="shrink-0 h-12 px-8 font-bold bg-blue-600 hover:bg-blue-500">
                                <Link href="/sell/create" className="flex items-center gap-2">
                                    Create My Free Listing <Zap className="h-4 w-4 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
