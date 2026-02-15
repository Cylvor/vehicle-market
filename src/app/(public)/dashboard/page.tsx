import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Heart, MessageSquare, TrendingUp, DollarSign, Activity, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage({ searchParams }: { searchParams: { mode?: string } }) {
    // Mode defaults to buyer if not specified or invalid, but checks explicitly for 'seller'
    // Note: searchParams is a promise in newer Next.js versions but often accessible directly in older app router versions.
    // Assuming Next.js 14/15 typings, searchParams might need awaiting if it's dynamic, 
    // but for simple cases props usually work. 

    // Safe access to mode
    const mode = searchParams?.mode === "seller" ? "seller" : "buyer";

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {mode === 'seller' ? 'Seller Dashboard' : 'Buyer Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                    {mode === 'seller'
                        ? 'Manage your listings and view performance.'
                        : 'Manage your saved cars and enquiries.'}
                </p>
            </div>

            {mode === "buyer" ? (
                /* Buyer Overview */
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Saved Vehicles</CardTitle>
                                <Heart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4</div>
                                <p className="text-xs text-muted-foreground">2 new this week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Enquiries Sent</CardTitle>
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-xs text-muted-foreground">Last sent 2h ago</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-muted-foreground">Toyota, SUV, Under $20k</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-lg border bg-muted/40 p-6">
                        <h3 className="font-semibold text-lg mb-4">Jump Back In</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/search">
                                <Button className="gap-2">
                                    <Search className="h-4 w-4" />
                                    Browse Vehicles
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                /* Seller Overview */
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                                <Car className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-muted-foreground">+1 this month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">234</div>
                                <p className="text-xs text-muted-foreground">+12% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">3 unread</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">Your Latest Listing</h3>
                                <Link href="/dashboard/listings?mode=seller">
                                    <Button variant="ghost" size="sm">View All</Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">IMG</div>
                                <div>
                                    <p className="font-medium">2020 Toyota Corolla ZR Hybrid</p>
                                    <p className="text-sm text-muted-foreground">$32,500 • Active</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-dashed p-6 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-3 bg-muted rounded-full">
                                <Car className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Sell another car?</h3>
                                <p className="text-sm text-muted-foreground max-w-xs mx-auto">Create a new listing in minutes and reach thousands of buyers.</p>
                            </div>
                            <Link href="/sell/create">
                                <Button variant="outline">Create New Listing</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
