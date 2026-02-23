import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, Trash2, X } from "lucide-react";
import { deleteVehicleAsAdmin, getAdminVehicles, updateVehicleStatus } from "@/actions/vehicle";
import Link from "next/link";

export default async function AdminListingsPage() {
    const listings = await getAdminVehicles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Listings Management</h1>
                    <p className="text-muted-foreground">Approve, reject, or remove vehicle listings.</p>
                </div>
            </div>

            <div className="border rounded-md bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Seller Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {listings.map((listing) => (
                            <tr key={listing.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{listing.year} {listing.make} {listing.model}</span>
                                        <span className="text-xs text-muted-foreground">{listing.createdAt.toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{listing.sellerName || "N/A"}</td>
                                <td className="px-6 py-4">${listing.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={
                                        listing.status === 'active' ? 'default' :
                                            listing.status === 'rejected' ? 'destructive' : 'secondary'
                                    }>
                                        {listing.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {listing.status === 'pending' && (
                                            <>
                                                <form action={async () => {
                                                    "use server";
                                                    await updateVehicleStatus(listing.id, "active");
                                                }}>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve">
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                                <form action={async () => {
                                                    "use server";
                                                    await updateVehicleStatus(listing.id, "rejected");
                                                }}>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Reject">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </>
                                        )}
                                        <Button asChild size="icon" variant="ghost" className="h-8 w-8" title="View">
                                            <Link href={`/admin/listings/${listing.id}`} aria-label="View listing details">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={async () => {
                                            "use server";
                                            await deleteVehicleAsAdmin(listing.id);
                                        }}>
                                            <Button type="submit" size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
