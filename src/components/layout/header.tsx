import Link from "next/link";
import { Car, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container-width flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-foreground transition-opacity hover:opacity-90">
                        <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
                            <Car className="h-6 w-6" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            RideMarket
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/search" className="hover:text-primary transition-colors">
                        Buy
                    </Link>
                    <Link href="/sell" className="hover:text-primary transition-colors">
                        Sell
                    </Link>
                    <Link href="/research/compare" className="hover:text-primary transition-colors">
                        Research
                    </Link>
                    <Link href="/news" className="hover:text-primary transition-colors">
                        News & Reviews
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent/10 md:hidden">
                        <Search className="h-5 w-5" />
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/auth/signin">
                            <Button variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sell/create">
                            <Button size="sm" className="font-semibold shadow-premium hover:shadow-lg transition-all">
                                List for Free
                            </Button>
                        </Link>
                    </div>

                    <button className="md:hidden text-foreground p-2 -mr-2">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
