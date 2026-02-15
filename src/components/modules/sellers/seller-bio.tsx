import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, User } from "lucide-react";

interface SellerBioProps {
    name: string;
    type: "Private" | "Dealer";
    rating: number;
    reviewCount: number;
    location: string;
    memberSince: string;
}

export function SellerBio({ name, type, rating, reviewCount, location, memberSince }: SellerBioProps) {
    return (
        <div className="bg-card border rounded-lg p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-muted-foreground" />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                    <Badge variant={type === "Dealer" ? "default" : "secondary"}>
                        {type} Seller
                    </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location}
                    </div>
                    <span>Member since {memberSince}</span>
                </div>

                <p className="max-w-2xl text-muted-foreground">
                    Trusted seller on RideMarket. We pride ourselves on offering high-quality vehicles with a complete service history. All cars are mechanically inspected and come with a roadworthy certificate.
                </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                </Button>
                <Button className="flex-1 md:flex-none">Contact Seller</Button>
            </div>
        </div>
    );
}
