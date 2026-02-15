import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background" />

            {/* Abstract Shapes */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50" />

            <div className="container-width relative z-10">
                <div className="mx-auto max-w-4xl text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
                            Find your next car <br className="hidden sm:block" />
                            <span className="text-gradient">with confidence</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Search thousands of new and used cars from dealers and private sellers across Australia. Simple, transparent, and safe.
                        </p>
                    </div>

                    <div className="relative mx-auto max-w-3xl mt-12 p-2 bg-background/80 backdrop-blur-md rounded-2xl shadow-premium border border-border/50">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Make, model, or keyword"
                                    className="w-full h-12 pl-12 pr-4 rounded-xl border-transparent bg-transparent text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-border/50 focus:ring-0 transition-all"
                                />
                            </div>
                            <div className="w-px h-8 bg-border hidden sm:block self-center" />
                            <div className="flex-1 relative sm:max-w-[200px] group">
                                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Postcode"
                                    className="w-full h-12 pl-12 pr-4 rounded-xl border-transparent bg-transparent text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-border/50 focus:ring-0 transition-all"
                                />
                            </div>
                            <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-md shrink-0 rounded-xl">
                                Search Cars
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground pt-4">
                        <span className="font-medium text-foreground">Popular:</span>
                        <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">SUV</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">Ute</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">Toyota Hilux</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">Ford Ranger</a>
                        <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">Tesla Model 3</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
