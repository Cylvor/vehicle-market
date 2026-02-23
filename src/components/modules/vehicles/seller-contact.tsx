"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createEnquiry } from "@/actions/enquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, User } from "lucide-react";
import { toast } from "sonner";

interface SellerContactProps {
    vehicleId: string;
    sellerName: string;
    sellerLocation: string;
    sellerImageUrl: string;
}

export function SellerContact({ vehicleId, sellerName, sellerLocation, sellerImageUrl }: SellerContactProps) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user) return;
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.primaryEmailAddress?.emailAddress ?? "");
    }, [isLoaded, isSignedIn, user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsSubmitting(true);

            await createEnquiry({
                vehicleId,
                firstName,
                lastName,
                email,
                phone: phoneNumber,
                message,
            });

            toast.success("Enquiry sent successfully");
            setMessage("");
            setPhoneNumber("");

            if (!isSignedIn) {
                setFirstName("");
                setLastName("");
                setEmail("");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send enquiry", {
                description: "Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-md border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <div>
                <h3 className="font-semibold text-lg">Contact Seller</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                        <img
                            src={sellerImageUrl}
                            alt={`${sellerName} profile image`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">{sellerName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{sellerLocation}</span>
                </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                    <Input
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                <Input
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
                <Input
                    placeholder="Phone Number"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isSubmitting}
                />
                <Textarea
                    placeholder="I'm interested in this car..."
                    className="min-h-[100px]"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    required
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
            </form>
        </div>
    );
}
