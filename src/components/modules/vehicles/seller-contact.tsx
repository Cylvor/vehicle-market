import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export function SellerContact() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <div>
                <h3 className="font-semibold text-lg">Contact Seller</h3>
                <p className="text-sm text-muted-foreground">Detailed Motors Sydney</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">0400 123 456</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">sales@detailedmotors.com.au</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">123 Car St, Sydney NSW 2000</span>
                </div>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" />
                <Input placeholder="Phone Number" />
                <Textarea placeholder="I'm interested in this car..." className="min-h-[100px]" />
                <Button className="w-full">Send Enquiry</Button>
            </form>
        </div>
    );
}
