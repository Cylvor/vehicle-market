"use client";

import { ClipboardList, Camera, MessageSquare, Handshake } from "lucide-react";

const STEPS = [
    {
        title: "Tell us about your car",
        description: "Enter your car's details including make, model, year, and condition to get an instant valuation estimate.",
        icon: ClipboardList,
    },
    {
        title: "Add photos & list",
        description: "Upload some great photos and we'll help you create a compelling listing that attracts serious buyers.",
        icon: Camera,
    },
    {
        title: "Connect with buyers",
        description: "Receive inquiries securely through our messaging platform without sharing your personal number.",
        icon: MessageSquare,
    },
    {
        title: "Close the deal safely",
        description: "Meet the buyer, verify payment securely through our platform, and hand over the keys.",
        icon: Handshake,
    },
];

export function HowItWorksSell() {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden">
            <div className="container-width px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                        How Selling <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        We've streamlined the entire process. Sell your car in four simple, secure steps.
                    </p>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 relative px-2">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 z-0"></div>

                    {STEPS.map((step, index) => (
                        <article
                            key={step.title}
                            className="group relative bg-white border border-slate-200 rounded-md p-6 pt-12 mt-6 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 z-10"
                        >
                            {/* Floating Number Badge */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-white border-[3px] border-slate-50 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-50">
                                <div className="h-full w-full rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-black text-2xl">{index + 1}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center mt-6">
                                {/* Icon */}
                                <div className="mb-6 text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:text-indigo-600">
                                    <step.icon className="h-10 w-10 stroke-[1.5]" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
