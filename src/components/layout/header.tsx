"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, Search, X, ChevronRight, LayoutDashboard, LogIn, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export function Header() {
    const pathname = usePathname();
    const { user } = useUser();
    const isHome = pathname === "/";
    const isSell = pathname === "/sell";
    const isNews = pathname === "/news";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Menu එක Open වෙලා තියෙද්දී scroll එක block කරන්න
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const isTransparent = (isHome || isSell || isNews) && !isScrolled && !isMenuOpen;

    const navLinks = [
        { name: "Buy", href: "/search" },
        { name: "Sell", href: "/sell" },
        { name: "Research", href: "/research/compare" },
        { name: "News & Reviews", href: "/news" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 z-[60] w-full transition-all duration-300 font-sans ${isTransparent
                        ? "bg-transparent border-transparent text-white"
                        : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-900"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 md:h-20 items-center justify-between">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${isTransparent ? "bg-white/10 text-white" : "bg-blue-600 text-white"
                                    }`}>
                                    <Car className="h-6 w-6" />
                                </div>
                                <span className={`text-2xl font-black tracking-tighter ${isTransparent ? "text-white" : "text-slate-900"
                                    }`}>
                                    RIDE<span className="text-blue-600">MARKET</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative transition-colors hover:text-blue-600 group"
                                >
                                    {link.name}
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-4 border-r pr-5 mr-2 border-slate-200">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="text-sm font-bold hover:text-blue-600 transition-colors">Sign In</button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <Link href="/dashboard" className="text-sm font-bold hover:text-blue-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                            </div>

                            <Link href="/sell/create" className="hidden sm:block">
                                <Button className={`rounded-full px-6 font-bold transition-all shadow-md ${isTransparent ? "bg-white text-blue-600 hover:bg-slate-100" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
                                    }`}>
                                    List for Free
                                </Button>
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
                                    }`}
                            >
                                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

                <aside className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div className="flex flex-col h-full pt-20 pb-8 px-6">

                        {/* Mobile User Section */}
                        <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <SignedIn>
                                <div className="flex items-center gap-3 mb-4">
                                    <UserButton afterSignOutUrl="/" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{user?.fullName}</p>
                                        <p className="text-xs text-slate-500">{user?.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 p-2 rounded-lg"
                                >
                                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                                </Link>
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <LogIn className="h-5 w-5 text-blue-600" /> Sign in to your account
                                    </button>
                                </SignInButton>
                            </SignedOut>
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-4">Browse</p>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 active:bg-blue-50 transition-all"
                                >
                                    {link.name}
                                    <ChevronRight className="h-5 w-5 text-slate-300" />
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Actions */}
                        <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                            <Link href="/search" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-slate-600 font-bold">
                                <Search className="h-5 w-5" /> Search Marketplace
                            </Link>
                            <Link href="/sell/create" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full h-14 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-lg shadow-xl shadow-blue-100 flex gap-2">
                                    <PlusCircle className="h-5 w-5" /> List for Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}