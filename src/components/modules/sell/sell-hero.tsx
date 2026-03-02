"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function SellHero() {
    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-transparent">
            {/* Extremely subtle, minimal ambient glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-100/20 dark:bg-sky-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container-width relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.05]"
                    >
                        Sell your car <br className="hidden sm:block" />
                        <span className="text-blue-600 dark:text-blue-500">faster than ever.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                        className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed font-light"
                    >
                        List in minutes, connect with thousands of verified buyers, and secure the best market price—all from one seamless platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="mt-10 flex flex-col items-center justify-center w-full"
                    >
                        <Button asChild size="lg" className="h-14 px-10 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 rounded-full group">
                            <Link href="/sell/create" className="flex items-center gap-2">
                                Start Your Free Listing
                                <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>100% Free Listing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>Instant Valuation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            <span>Verified Buyers</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
