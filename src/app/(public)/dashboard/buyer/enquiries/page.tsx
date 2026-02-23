import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSentEnquiries } from "@/actions/enquiry";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function buildVehicleTitle(enquiry: {
    vehicleYear: number;
    vehicleMake: string;
    vehicleModel: string;
    vehicleVariant: string | null;
}) {
    return `${enquiry.vehicleYear} ${enquiry.vehicleMake} ${enquiry.vehicleModel}${enquiry.vehicleVariant ? ` ${enquiry.vehicleVariant}` : ""}`;
}

export default async function DashboardEnquiriesPage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const enquiries = await getSentEnquiries();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Enquiries Sent</h1>
                <p className="text-muted-foreground">Your messages sent to vehicle sellers.</p>
            </div>

            {enquiries.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No enquiries sent yet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">When you contact a seller from a listing, the enquiry will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {enquiries.map((enquiry) => {
                        const fullName = `${enquiry.firstName} ${enquiry.lastName ?? ""}`.trim();
                        const vehicleTitle = buildVehicleTitle(enquiry);
                        const vehicleImage = enquiry.vehicleImages?.[0] || "/placeholder-car.png";
                        const sellerImage = enquiry.sellerImageUrl || "/images/avatar-placeholder.svg";
                        const sellerName = enquiry.sellerName || "Seller";

                        return (
                            <Card key={enquiry.id}>
                                <CardHeader className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <CardTitle className="text-lg">{vehicleTitle}</CardTitle>
                                        <Badge variant="outline">{formatDate(enquiry.createdAt)}</Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 pt-1">
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-10 w-14 overflow-hidden rounded-md border bg-muted">
                                                <Image
                                                    src={vehicleImage}
                                                    alt={vehicleTitle}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground">Vehicle</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-muted">
                                                <Image
                                                    src={sellerImage}
                                                    alt={sellerName}
                                                    fill
                                                    className="object-cover"
                                                    sizes="40px"
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground">Seller: {sellerName}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Your contact: {fullName} ({enquiry.email})
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p><span className="font-medium">Phone:</span> {enquiry.phone || "Not provided"}</p>
                                    <p><span className="font-medium">Message:</span> {enquiry.message}</p>
                                    <p>
                                        <span className="font-medium">Listing:</span>{" "}
                                        <Link href={`/vehicles/${enquiry.vehicleId}`} className="underline underline-offset-4">
                                            View vehicle
                                        </Link>
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
