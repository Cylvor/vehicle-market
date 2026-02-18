import { Star } from "lucide-react";

const REVIEWS = [
    {
        name: "Nuwan Perera",
        location: "Colombo",
        text: "Found my SUV in two days. Seller was verified and the process was very smooth.",
    },
    {
        name: "Sahan Jayasuriya",
        location: "Kandy",
        text: "Listing my car took less than 10 minutes and I got serious buyers quickly.",
    },
    {
        name: "Dilini Fernando",
        location: "Galle",
        text: "Search filters are clear and pricing looked fair compared to other platforms.",
    },
];

export function CustomerReviews() {
    return (
        <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container-width">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                            REAL FEEDBACK
                        </span>
                        <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">Customer Reviews</h2>
                        <p className="mt-2 text-muted-foreground">Trusted by buyers and sellers across Sri Lanka.</p>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-sm">
                        <p className="text-2xl font-bold text-foreground">4.8 / 5</p>
                        <div className="mt-1 flex items-center gap-1 text-accent">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Based on 1,200+ verified reviews</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {REVIEWS.map((review) => (
                        <article key={review.name} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <p className="text-sm leading-relaxed text-foreground/90">“{review.text}”</p>
                            <p className="mt-4 text-sm font-semibold text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.location}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
