"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0B1120] border-t border-[#1E293B] text-slate-300">
            <div className="container-width py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand & Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <div>
                            <h3 className="font-bold text-2xl tracking-tight text-white mb-4">
                                Ride<span className="text-blue-500">Market</span>
                            </h3>
                            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                                Australia's most trusted premium vehicle marketplace. We connect genuine buyers with verified sellers, making automotive transactions seamless, safe, and entirely transparent.
                            </p>
                        </div>

                        <div className="space-y-3 text-sm text-slate-400">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                <span>Level 4, 120 Spencer St, Melbourne VIC 3000</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span>1800 RIDE MKT (1800 743 365)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <span>support@ridemarket.com.au</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-semibold text-white tracking-tight uppercase text-sm">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Used Cars</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">New Vehicles</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Certified Pre-Owned</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Car Reviews</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Market Insights</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-semibold text-white tracking-tight uppercase text-sm">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Sell Your Car</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Instant Appraisals</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Dealer Portal</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Finance Options</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Insurance</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Socials */}
                    <div className="lg:col-span-4 space-y-6 bg-slate-800/50 p-6 rounded-md border border-slate-700/50">
                        <h4 className="font-semibold text-white tracking-tight uppercase text-sm">Stay Updated</h4>
                        <p className="text-sm text-slate-400">
                            Get the latest market insights, reviews, and exclusive deals delivered straight to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md text-sm transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="pt-4 border-t border-slate-700/50">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Follow Us</p>
                            <div className="flex gap-4">
                                <Link href="#" className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                    <Facebook className="h-4 w-4" />
                                </Link>
                                <Link href="#" className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
                                    <Twitter className="h-4 w-4" />
                                </Link>
                                <Link href="#" className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                                    <Instagram className="h-4 w-4" />
                                </Link>
                                <Link href="#" className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                                    <Linkedin className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-[#1e293b] flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:gap-8 text-xs text-slate-500">

                    {/* Legal Links (Left) */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 order-2 lg:order-1 lg:col-span-1">
                        <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors">Cookie Tracking</Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors">Site Map</Link>
                    </div>

                    {/* Copyright (Center) */}
                    <div className="text-center order-3 lg:order-2 lg:col-span-1">
                        <p>&copy; {new Date().getFullYear()} RideMarket Pty Ltd. All rights reserved.</p>
                    </div>

                    {/* Developer Credit Button (Right) */}
                    <div className="flex justify-center lg:justify-end order-1 lg:order-3 lg:col-span-1 w-full lg:w-auto">
                        <Link
                            href="https://cylvorit.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-[#0f172a]/50 hover:bg-[#0f172a] border border-[#1e293b] hover:border-green-500/50 rounded-xl sm:rounded-full px-4 py-2 transition-all shadow-sm shrink-0"
                        >
                            <span className="text-[11px] text-slate-500 group-hover:text-slate-400 uppercase tracking-widest font-semibold transition-colors">
                                Designed & Developed by
                            </span>

                            <div className="flex items-center gap-2">
                                {/* CylvorIT Logo */}
                                <img
                                    src="/footerimg/footerimg.svg"
                                    alt="CylvorIT Logo"
                                    className="h-5 w-auto object-contain rounded-sm"
                                />

                                <span className="text-sm font-bold text-green-500 tracking-tight">
                                    Cylvor IT
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
