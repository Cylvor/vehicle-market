import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteVehicle, getUserVehicles, updateUserVehicleStatus } from "@/actions/vehicle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

function formatPrice(price: number) {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
    }).format(price);
}

function getStatusBadgeVariant(status: "pending" | "active" | "rejected" | "sold") {
    switch (status) {
        case "active":
            return "default";
        case "rejected":
            return "destructive";
        case "sold":
            return "outline";
        case "pending":
        default:
            return "secondary";
    }
}

export default async function MyListingsPage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const listings = await getUserVehicles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Listings</h2>
                    <p className="text-muted-foreground">Manage your vehicles for sale.</p>
                </div>
                <Link href="/sell/create">
                    <Button>Create New Listing</Button>
                </Link>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-4 py-3">Vehicle</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stats</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {listings.length === 0 ? (
                            <tr className="bg-card">
                                <td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>
                                    No listings yet.
                                </td>
                            </tr>
                        ) : (
                            listings.map((listing) => {
                                const title = `${listing.year} ${listing.make} ${listing.model}${listing.variant ? ` ${listing.variant}` : ""}`;

                                const deleteAction = async () => {
                                    "use server";
                                    await deleteVehicle(listing.id);
                                };

                                const primaryImage = listing.images?.[0] || "/placeholder-car.png";

                                return (
                                    <tr key={listing.id} className="bg-card hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-20 overflow-hidden rounded-md bg-muted">
                                                    <Image
                                                        src={primaryImage}
                                                        alt={title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </div>
                                                <span>{title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Badge variant={getStatusBadgeVariant(listing.status)}>
                                                    {listing.status === "sold" ? "sold out" : listing.status}
                                                </Badge>
                                                {(listing.status === "active" || listing.status === "sold") && (
                                                    <form action={async () => {
                                                        "use server";
                                                        await updateUserVehicleStatus(
                                                            listing.id,
                                                            listing.status === "active" ? "sold" : "active"
                                                        );
                                                    }}>
                                                        <Button type="submit" variant="outline" size="sm">
                                                            {listing.status === "active" ? "Mark Sold Out" : "Mark Active"}
                                                        </Button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{formatPrice(listing.price)}</td>
                                        <td className="px-4 py-3 text-muted-foreground">—</td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <Button asChild variant="ghost" size="icon" title="View">
                                                <Link href={`/vehicles/${listing.id}`} aria-label="View">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild variant="ghost" size="icon" title="Edit">
                                                <Link href={`/sell/${listing.id}/edit`} aria-label="Edit">
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={deleteAction} className="inline-block">
                                                <Button type="submit" variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
