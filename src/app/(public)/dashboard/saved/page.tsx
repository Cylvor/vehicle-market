"use client";

import { useState } from "react";
import { VehicleCard } from "@/components/modules/vehicles/vehicle-card";
import { getSavedVehicles, SavedVehicle } from "@/lib/saved-vehicles";

export default function SavedVehiclesPage() {
    const [savedVehicles, setSavedVehicles] = useState<SavedVehicle[]>(() => getSavedVehicles());

    const handleSaveChange = (vehicleId: string, isSaved: boolean) => {
        if (isSaved) {
            return;
        }

        setSavedVehicles((currentSavedVehicles) =>
            currentSavedVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Saved Vehicles</h2>
                <p className="text-muted-foreground">Cars you have favourited or saved for later.</p>
            </div>

            {savedVehicles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    You haven&apos;t saved any vehicles yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedVehicles.map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            {...vehicle}
                            onSaveChange={(isSaved) => handleSaveChange(vehicle.id, isSaved)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
