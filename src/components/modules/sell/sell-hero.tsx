import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function SellHero() {
    return (
        <div className="relative isolate overflow-hidden bg-muted py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Sell your car quickly and effectively
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Get the best price for your vehicle. List in minutes and reach thousands of potential buyers across Australia.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/sell/create">
                                <Button size="lg" className="text-base px-8 py-6">
                                    Start Listing Now
                                </Button>
                            </Link>
                            <Link href="/research/value" className="text-sm font-semibold leading-6 text-foreground">
                                Value my car <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-background p-6 rounded-lg shadow-sm border">
                        <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Maximum Exposure</h3>
                        <p className="text-muted-foreground">Reach Australia's largest audience of serious car buyers.</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-sm border">
                        <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
                        <p className="text-muted-foreground">Privacy tools and tips to help you stay safe while selling.</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-sm border">
                        <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
                        <p className="text-muted-foreground">Intuitive listing tool that guides you through every step.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
