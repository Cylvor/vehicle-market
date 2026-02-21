"use client";

import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, User } from "lucide-react";

interface SellerContactProps {
    sellerName: string;
    sellerLocation: string;
    sellerImageUrl: string;
}

export function SellerContact({ sellerName, sellerLocation, sellerImageUrl }: SellerContactProps) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user) return;
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setEmail(user.primaryEmailAddress?.emailAddress ?? "");
    }, [isLoaded, isSignedIn, user]);

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
            <div>
                <h3 className="font-semibold text-lg">Contact Seller</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border">
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

            {!isLoaded ? (
                <p className="text-sm text-muted-foreground">Loading contact form...</p>
            ) : !isSignedIn ? (
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Please sign in to contact the seller.</p>
                    <SignInButton mode="modal">
                        <Button type="button" className="w-full">Sign In to Contact</Button>
                    </SignInButton>
                </div>
            ) : (
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <Input
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Phone Number"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Textarea
                        placeholder="I'm interested in this car..."
                        className="min-h-[100px]"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">Send Enquiry</Button>
                </form>
            )}
        </div>
    );
}
