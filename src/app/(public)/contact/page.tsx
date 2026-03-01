import { Mail, MapPin, Phone, Send, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 bg-slate-50 overflow-hidden border-b border-slate-200/60">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/40 rounded-bl-[100px] pointer-events-none" />
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px] opacity-70 pointer-events-none" />
                <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-indigo-100/50 blur-[80px] opacity-60 pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                        How can we <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">help you today?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Whether you're looking to buy your dream car, sell your current vehicle, or just have a general inquiry, our premium support team is here for you.
                    </p>
                </div>
            </section>

            {/* Main Content Section - Split Layout */}
            <section className="py-24 bg-white relative">
                <div className="container-width px-6">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Left Side: Contact Information */}
                        <div className="w-full lg:w-5/12 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
                                <p className="text-slate-500 leading-relaxed mb-8">
                                    Fill out the form and our team will get back to you within 24 hours. For immediate assistance, feel free to call us directly.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Phone */}
                                <div className="flex items-start gap-6 group">
                                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Phone className="h-6 w-6 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us Directly</h3>
                                        <p className="text-slate-500 mb-2">+1 (555) 123-4567</p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                                            <Clock className="h-3.5 w-3.5" /> Mon-Fri, 8am to 6pm
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-6 group">
                                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Mail className="h-6 w-6 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">Email Support</h3>
                                        <p className="text-slate-500 mb-2">support@ridemarket.com</p>
                                        <p className="text-sm font-medium text-slate-400">Average response time: 2 hours</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-6 group">
                                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <MapPin className="h-6 w-6 stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">Headquarters</h3>
                                        <p className="text-slate-500 leading-relaxed">
                                            100 Marketplace Blvd<br />
                                            Suite 200<br />
                                            San Francisco, CA 94101
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Link */}
                            <div className="pt-8 border-t border-slate-100">
                                <Link
                                    href="/#faq"
                                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                                >
                                    Check our Frequently Asked Questions
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Form Block */}
                        <div className="w-full lg:w-7/12">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                {/* Form Top Border Accent */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

                                <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-bold text-slate-700">First Name</label>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:bg-white rounded-md shadow-sm transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-bold text-slate-700">Last Name</label>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:bg-white rounded-md shadow-sm transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:bg-white rounded-md shadow-sm transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-bold text-slate-700">How can we help?</label>
                                        <Input
                                            id="subject"
                                            placeholder="E.g., Selling my car, Premium Listing inquiry..."
                                            className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:bg-white rounded-md shadow-sm transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Please provide as much detail as possible..."
                                            className="min-h-[160px] p-3 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 focus-visible:bg-white rounded-md shadow-sm resize-y transition-colors"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-md shadow-md hover:shadow-lg hover:shadow-blue-600/25 transition-all group overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Send Message
                                            <Send className="h-5 w-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
