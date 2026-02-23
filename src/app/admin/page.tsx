import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertTriangle, DollarSign } from "lucide-react";
import { getAdminDashboardData } from "@/actions/admin";
import Image from "next/image";

function formatRelativeDate(date: Date) {
    const now = new Date().getTime();
    const diffMs = now - new Date(date).getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < hour) {
        const mins = Math.max(1, Math.floor(diffMs / minute));
        return `${mins} min${mins === 1 ? "" : "s"} ago`;
    }

    if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(diffMs / day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default async function AdminDashboardPage() {
    const stats = await getAdminDashboardData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
                <p className="text-muted-foreground">Platform statistics and pending actions.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+{stats.newUsersThisWeek.toLocaleString()} this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeListings.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+{stats.newListingsThisWeek.toLocaleString()} new this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Action required</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enquiries (MTD)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.enquiriesMtd.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.enquiriesDeltaPct >= 0 ? "+" : ""}{stats.enquiriesDeltaPct}% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity / Pending List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentListings.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No listings available yet.</p>
                            ) : (
                                stats.recentListings.map((listing) => {
                                    const title = `${listing.year} ${listing.make} ${listing.model}`;
                                    const image = listing.images?.[0] || "/placeholder-car.png";
                                    const sellerName = listing.sellerDisplayName || listing.sellerFallbackName || "Unknown seller";

                                    return (
                                        <div key={listing.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-10 w-16 bg-muted rounded overflow-hidden">
                                                    <Image
                                                        src={image}
                                                        alt={title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{title}</p>
                                                    <p className="text-xs text-muted-foreground">Listed by {sellerName}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-sm">${listing.price.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">{formatRelativeDate(listing.createdAt)}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Platform Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span>Server Load</span>
                                    <span className="font-medium">24%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[24%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span>Storage Used</span>
                                    <span className="font-medium">68%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-[68%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span>Daily API Calls</span>
                                    <span className="font-medium">8.2k / 10k</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[82%]"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
