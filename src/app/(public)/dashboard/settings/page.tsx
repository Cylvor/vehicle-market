"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAccountSettings, updateAccountSettings } from "@/actions/user";
import { Settings, Save, X, User } from "lucide-react";

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

    if (!isLoaded || isFetching) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="text-sm text-slate-500">Please sign in to manage account settings.</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 md:p-10 shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
                        <Settings className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Account Settings</h2>
                        <p className="text-slate-500 mt-1">Manage your profile details and preferences.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative shrink-0">
                            <Image
                                src={initialValues.imageUrl || user.imageUrl}
                                alt={`${initialValues.fullName || "User"} profile`}
                                width={120}
                                height={120}
                                className="h-32 w-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                            />
                            <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md border border-slate-100">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <h3 className="text-2xl font-bold text-slate-900">{initialValues.fullName || "User"}</h3>
                            <p className="text-slate-500 mt-1">{initialValues.email}</p>

                            {!isEditing && (
                                <Button
                                    onClick={handleEdit}
                                    variant="outline"
                                    className="mt-4 rounded-xl font-bold border-slate-200 hover:bg-slate-50"
                                >
                                    Edit Profile Information
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <div className="grid gap-6 max-w-2xl">
                        <div className="grid gap-2">
                            <Label htmlFor="fullName" className="text-slate-700 font-bold">Full Name</Label>
                            <Input
                                id="fullName"
                                value={isEditing ? fullName : initialValues.fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={!isEditing}
                                className="h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600 focus-visible:bg-white bg-slate-50/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-slate-700 font-bold">Email Address</Label>
                            <Input
                                id="email"
                                value={initialValues.email}
                                disabled
                                readOnly
                                className="h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500"
                            />
                            <p className="text-xs text-slate-400 mt-1">Email cannot be changed directly from here.</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-slate-700 font-bold">Location</Label>
                            <Input
                                id="location"
                                value={isEditing ? location : initialValues.location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={!isEditing}
                                placeholder={isEditing ? "e.g. Sydney, NSW" : "No location set"}
                                className="h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600 focus-visible:bg-white bg-slate-50/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-slate-700 font-bold">Phone Number</Label>
                            <Input
                                id="phone"
                                value={isEditing ? phone : initialValues.phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditing}
                                placeholder={isEditing ? "e.g. 0412 345 678" : "No phone set"}
                                className="h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600 focus-visible:bg-white bg-slate-50/50"
                            />
                        </div>

                        {statusMessage && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${statusMessage.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                                {statusMessage}
                            </div>
                        )}

                        {isEditing && (
                            <div className="flex gap-4 pt-4 mt-2 border-t border-slate-100">
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 gap-2 transition-all hover:-translate-y-0.5"
                                >
                                    <Save className="h-4 w-4" />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                    className="h-12 px-6 rounded-xl font-bold border-slate-200 hover:bg-slate-50 gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
