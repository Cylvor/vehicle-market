"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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

interface UserSettingsModalProps {
    children: React.ReactNode;
}

export function UserSettingsModal({ children }: UserSettingsModalProps) {
    const { isLoaded, user } = useUser();
    const [open, setOpen] = useState(false);
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

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!open) {
            setIsEditing(false);
            setStatusMessage(null);
            syncFromUser();
        }
    }, [open]);

    // Fetch user details when the user ID is available
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription>
                        Manage your profile details. Email is read-only here.
                    </DialogDescription>
                </DialogHeader>

                {!isLoaded || isFetching ? (
                    <div className="py-8 text-center text-sm text-slate-500">
                        Loading account details...
                    </div>
                ) : !user ? (
                    <div className="py-8 text-center text-sm text-slate-500">
                        Please sign in to manage account settings.
                    </div>
                ) : (
                    <div className="grid gap-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
                            <Image
                                src={initialValues.imageUrl || user.imageUrl}
                                alt={`${initialValues.fullName || "User"} profile`}
                                width={120}
                                height={120}
                                className="h-28 w-28 rounded-xl border border-slate-200 object-cover shadow-sm bg-slate-50"
                            />

                            <div className="grid flex-1 gap-4 w-full">
                                <div className="grid gap-2">
                                    <Label htmlFor="fullName" className="text-slate-600 font-bold">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        value={isEditing ? fullName : initialValues.fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={!isEditing}
                                        className="rounded-xl border-slate-200 transition-colors focus-visible:ring-blue-600 focus-visible:border-blue-600 disabled:opacity-75 disabled:bg-slate-50"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-slate-600 font-bold">Email</Label>
                                    <Input
                                        id="email"
                                        value={initialValues.email}
                                        disabled
                                        readOnly
                                        className="rounded-xl border-slate-200 bg-slate-50 opacity-75"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-slate-600 font-bold">Location</Label>
                            <Input
                                id="location"
                                value={isEditing ? location : initialValues.location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your location"
                                className="rounded-xl border-slate-200 transition-colors focus-visible:ring-blue-600 focus-visible:border-blue-600 disabled:opacity-75 disabled:bg-slate-50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-slate-600 font-bold">Phone Number</Label>
                            <Input
                                id="phone"
                                value={isEditing ? phone : initialValues.phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your phone number"
                                className="rounded-xl border-slate-200 transition-colors focus-visible:ring-blue-600 focus-visible:border-blue-600 disabled:opacity-75 disabled:bg-slate-50"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {!isEditing ? (
                                <Button onClick={handleEdit} className="rounded-xl font-bold border-slate-200" variant="outline">
                                    Edit Details
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={handleSave} disabled={isSaving} className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </Button>
                                    <Button variant="ghost" onClick={handleCancel} disabled={isSaving} className="rounded-xl font-bold text-slate-500 hover:text-slate-900">
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>

                        {statusMessage && (
                            <div className={`p-3 rounded-xl border text-sm font-medium ${statusMessage.includes("success") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                                {statusMessage}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
