import { ListingForm } from "@/components/modules/sell/listing-form";

export default function CreateListingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 lg:py-16">
            <div className="container-width">
                <div className="mb-10 max-w-2xl px-4 md:px-0">
                    <span className="mb-3 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">
                        OFFER YOUR VEHICLE
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                        Create Your Listing
                    </h1>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        Complete the details below to reach thousands of car buyers across Australia.
                    </p>
                </div>
                
                <div className="rounded-3xl border border-border/70 bg-card/60 p-5 md:p-8 lg:p-10 backdrop-blur-md shadow-xl">
                    <ListingForm />
                </div>
            </div>
        </div>
    );
}
