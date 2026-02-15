import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted/40 border-t">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">RideMarket</h3>
                        <p className="text-sm text-muted-foreground">
                            Australia's #1 for cars. We make buying and selling cars easy and safe.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Buying */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Buying</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Used Cars</Link></li>
                            <li><Link href="#" className="hover:text-primary">New Cars</Link></li>
                            <li><Link href="#" className="hover:text-primary">Certified Pre-Owned</Link></li>
                            <li><Link href="#" className="hover:text-primary">Car Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Selling */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Selling</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Sell Your Car</Link></li>
                            <li><Link href="#" className="hover:text-primary">Instant Offer</Link></li>
                            <li><Link href="#" className="hover:text-primary">Dealer Login</Link></li>
                            <li><Link href="#" className="hover:text-primary">Seller Advice</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                            <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RideMarket. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
