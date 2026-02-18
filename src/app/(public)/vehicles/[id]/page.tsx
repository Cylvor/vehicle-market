import { VehicleGallery } from "@/components/modules/vehicles/vehicle-gallery";
import { VehicleInfo } from "@/components/modules/vehicles/vehicle-info";
import { SellerContact } from "@/components/modules/vehicles/seller-contact";
import { getVehicleById } from "@/actions/vehicle";
import { notFound } from "next/navigation";

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

    const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ""}`;
    const description = vehicle.description ?? "No description provided.";
    const features = vehicle.features ?? [];
    const images = vehicle.images?.length ? vehicle.images : ["/vehicles/tesla-model-3.svg"];

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
                        <SellerContact />
                    </div>
                </div>
            </div>
        </div>
    );
}
