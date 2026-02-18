import { BadgeCheck, ShieldCheck, Zap, Clock3 } from "lucide-react";

const POINTS = [
    {
        title: "Verified Sellers",
        description: "Each seller profile is reviewed to keep listings reliable.",
        icon: BadgeCheck,
    },
    {
        title: "Secure Messaging",
        description: "Connect with sellers privately before sharing personal details.",
        icon: ShieldCheck,
    },
    {
        title: "Fast Listing Flow",
        description: "Create and publish your vehicle listing in a few minutes.",
        icon: Zap,
    },
    {
        title: "Always Up-to-date",
        description: "Daily updates keep new cars and pricing insights fresh.",
        icon: Clock3,
    },
];

export function WhyChooseUs() {
    return (
        <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container-width">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                    TRUST & SPEED
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Why Choose Us</h2>
                <p className="mt-2 text-muted-foreground">Designed for trust, speed, and a smoother car marketplace experience.</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {POINTS.map((point) => (
                        <article key={point.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                                <point.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">{point.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
