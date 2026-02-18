import { FilterSidebar } from "@/components/modules/search/filter-sidebar";
import { ResultsGrid } from "@/components/modules/search/results-grid";

type SearchPageProps = {
    searchParams?: {
        make?: string;
        model?: string;
        bodyType?: string;
        minPrice?: string;
        maxPrice?: string;
    };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
    const filters = {
        make: searchParams?.make,
        model: searchParams?.model,
        bodyType: searchParams?.bodyType,
        minPrice: searchParams?.minPrice,
        maxPrice: searchParams?.maxPrice,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <FilterSidebar />
                </aside>
                <main className="flex-1">
                    <ResultsGrid filters={filters} />
                </main>
            </div>
        </div>
    );
}
