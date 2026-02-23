"use server";

import { db } from "@/db";
import { savedVehicles, vehicles } from "@/db/schema";
import type { SavedVehicle } from "@/lib/saved-vehicles";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const vehicleIdSchema = z.string().uuid();

function formatSavedVehiclePrice(price: number) {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: 0,
    }).format(price);
}

function formatSavedVehicleTitle(vehicle: typeof vehicles.$inferSelect) {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ""}`;
}

export async function isVehicleSavedInDb(vehicleId: string) {
    const { userId } = await auth();
    const validatedId = vehicleIdSchema.safeParse(vehicleId);

    if (!userId || !validatedId.success) {
        return false;
    }

    const [existing] = await db
        .select({ id: savedVehicles.id })
        .from(savedVehicles)
        .where(and(eq(savedVehicles.userId, userId), eq(savedVehicles.vehicleId, validatedId.data)))
        .limit(1);

    return Boolean(existing);
}

export async function toggleVehicleSavedInDb(vehicleId: string) {
    const { userId } = await auth();
    const validatedId = vehicleIdSchema.safeParse(vehicleId);

    if (!userId || !validatedId.success) {
        return null;
    }

    const [existing] = await db
        .select({ id: savedVehicles.id })
        .from(savedVehicles)
        .where(and(eq(savedVehicles.userId, userId), eq(savedVehicles.vehicleId, validatedId.data)))
        .limit(1);

    if (existing) {
        await db
            .delete(savedVehicles)
            .where(and(eq(savedVehicles.userId, userId), eq(savedVehicles.vehicleId, validatedId.data)));

        revalidatePath("/dashboard/buyer/saved");
        revalidatePath("/dashboard/buyer");

        return { isSaved: false };
    }

    await db.insert(savedVehicles).values({
        userId,
        vehicleId: validatedId.data,
    }).onConflictDoNothing({ target: [savedVehicles.userId, savedVehicles.vehicleId] });

    revalidatePath("/dashboard/buyer/saved");
    revalidatePath("/dashboard/buyer");

    return { isSaved: true };
}

export async function getSavedVehiclesForCurrentUser(): Promise<SavedVehicle[]> {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const rows = await db
        .select({
            savedAt: savedVehicles.createdAt,
            vehicle: vehicles,
        })
        .from(savedVehicles)
        .innerJoin(vehicles, eq(savedVehicles.vehicleId, vehicles.id))
        .where(eq(savedVehicles.userId, userId))
        .orderBy(desc(savedVehicles.createdAt));

    return rows.map(({ vehicle }) => {
        const images = Array.isArray(vehicle.images) ? vehicle.images : [];

        return {
            id: vehicle.id,
            title: formatSavedVehicleTitle(vehicle),
            price: formatSavedVehiclePrice(vehicle.price),
            image: images[0] || "/images/hero/car1.jpg",
            mileage: `${vehicle.odometer.toLocaleString()} km`,
            fuel: vehicle.fuel,
            year: String(vehicle.year),
            transmission: vehicle.transmission,
        };
    });
}
