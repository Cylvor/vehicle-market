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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <div className="pt-28 pb-10 lg:pt-32 lg:pb-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Left filter bar - Locked width */}
                        <aside className="w-full lg:w-[320px] flex-shrink-0">
                            <FilterSidebar />
                        </aside>

                        {/* Main results area - Takes remaining space */}
                        <main className="flex-1 min-w-0 w-full">
                            <ResultsGrid filters={filters} />
                        </main>

                    </div>
                </div>
            </div>
        </div>
    );
}