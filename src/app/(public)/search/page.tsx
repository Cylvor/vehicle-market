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
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 font-sans">
            <div className="pt-28 pb-10 lg:pt-26 lg:pb-16">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left filter bar fixed to page edge */}
                    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main results area balanced within site container */}
                    <main className="flex-1 min-w-0">
                        <div className="container-width">
                            <ResultsGrid filters={filters} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
