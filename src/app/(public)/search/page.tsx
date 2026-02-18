import { FilterSidebar } from "@/components/modules/search/filter-sidebar";
import { ResultsGrid } from "@/components/modules/search/results-grid";

type SearchPageProps = {
    searchParams?: Promise<{
        q?: string;
        make?: string;
        model?: string;
        bodyType?: string;
        minPrice?: string;
        maxPrice?: string;
        minYear?: string;
        maxYear?: string;
        sort?: string;
    }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const filters = {
        q: params?.q,
        make: params?.make,
        model: params?.model,
        bodyType: params?.bodyType,
        minPrice: params?.minPrice,
        maxPrice: params?.maxPrice,
        minYear: params?.minYear,
        maxYear: params?.maxYear,
        sort: params?.sort,
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
