import { FilterSidebar } from "@/components/modules/search/filter-sidebar";
import { ResultsGrid } from "@/components/modules/search/results-grid";

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <FilterSidebar />
                </aside>
                <main className="flex-1">
                    <ResultsGrid />
                </main>
            </div>
        </div>
    );
}
