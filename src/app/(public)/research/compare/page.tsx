import { ComparisonTable } from "@/components/modules/research/comparison-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Compare Vehicles | CYLVOR",
    description: "Compare multiple vehicles side-by-side to make your choice.",
};

export default function ComparePage() {
    return (
        <main className="bg-slate-950 text-slate-200 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <Button asChild variant="ghost" className="mb-6 text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30">
                    <Link href="/research">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Research List
                    </Link>
                </Button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 drop-shadow-sm">
                            Compare Your Selection
                        </h1>
                        <p className="text-slate-400">
                            See how your top choices stack up against each other.
                        </p>
                    </div>
                </div>

                <ComparisonTable />

                <div className="mt-8 p-4 bg-emerald-950/20 border border-emerald-900 rounded-lg text-sm text-emerald-300">
                    <strong>Tip:</strong> You can add vehicles to this comparison directly from the Research page. Up to 3 vehicles can be compared simultaneously for the best viewing experience.
                </div>
            </div>
        </main>
    );
}
