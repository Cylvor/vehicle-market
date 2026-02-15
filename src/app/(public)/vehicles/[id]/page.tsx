import { VehicleGallery } from "@/components/modules/vehicles/vehicle-gallery";
import { VehicleInfo } from "@/components/modules/vehicles/vehicle-info";
import { SellerContact } from "@/components/modules/vehicles/seller-contact";

// Mock Data for individual vehicle
const MOCK_VEHICLE = {
    id: "1",
    title: "2023 Tesla Model 3 Long Range",
    price: "$58,900",
    description: `Experience the future of driving with this pristine 2023 Tesla Model 3 Long Range. 
  
  Featuring dual motor all-wheel drive, this vehicle offers incredible acceleration and handling. The minimalist interior is highlighted by the 15-inch touchscreen display, giving you control over everything from navigation to climate control. 
  
  This car has been meticulously maintained and comes with the remainder of the factory warranty.`,
    specs: {
        mileage: "12,500 km",
        transmission: "Automatic",
        fuel: "Electric",
        bodyType: "Sedan",
        engine: "Dual Motor",
        color: "Pearl White Multi-Coat",
    },
    features: [
        "Autopilot",
        "Premium Interior",
        "Heated Seats",
        "Glass Roof",
        "Wireless Charging",
        "Sentry Mode",
    ],
    images: [
        "/vehicles/tesla-model-3.svg",
        "/vehicles/tesla-model-3.svg",
        "/vehicles/tesla-model-3.svg",
        "/vehicles/tesla-model-3.svg",
    ],
};

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, we would fetch data based on params.id

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Gallery & Info */}
                <div className="lg:col-span-2 space-y-8">
                    <VehicleGallery images={MOCK_VEHICLE.images} />
                    <VehicleInfo {...MOCK_VEHICLE} />
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
