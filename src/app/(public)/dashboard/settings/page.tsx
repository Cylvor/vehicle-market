"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAccountSettings, updateAccountSettings } from "@/actions/user";

type AccountValues = {
    fullName: string;
    email: string;
    location: string;
    phone: string;
    imageUrl: string;
};

export default function AccountSettingsPage() {
    const { isLoaded, user } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<AccountValues>({
        fullName: "",
        email: "",
        location: "",
        phone: "",
        imageUrl: "",
    });

    const [fullName, setFullName] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (!isLoaded || !user) return;

        let isMounted = true;

        const load = async () => {
            setIsFetching(true);
            setStatusMessage(null);
            try {
                const data = await getAccountSettings();
                if (!isMounted) return;
                setInitialValues(data);
                setFullName(data.fullName);
                setLocation(data.location);
                setPhone(data.phone);
            } catch {
                if (!isMounted) return;
                setStatusMessage("Failed to load account details.");
            } finally {
                if (isMounted) {
                    setIsFetching(false);
                }
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [isLoaded, user]);

    const syncFromUser = () => {
        setFullName(initialValues.fullName);
        setLocation(initialValues.location);
        setPhone(initialValues.phone);
    };

    const handleEdit = () => {
        setStatusMessage(null);
        syncFromUser();
        setIsEditing(true);
    };

    const handleCancel = () => {
        setStatusMessage(null);
        syncFromUser();
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!user) return;

        setStatusMessage(null);
        setIsSaving(true);

        try {
            const updated = await updateAccountSettings({
                fullName: fullName.trim(),
                email: initialValues.email,
                location: location.trim(),
                phone: phone.trim(),
                imageUrl: initialValues.imageUrl,
            });

            setInitialValues(updated);
            setFullName(updated.fullName);
            setLocation(updated.location);
            setPhone(updated.phone);

            setStatusMessage("Profile updated successfully.");
            setIsEditing(false);
        } catch {
            setStatusMessage("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isLoaded) {
        return <div className="text-sm text-muted-foreground">Loading account details...</div>;
    }

    if (!user) {
        return <div className="text-sm text-muted-foreground">Please sign in to manage account settings.</div>;
    }

    if (isFetching) {
        return <div className="text-sm text-muted-foreground">Loading account details...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardDescription>
                        Email is read-only here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6 pb-2">
                        <Image
                            src={initialValues.imageUrl || user.imageUrl}
                            alt={`${initialValues.fullName || "User"} profile`}
                            width={120}
                            height={120}
                            className="h-28 w-28 rounded-full border object-cover md:h-32 md:w-32"
                        />

                        <div className="grid flex-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={isEditing ? fullName : initialValues.fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={initialValues.email} disabled readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={isEditing ? location : initialValues.location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={!isEditing}
                            placeholder="Enter your location"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={isEditing ? phone : initialValues.phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {!isEditing ? (
                            <Button onClick={handleEdit}>Edit Details</Button>
                        ) : (
                            <>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>

                    {statusMessage ? (
                        <p className="text-sm text-muted-foreground">{statusMessage}</p>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
}
