"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
    {
        question: "Are there any fees to list a vehicle?",
        answer: "Basic listings are completely free. We may introduce premium promotion options in the future, but our core service remains free to help you sell your car.",
    },
    {
        question: "How do you verify sellers?",
        answer: "We employ a rigorous review process for seller profiles and listing activities. This helps reduce spam, prevents fraud, and significantly improves buyer trust in our community.",
    },
    {
        question: "How can I stay safe when meeting a seller?",
        answer: "Always use our in-app messaging first. We strongly recommend meeting in well-lit, public places, bringing a friend along, and completing proper ownership checks before any payment is made.",
    },
    {
        question: "Can I request an inspection before buying?",
        answer: "Absolutely. We encourage all buyers to coordinate independent, professional inspections directly with the seller to ensure complete peace of mind before making a final decision.",
    },
];

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container-width px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16 space-y-4">

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Everything you need to know about listing, verification, and buying safely.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQ_ITEMS.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'border-blue-200 bg-blue-50/50 shadow-md'
                                        : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                                        aria-expanded={isOpen}
                                    >
                                        <h3 className={`text-lg font-semibold pr-8 transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                            }`}>
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
                                                <div className="p-6 pt-0 text-slate-600 leading-relaxed text-base">
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
