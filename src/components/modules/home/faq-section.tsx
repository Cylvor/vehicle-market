import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
    {
        value: "fees",
        question: "Are there any fees to list a vehicle?",
        answer: "Basic listings are free. Premium promotion options may include additional charges in the future.",
    },
    {
        value: "verification",
        question: "How do you verify sellers?",
        answer: "Seller profiles and listing activity are reviewed to reduce spam and improve buyer trust.",
    },
    {
        value: "safety",
        question: "How can I stay safe when meeting a seller?",
        answer: "Use in-app messaging first, meet in public places, and complete proper ownership checks before payment.",
    },
    {
        value: "inspection",
        question: "Can I request an inspection before buying?",
        answer: "Yes. You can coordinate inspections directly with the seller before making a final decision.",
    },
];

export function FaqSection() {
    return (
        <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container-width">
                <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
                    SUPPORT
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">FAQ</h2>
                <p className="mt-2 text-muted-foreground">Common questions about listing, verification, and buying safely.</p>

                <div className="mt-8 rounded-md border border-border/70 bg-card p-2 md:p-4 shadow-sm">
                    <Accordion type="single" collapsible className="w-full">
                        {FAQ_ITEMS.map((item) => (
                            <AccordionItem key={item.value} value={item.value}>
                                <AccordionTrigger className="text-left font-semibold hover:text-accent transition-colors">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
