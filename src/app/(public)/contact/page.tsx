import Image from "next/image";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white pt-24 pb-12">

            {/* --- Background Image & Overlays --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/car3.jpg"
                    alt="Luxury Car Dark Background"
                    fill
                    className="object-cover brightness-[0.3]"
                    priority
                />
                {/* Overlay Gradients matching Hero */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            </div>

            {/* Decorative Ambient Glow */}
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-md bg-blue-900/20 blur-[120px] z-0" />
            <div className="pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-md bg-blue-950/10 blur-[100px] z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] text-white as mb-6">
                        Get in <span className="text-blue-400">Touch</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Have questions about buying or selling a vehicle? Our team of experts is here to help you navigate the premium marketplace.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Call Us */}
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[8px] border border-white/10 shadow-xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-md">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Call Us</h3>
                                <p className="text-gray-400 text-sm mb-2">Mon-Fri from 8am to 6pm.</p>
                                <p className="font-bold text-blue-300 tracking-wide">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        {/* Email Us */}
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[8px] border border-white/10 shadow-xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-md">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Email Us</h3>
                                <p className="text-gray-400 text-sm mb-2">We'll respond within 24 hours.</p>
                                <p className="font-bold text-blue-300 tracking-wide">support@ridemarket.com</p>
                            </div>
                        </div>

                        {/* Visit Us */}
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[8px] border border-white/10 shadow-xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-md">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">Visit Us</h3>
                                <p className="text-gray-400 text-sm mb-2">Come say hello at our office.</p>
                                <p className="font-bold text-gray-200 tracking-wide">100 Marketplace Blvd<br />Suite 200<br />San Francisco, CA</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[12px] border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Inner subtle glow */}
                            <div className="absolute -top-24 -right-24 h-48 w-48 bg-blue-500/10 rounded-md blur-[60px]" />

                            <form className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-bold text-gray-300">First Name</label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="h-12 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-blue-500 rounded-[6px]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-bold text-gray-300">Last Name</label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="h-12 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-blue-500 rounded-[6px]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-gray-300">Email Address</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-12 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-blue-500 rounded-[6px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-gray-300">Subject</label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help you?"
                                        className="h-12 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-blue-500 rounded-[6px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-gray-300">Message</label>
                                    <Textarea
                                        id="message"
                                        placeholder="Please provide as much detail as possible..."
                                        className="min-h-[150px] bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-blue-500 rounded-[6px] resize-y"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider rounded-[6px] shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 mt-4 border border-blue-500/50"
                                >
                                    <Send className="h-5 w-5" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
