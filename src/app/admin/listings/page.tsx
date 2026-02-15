import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Check, X, Trash2 } from "lucide-react";

const LISTINGS = [
    {
        id: "1",
        title: "2023 Tesla Model 3 Long Range",
        seller: "John Smith",
        price: "$58,900",
        date: "Today, 10:23 AM",
        status: "Pending",
    },
    {
        id: "2",
        title: "2018 Ford Ranger Wildtrak",
        seller: "Dealership 1",
        price: "$45,000",
        date: "Yesterday",
        status: "Active",
    },
    {
        id: "3",
        title: "2015 Toyota Corolla",
        seller: "Sarah Jones",
        price: "$15,500",
        date: "Yesterday",
        status: "Rejected",
    },
];

export default function AdminListingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Listings Management</h1>
                    <p className="text-muted-foreground">Approve, reject, or remove vehicle listings.</p>
                </div>
            </div>

            <div className="border rounded-lg bg-card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Seller</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {LISTINGS.map((listing) => (
                            <tr key={listing.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{listing.title}</span>
                                        <span className="text-xs text-muted-foreground">{listing.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{listing.seller}</td>
                                <td className="px-6 py-4">{listing.price}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={
                                        listing.status === 'Active' ? 'default' :
                                            listing.status === 'Rejected' ? 'destructive' : 'secondary'
                                    }>
                                        {listing.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {listing.status === 'Pending' && (
                                            <>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve">
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Reject">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                        <Button size="icon" variant="ghost" className="h-8 w-8" title="View">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {listing.status !== 'Pending' && (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
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
