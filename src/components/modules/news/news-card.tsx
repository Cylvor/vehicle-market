import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface NewsCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image?: string;
    slug: string;
}

export function NewsCard({ title, excerpt, category, date, image, slug }: NewsCardProps) {
    return (
        <Link href={`/news/${slug}`} className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video w-full bg-muted relative overflow-hidden">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                    NEWS IMAGE
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs font-normal">
                        {category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {date}
                    </span>
                </div>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {excerpt}
                </p>
            </div>
        </Link>
    );
}
