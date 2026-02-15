import Link from "next/link";
import { Car, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <div className="bg-primary text-primary-foreground p-1 rounded-md">
                            <Car className="h-6 w-6" />
                        </div>
                        <span>RideMarket</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent md:hidden">
                        <Search className="h-5 w-5" />
                    </button>

                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/auth/signin">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sell/create">
                            <Button size="sm">
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
