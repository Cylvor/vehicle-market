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
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
            <div className="container-width py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
                        <FilterSidebar />
                    </aside>
                    <main className="flex-1 min-w-0">
                        <ResultsGrid filters={filters} />
                    </main>
                </div>
            </div>
        </div>
    );
}
