import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative bg-muted py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                        Find your next car with confidence
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Search thousands of new and used cars from dealers and private sellers across Australia.
                    </p>

                    <div className="relative mx-auto max-w-2xl mt-8 p-4 bg-background rounded-xl shadow-lg border">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by make, model, or keyword"
                                    className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                            <Button size="lg" className="w-full sm:w-auto h-12 text-base">
                                Search
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4 text-sm text-muted-foreground">
                        <span>Popular:</span>
                        <a href="#" className="hover:text-primary transition-colors hover:underline">SUV</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline">Ute</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline">Toyota Hilux</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline">Ford Ranger</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
