import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SellCarCtaBanner() {
    return (
        <section className="py-14 bg-background">
            <div className="container-width">
                <div className="relative overflow-hidden rounded-md border border-accent/30 bg-accent/10 p-6 md:p-8 lg:p-10">
                    <div className="absolute inset-0">
                        <Image
                            src="/images/hero/car4.jpg"
                            alt="Sell your vehicle"
                            fill
                            className="object-cover opacity-20"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/70" />
                    </div>
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-md bg-accent/15 blur-3xl" />
                    <div className="pointer-events-none absolute -left-10 -bottom-14 h-40 w-40 rounded-md bg-background/60 blur-2xl" />
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Sell Your Car Faster</h2>
                        <p className="mt-2 text-foreground/80 max-w-2xl">
                            Create a listing in minutes, reach active buyers, and manage everything from your dashboard.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button asChild className="h-11 px-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
                                <Link href="/sell/create">List your car now</Link>
                            </Button>
                            <Button asChild variant="outline" className="h-11 px-6 font-semibold bg-background/90 backdrop-blur-sm">
                                <Link href="/dashboard/seller/listings">View seller dashboard</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
