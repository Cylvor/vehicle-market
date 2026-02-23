import { getAdminVehicleById } from "@/actions/vehicle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
    }).format(price);
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

export default async function AdminListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const vehicle = await getAdminVehicleById(id);

    if (!vehicle) {
        notFound();
    }

    const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ""}`;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Listing Details</h1>
                    <p className="text-muted-foreground">Full vehicle information for admin review.</p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/admin/listings">Back to Listings</Link>
                </Button>
            </div>

            <div className="border rounded-md bg-card p-6 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{title}</h2>
                    </div>
                    <Badge
                        variant={
                            vehicle.status === "active"
                                ? "default"
                                : vehicle.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                        }
                    >
                        {vehicle.status}
                    </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
                    <div><span className="text-muted-foreground">Seller Name:</span> {vehicle.sellerName || "N/A"}</div>
                    <div><span className="text-muted-foreground">Seller Location:</span> {vehicle.sellerLocation || "N/A"}</div>
                    <div><span className="text-muted-foreground">Price:</span> {formatPrice(vehicle.price)}</div>
                    <div><span className="text-muted-foreground">Odometer:</span> {vehicle.odometer.toLocaleString("en-AU")} km</div>
                    <div><span className="text-muted-foreground">Body Type:</span> {vehicle.bodyType}</div>
                    <div><span className="text-muted-foreground">Fuel:</span> {vehicle.fuel}</div>
                    <div><span className="text-muted-foreground">Transmission:</span> {vehicle.transmission}</div>
                    <div><span className="text-muted-foreground">Colour:</span> {vehicle.colour || "N/A"}</div>
                    <div><span className="text-muted-foreground">Created:</span> {formatDate(vehicle.createdAt)}</div>
                    <div><span className="text-muted-foreground">Updated:</span> {formatDate(vehicle.updatedAt)}</div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{vehicle.description || "No description provided."}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="font-semibold mb-2">Features</h3>
                        {vehicle.features && vehicle.features.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {vehicle.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No features listed.</p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Tags</h3>
                        {vehicle.tags && vehicle.tags.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {vehicle.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No tags listed.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Images</h3>
                    {vehicle.images && vehicle.images.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {vehicle.images.map((image, index) => (
                                <img
                                    key={`${image}-${index}`}
                                    src={image}
                                    alt={`${title} image ${index + 1}`}
                                    className="w-full h-48 rounded-md border object-cover bg-muted"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No images uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
