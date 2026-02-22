import Link from "next/link";
import { getReceivedEnquiries } from "@/actions/enquiry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default async function DashboardMessagesPage() {
    const enquiries = await getReceivedEnquiries();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Messages Received</h1>
                <p className="text-muted-foreground">Enquiries from buyers on your vehicle listings.</p>
            </div>

            {enquiries.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No messages yet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">When buyers contact you from a listing, their enquiry will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {enquiries.map((enquiry) => {
                        const fullName = `${enquiry.firstName} ${enquiry.lastName ?? ""}`.trim();
                        const vehicleTitle = buildVehicleTitle(enquiry);

                        return (
                            <Card key={enquiry.id}>
                                <CardHeader className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <CardTitle className="text-lg">{fullName}</CardTitle>
                                        <Badge variant="outline">{formatDate(enquiry.createdAt)}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        For: <Link href={`/vehicles/${enquiry.vehicleId}`} className="underline underline-offset-4">{vehicleTitle}</Link>
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p><span className="font-medium">Email:</span> {enquiry.email}</p>
                                    <p><span className="font-medium">Phone:</span> {enquiry.phone || "Not provided"}</p>
                                    <p><span className="font-medium">Message:</span> {enquiry.message}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
