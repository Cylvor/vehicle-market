import { Search, MessageCircle, Handshake } from "lucide-react";

const STEPS = [
    {
        title: "Search",
        description: "Use smart filters to find cars that fit your budget and preferences.",
        icon: Search,
    },
    {
        title: "Contact",
        description: "Message verified sellers directly and ask for details or inspection times.",
        icon: MessageCircle,
    },
    {
        title: "Buy / Sell",
        description: "Close deals with confidence or list your car quickly for serious buyers.",
        icon: Handshake,
    },
];

export function HowItWorks() {
    return (
        <section className="py-16 lg:py-20 bg-background">
            <div className="container-width">
                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                    3 SIMPLE STEPS
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
                <p className="mt-2 text-muted-foreground">Three simple steps to move from search to deal.</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {STEPS.map((step, index) => (
                        <article key={step.title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                                    <step.icon className="h-5 w-5" />
                                </div>
                                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Step {index + 1}</span>
                            </div>

                            <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
