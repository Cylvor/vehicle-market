import { NewsCard } from "@/components/modules/news/news-card";

const ARTICLES = [
    {
        slug: "2024-toyota-hilux-review",
        title: "2024 Toyota HiLux Review: Still the King?",
        excerpt: "We take the updated HiLux for a spin to see if it can hold off the new Ford Ranger in the ute wars.",
        category: "Reviews",
        date: "Feb 14, 2024",
    },
    {
        slug: "electric-car-sales-surge",
        title: "Electric Car Sales Surge in Australia",
        excerpt: "New data shows EV adoption is accelerating faster than predicted, driven by new affordable models.",
        category: "News",
        date: "Feb 12, 2024",
    },
    {
        slug: "buying-used-car-guide",
        title: "The Ultimate Guide to Buying a Used Car",
        excerpt: "Don't get lemons. Here are the 10 things you simply must check before handing over your cash.",
        category: "Advice",
        date: "Feb 10, 2024",
    },
    {
        slug: "tesla-model-3-update",
        title: "Tesla Model 3 Highland Update Arrives",
        excerpt: "The popular electric sedan gets a facelift, new interior materials, and a quieter cabin.",
        category: "News",
        date: "Feb 08, 2024",
    },
    {
        slug: "best-family-suvs-2024",
        title: "Best Family SUVs of 2024",
        excerpt: "Space, safety, and efficiency. We rank the top 5 SUVs for growing families.",
        category: "Reviews",
        date: "Feb 05, 2024",
    }
];

export default function NewsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">News & Reviews</h1>
                <p className="text-lg text-muted-foreground">
                    The latest automotive news, expert reviews, and helpful advice for Aussie car buyers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ARTICLES.map((article) => (
                    <NewsCard key={article.slug} {...article} />
                ))}
            </div>
        </div>
    );
}
