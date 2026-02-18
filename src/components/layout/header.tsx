"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 48);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isTransparentOverlay = isHome && !isScrolled;

    return (
        <header
            className={`sticky top-0 z-50 w-full text-white transition-all duration-500 ${
                isTransparentOverlay
                    ? "-mb-16 border-b border-transparent bg-transparent backdrop-blur-0"
                    : "border-b border-white/15 bg-[#0c1020]/72 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0c1020]/60"
            }`}
        >
            <div className="container-width flex h-16 items-center justify-between font-sans">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white transition-opacity hover:opacity-90">
                        <div className="bg-white/10 text-white p-1.5 rounded-lg border border-white/20">
                            <Car className="h-6 w-6" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/75">
                            RideMarket
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-white/75">
                    <Link href="/search" className="hover:text-white transition-colors">
                        Buy
                    </Link>
                    <Link href="/sell" className="hover:text-white transition-colors">
                        Sell
                    </Link>
                    <Link href="/research/compare" className="hover:text-white transition-colors">
                        Research
                    </Link>
                    <Link href="/news" className="hover:text-white transition-colors">
                        News & Reviews
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-white/75 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 md:hidden">
                        <Search className="h-5 w-5" />
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="font-semibold text-white/80 hover:text-white hover:bg-white/10">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" className="hidden md:flex">
                                <Button variant="ghost" size="sm" className="font-semibold text-white/80 hover:text-white hover:bg-white/10">
                                    Dashboard
                                </Button>
                            </Link>
                            <UserButton />
                        </SignedIn>
                        <Link href="/sell/create">
                            <Button size="sm" className="font-semibold shadow-premium hover:shadow-lg transition-all bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                List for Free
                            </Button>
                        </Link>
                    </div>

                    <button className="md:hidden text-white p-2 -mr-2">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
