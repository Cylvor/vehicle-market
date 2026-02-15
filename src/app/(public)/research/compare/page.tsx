import { ComparisonTable } from "@/components/modules/research/comparison-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ComparePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Vehicles</h1>
                    <p className="text-muted-foreground">
                        See how your top choices stack up against each other.
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Vehicle
                </Button>
            </div>

            <ComparisonTable />

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                <strong>Tip:</strong> You can add vehicles to this comparison directly from search results or vehicle detail pages.
            </div>
        </div>
    );
}
