import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card border-t border-border/50">
            <div className="container-width py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl tracking-tight text-foreground">RideMarket</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Australia's #1 marketplace for vehicles. We make buying and selling cars easy, safe, and transparent.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -ml-2 rounded-full hover:bg-primary/5">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Buying */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-tight">Buying</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Used Cars</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">New Cars</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Certified Pre-Owned</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Car Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Selling */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-tight">Selling</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Sell Your Car</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Instant Offer</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Dealer Login</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Seller Advice</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-tight">Company</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RideMarket. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
