"use client";

import { motion } from "framer-motion";
import { ClipboardList, Camera, MessageSquare, Handshake } from "lucide-react";

const STEPS = [
    {
        title: "1. Tell us about your car",
        description: "Enter your car's details including make, model, year, and condition to get an instant valuation estimate.",
        icon: ClipboardList,
    },
    {
        title: "2. Add photos & list",
        description: "Upload some great photos and we'll help you create a compelling listing that attracts serious buyers.",
        icon: Camera,
    },
    {
        title: "3. Connect with buyers",
        description: "Receive inquiries securely through our messaging platform without sharing your personal number.",
        icon: MessageSquare,
    },
    {
        title: "4. Close the deal safely",
        description: "Meet the buyer, verify payment securely through our platform, and hand over the keys.",
        icon: Handshake,
    },
];

export function HowItWorksSell() {
    return (
        <section className="py-20 lg:py-24 overflow-hidden bg-transparent">
            <div className="container-width">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How selling works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We've streamlined the entire process. Sell your car in four simple, secure steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line removed as requested */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="mb-8 relative flex h-24 w-24 items-center justify-center rounded-full bg-background border border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="absolute inset-0 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-300" />
                                    <step.icon className="h-10 w-10 text-blue-600 dark:text-blue-500 relative z-10" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-[280px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
