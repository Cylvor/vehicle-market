import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data lookup (in a real app this would be a DB fetch)
const getArticle = (slug: string) => {
    // Just return a generic dummy article for any slug for now
    return {
        slug,
        title: "2024 Toyota HiLux Review: Still the King?",
        category: "Reviews",
        date: "Feb 14, 2024",
        author: "James Smith",
        content: `
            <p class="lead text-xl text-muted-foreground mb-6">The Toyota HiLux has been Australia's favourite vehicle for years, but with strong competition from Ford and Isuzu, does the latest update do enough to keep it on top?</p>
            
            <h3 class="text-2xl font-bold mt-8 mb-4">Introduction</h3>
            <p class="mb-4">The ute segment is more competitive than ever. It's no longer just about load-lugging capability; buyers now demand sedan-like comfort, advanced safety tech, and premium interiors. The updated HiLux brings mild-hybrid technology to the 2.8L turbo diesel engine, promising better efficiency and smoother stop-start operation.</p>
            
            <h3 class="text-2xl font-bold mt-8 mb-4">Driving Impressions</h3>
            <p class="mb-4">On the road, the changes are subtle but noticeable. The 48-volt system makes the engine feel slightly more responsive off the line, and the refinement has improved. The ride quality remains firm unladen, typical of a dual-cab meant for work, but it settles down nicely with some weight in the tray.</p>
            
            <h3 class="text-2xl font-bold mt-8 mb-4">Interior & Tech</h3>
            <p class="mb-4">Inside, the infotainment screen has been updated, though it still lags slightly behind the class-leading interface in the Ranger. However, physical buttons for climate control remain a welcome feature for usability.</p>
            
            <h3 class="text-2xl font-bold mt-8 mb-4">Verdict</h3>
            <p class="mb-4">The Toyota HiLux remains a formidable choice. It offers unbeatable reliability, a massive refined dealer network, and strong resale value. While it might not be the newest kid on the block, it's a safe pair of hands that continues to get the job done.</p>
        `
    };
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge>{article.category}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" />
                                {article.date}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                                <User className="h-4 w-4" />
                            </div>
                            By <span className="font-medium text-foreground">{article.author}</span>
                        </div>
                    </div>

                    <div className="aspect-video bg-muted rounded-md mb-10 flex items-center justify-center text-muted-foreground">
                        ARTICLE HERO IMAGE
                    </div>

                    <div
                        className="prose prose-zinc dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="rounded-md border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Mentioned in this article</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center">
                                <div className="h-16 w-24 bg-muted rounded flex items-center justify-center text-xs">IMG</div>
                                <div>
                                    <p className="font-medium">2024 Toyota HiLux</p>
                                    <p className="text-sm text-muted-foreground">From $26,400</p>
                                </div>
                            </div>
                            <Link href="/search?make=Toyota&model=HiLux">
                                <Button className="w-full mt-4" variant="outline">View 24 Listings</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-md bg-muted/50 p-6">
                        <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
                        <p className="text-sm text-muted-foreground mb-4">Get the latest reviews and automotive news delivered to your inbox.</p>
                        <div className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            />
                            <Button className="w-full">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
