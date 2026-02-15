import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Mock listings
const MY_LISTINGS = [
    {
        id: "1",
        title: "2020 Toyota Corolla ZR Hybrid",
        price: "$32,500",
        status: "Active",
        views: 145,
        enquiries: 3,
        date: "12 Feb 2024"
    },
    {
        id: "2",
        title: "2018 Ford Ranger Wildtrak",
        price: "$45,000",
        status: "Sold",
        views: 890,
        enquiries: 12,
        date: "10 Jan 2024"
    }
];

export default function MyListingsPage() {
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
                        {MY_LISTINGS.map((listing) => (
                            <tr key={listing.id} className="bg-card hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-3 font-medium">{listing.title}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                                        {listing.status}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">{listing.price}</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {listing.views} views • {listing.enquiries} enquiries
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <Button variant="ghost" size="icon" title="View">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Edit">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
