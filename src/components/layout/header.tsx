"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, Search, X, ChevronRight, LayoutDashboard, LogIn, PlusCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const NAV_LINKS = [
    { name: "Buy", href: "/search" },
    { name: "Sell", href: "/sell" },
    { name: "Research", href: "/research/compare" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const pathname = usePathname();
    const { user } = useUser();

    // Determine if the current page starts with a transparent header
    const transparentPages = ["/", "/sell", "/news", "/contact"];
    const isTransparentPage = transparentPages.includes(pathname);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    // Handle scroll effect
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Block scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    // Calculate dynamic state
    const isTransparent = isTransparentPage && !isScrolled && !isMenuOpen;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[60] pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out">
                {/* --- Floating Nav Bar --- */}
                <div
                    className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-500 ${isTransparent
                        ? "bg-transparent border-transparent"
                        : "bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 shadow-slate-200/50"
                        }`}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-2.5 z-10"
                    >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${isTransparent ? "bg-white/10 text-white backdrop-blur-md" : "bg-blue-600 text-white shadow-md shadow-blue-200"
                            }`}>
                            <Car className="h-5 w-5" />
                        </div>
                        <span className={`text-xl font-black tracking-tight transition-colors ${isTransparent ? "text-white" : "text-slate-900"
                            }`}>
                            RIDE<span className={isTransparent ? "text-blue-400" : "text-blue-600"}>MARKET</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 z-10" onMouseLeave={() => setHoveredLink(null)}>
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            const isHovered = hoveredLink === link.name;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 ${isTransparent
                                        ? "text-gray-200 hover:text-white"
                                        : isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-900"
                                        }`}
                                >
                                    {link.name}

                                    {/* Animated Pill Background on Hover */}
                                    {isHovered && !isTransparent && (
                                        <motion.div
                                            layoutId="nav-hover"
                                            className="absolute inset-0 -z-10 rounded-full bg-slate-100"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {isHovered && isTransparent && (
                                        <motion.div
                                            layoutId="nav-hover-transparent"
                                            className="absolute inset-0 -z-10 rounded-full bg-white/10 backdrop-blur-md"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4 z-10">
                        <div className={`flex items-center gap-4 border-r pr-4 ${isTransparent ? 'border-white/20' : 'border-slate-200'}`}>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className={`text-sm font-bold transition-colors ${isTransparent ? "text-white hover:text-blue-300" : "text-slate-700 hover:text-blue-600"
                                        }`}>
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className={`text-sm font-bold transition-colors ${isTransparent ? "text-white hover:text-blue-300" : "text-slate-700 hover:text-blue-600"}`}
                                >
                                    Dashboard
                                </Link>
                                <div className="h-8 w-8 rounded-full border-2 border-transparent hover:border-blue-400 transition-all">
                                    <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-full h-full" } }} />
                                </div>
                            </SignedIn>
                        </div>

                        <Link href="/sell/create">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition-all ${isTransparent
                                    ? "bg-white text-black hover:bg-gray-100 shadow-white/20"
                                    : "bg-black text-white hover:bg-slate-800 shadow-black/10"
                                    }`}
                            >
                                List for Free
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isTransparent ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900"
                            }`}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* --- Mobile Full-Screen Drawer --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                        />

                        {/* Floating Drawer Container */}
                        <motion.aside
                            initial={{ x: "100%", opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-2 top-2 bottom-2 z-[80] w-[calc(100%-1rem)] max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <span className="text-xl font-black tracking-tight text-slate-900">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Drawer Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                                {/* Mobile User Section */}
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                                    <SignedIn>
                                        <div className="flex items-center gap-3 mb-4">
                                            <UserButton afterSignOutUrl="/" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 line-clamp-1">{user?.fullName}</p>
                                                <p className="text-xs text-slate-500 line-clamp-1">{user?.primaryEmailAddress?.emailAddress}</p>
                                            </div>
                                        </div>
                                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="outline" className="w-full rounded-xl flex items-center justify-center gap-2 border-slate-200">
                                                <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                                            </Button>
                                        </Link>
                                    </SignedIn>

                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md shadow-blue-200">
                                                <LogIn className="h-4 w-4" /> Sign In / Register
                                            </Button>
                                        </SignInButton>
                                    </SignedOut>
                                </div>

                                {/* Navigation Links */}
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Browse</p>
                                    {NAV_LINKS.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-center justify-between p-3 rounded-2xl text-lg font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
                                        >
                                            {link.name}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent group-hover:bg-blue-100 transition-colors">
                                                <ArrowRight className="h-4 w-4 text-transparent group-hover:text-blue-600 transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Drawer Footer - Sticky Bottom */}
                            <div className="p-6 border-t border-slate-100 bg-white/90 backdrop-blur-md space-y-3">
                                <Link href="/search" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 p-3 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                                    <Search className="h-4 w-4" /> Search Marketplace
                                </Link>
                                <Link href="/sell/create" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full h-14 rounded-2xl font-bold bg-black text-white hover:bg-slate-800 text-base shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
                                        <PlusCircle className="h-5 w-5" /> List Your Car Free
                                    </Button>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}