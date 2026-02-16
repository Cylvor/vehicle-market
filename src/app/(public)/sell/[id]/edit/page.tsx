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
        <div className="container mx-auto px-4 py-8">
            <ListingForm vehicleId={vehicle.id} initialData={initialData} />
        </div>
    );
}
