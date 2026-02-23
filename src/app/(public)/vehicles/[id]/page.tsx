import { VehicleGallery } from "@/components/modules/vehicles/vehicle-gallery";
import { VehicleInfo } from "@/components/modules/vehicles/vehicle-info";
import { SellerContact } from "@/components/modules/vehicles/seller-contact";
import { getVehicleById, trackVehicleView } from "@/actions/vehicle";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
    }).format(price);
}

export default async function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const vehicle = await getVehicleById(id);

    if (!vehicle) {
        notFound();
    }

    await trackVehicleView(vehicle.id);

    const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ""}`;
    const description = vehicle.description ?? "No description provided.";
    const features = vehicle.features ?? [];
    const images = vehicle.images?.length ? vehicle.images : ["/vehicles/tesla-model-3.svg"];

    let sellerName = "Seller";
    let sellerLocation = "Location not available";
    let sellerImageUrl = "/images/avatar-placeholder.svg";

    try {
        const client = await clerkClient();
        const seller = await client.users.getUser(vehicle.userId);
        const unsafeMetadata = (seller.unsafeMetadata ?? {}) as { location?: string; address?: string };
        const publicMetadata = (seller.publicMetadata ?? {}) as { location?: string; address?: string };
        sellerName =
            seller.fullName?.trim() ||
            [seller.firstName, seller.lastName].filter(Boolean).join(" ") ||
            "Seller";
        sellerLocation =
            unsafeMetadata.location?.trim() ||
            unsafeMetadata.address?.trim() ||
            publicMetadata.location?.trim() ||
            publicMetadata.address?.trim() ||
            "Location not available";
        sellerImageUrl = seller.imageUrl || "/images/avatar-placeholder.svg";
    } catch {
        // ignore and fallback to generic seller details
    }

    return (
        <div className="container mx-auto px-4 pt-24 md:pt-28 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Gallery & Info */}
                <div className="lg:col-span-2 space-y-8">
                    <VehicleGallery images={images} />
                    <VehicleInfo
                        title={title}
                        year={vehicle.year}
                        price={formatPrice(vehicle.price)}
                        description={description}
                        specs={{
                            mileage: `${vehicle.odometer.toLocaleString("en-AU")} km`,
                            transmission: vehicle.transmission,
                            fuel: vehicle.fuel,
                            bodyType: vehicle.bodyType,
                            engine: "N/A",
                            color: vehicle.colour ?? "N/A",
                        }}
                        features={features}
                    />
                </div>

                {/* Right Column: Contact Seller (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <SellerContact
                            vehicleId={vehicle.id}
                            sellerName={sellerName}
                            sellerLocation={sellerLocation}
                            sellerImageUrl={sellerImageUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
