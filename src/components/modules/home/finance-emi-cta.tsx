import Link from "next/link";
import Image from "next/image";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinanceEmiCta() {
    return (
        <section className="py-14 bg-muted/30">
            <div className="container-width">
                <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-card to-muted/40 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 shadow-sm">
                    <div>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                            <Calculator className="h-5 w-5" />
                        </div>
                        <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Finance / EMI Calculator</h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl">
                            Estimate monthly payments before contacting sellers and shortlist cars you can comfortably afford.
                        </p>
                    </div>

                    <Button asChild className="h-11 px-6 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/research/compare">Check affordability</Link>
                    </Button>
                </div>

                <div className="mt-5 hidden md:block">
                    <div className="relative h-44 overflow-hidden rounded-2xl border border-border/70">
                        <Image src="/images/hero/car1.jpg" alt="Finance planning car" fill className="object-cover" sizes="100vw" />
                    </div>
                </div>
            </div>
        </section>
    );
}
