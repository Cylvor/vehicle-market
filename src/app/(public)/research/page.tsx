import { getVehicles } from "@/actions/vehicle";
import { ResearchClient } from "@/components/modules/research/research-client";

export const metadata = {
    title: "Research Vehicles | CYLVOR",
    description: "Compare and research vehicles to find your perfect match.",
};

export default async function ResearchPage() {
    const vehicles = await getVehicles();

    return (
        <main className="bg-slate-950 text-slate-200 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
                        Research & Compare
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Select up to 3 vehicles to compare their features, specifications, and prices side-by-side to make an informed decision.
                    </p>
                </div>

                <ResearchClient vehicles={vehicles} />
            </div>
        </main>
    );
}
