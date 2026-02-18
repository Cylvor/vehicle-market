import { getUserVehicleById } from "@/actions/vehicle";
import { ListingForm } from "@/components/modules/sell/listing-form";
import { VehicleInput } from "@/lib/validations/vehicle";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

interface EditListingPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: EditListingPageProps) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const { id } = await params;
    const vehicle = await getUserVehicleById(id);

    if (!vehicle) {
        notFound();
    }

    const initialData: VehicleInput = {
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        variant: vehicle.variant ?? "",
        price: vehicle.price,
        odometer: vehicle.odometer,
        description: vehicle.description ?? "",
        fuel: vehicle.fuel,
        transmission: vehicle.transmission,
        bodyType: vehicle.bodyType,
        colour: vehicle.colour ?? "",
        features: Array.isArray(vehicle.features) ? vehicle.features : [],
        images: Array.isArray(vehicle.images) ? vehicle.images : [],
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 lg:py-16">
            <div className="container-width">
                <div className="mb-10 max-w-2xl px-4 md:px-0">
                    <span className="mb-3 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">
                        UPDATE YOUR LISTING
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                        Edit: {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                        Update the details of your listing to keep it accurate for potential buyers.
                    </p>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card/60 p-5 md:p-8 lg:p-10 backdrop-blur-md shadow-xl">
                    <ListingForm vehicleId={vehicle.id} initialData={initialData} />
                </div>
            </div>
        </div>
    );
}
