"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container-width px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Everything you need to know about selling your car on our platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, index) => {
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

                                    <div
                                        className={`transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-6 pt-0 text-slate-600 leading-relaxed text-base">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
