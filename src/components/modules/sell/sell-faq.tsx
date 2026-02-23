"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "How much does it cost to list my car?",
        answer: "Listing your car on our platform is completely free. We only charge a small success fee when your car is sold to ensure maximum value for both buyers and sellers.",
    },
    {
        question: "How do you determine the valuation of my car?",
        answer: "Our intelligent pricing engine uses real-time market data, recent sales of similar models, and the specific condition details you provide to suggest the most competitive asking price.",
    },
    {
        question: "Is my personal information kept secure?",
        answer: "Absolutely. We protect your privacy by keeping your contact details hidden. All communication happens securely through our in-platform messaging system.",
    },
    {
        question: "How do I ensure a safe transaction with the buyer?",
        answer: "We strongly recommend meeting in a safe, public place for test drives. For payment, we provide guidelines on secure methods, and our verified badges help identify trusted buyers.",
    },
    {
        question: "Can I edit my listing after it's published?",
        answer: "Yes, you can edit your listing details, price, and photos at any time from your Seller Dashboard to keep it fresh and attractive to buyers.",
    },
];

export function SellFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 lg:py-24 bg-transparent">
            <div className="container-width">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Frequently asked questions</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Everything you need to know about selling your car on our platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-blue-500/30"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <h3 className="text-lg font-semibold text-foreground pr-8">{faq.question}</h3>
                                        <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
