import { NewsCard } from "@/components/modules/news/news-card";
import Image from "next/image";

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
        <div className="flex flex-col min-h-screen">
            {/* News Hero */}
            <section className="relative h-[60svh] min-h-[400px] w-full overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/car3.jpg"
                        alt="News & Reviews"
                        fill
                        priority
                        className="object-cover brightness-[0.4]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
                    <div className="max-w-3xl">
                        <span className="mb-4 inline-block rounded-md border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 backdrop-blur-md">
                            AUTO INSIGHTS
                        </span>
                        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl leading-[1.1]">
                            News & <span className="text-blue-400">Reviews</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 sm:text-xl leading-relaxed">
                            Stay ahead with the latest automotive news, expert reviews, and helpful advice for Aussie car buyers.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-width py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.map((article) => (
                        <NewsCard key={article.slug} {...article} />
                    ))}
                </div>
            </div>
        </div>
    );
}
