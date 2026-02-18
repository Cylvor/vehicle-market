"use server"

import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, desc, eq, gte, ilike, lte, SQL } from "drizzle-orm";

type VehicleFilters = {
    make?: string;
    model?: string;
    bodyType?: string;
    minPrice?: string;
    maxPrice?: string;
};

export async function createVehicle(input: z.infer<typeof vehicleSchema>) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedFields = vehicleSchema.safeParse(input);

    if (!validatedFields.success) {
        throw new Error("Invalid fields");
    }

    await db.insert(vehicles).values({
        userId,
        ...validatedFields.data,
        status: 'pending',
    });

    revalidatePath("/admin/listings");
    revalidatePath("/dashboard/listings");
}

export async function getUserVehicles() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const data = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.userId, userId))
        .orderBy(desc(vehicles.createdAt));

    return data;
}

export async function getVehicles(filters?: VehicleFilters) {
    const conditions: SQL[] = [eq(vehicles.status, "active")];

    if (filters?.make) {
        conditions.push(ilike(vehicles.make, filters.make));
    }

    if (filters?.model) {
        conditions.push(ilike(vehicles.model, filters.model));
    }

    if (filters?.bodyType) {
        conditions.push(eq(vehicles.bodyType, filters.bodyType as typeof vehicles.bodyType.enumValues[number]));
    }

    const minPrice = Number(filters?.minPrice);
    if (Number.isFinite(minPrice) && minPrice > 0) {
        conditions.push(gte(vehicles.price, minPrice));
    }

    const maxPrice = Number(filters?.maxPrice);
    if (Number.isFinite(maxPrice) && maxPrice > 0) {
        conditions.push(lte(vehicles.price, maxPrice));
    }

    const data = await db
        .select()
        .from(vehicles)
        .where(and(...conditions))
        .orderBy(desc(vehicles.createdAt));

    return data;
}

export async function getVehicleById(id: string) {
    const { userId } = await auth();

    const [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.id, id))
        .limit(1);

    if (!vehicle) {
        return null;
    }

    const canView = vehicle.status === "active" || (userId && vehicle.userId === userId);
    return canView ? vehicle : null;
}

export async function getUserVehicleById(id: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.id, id))
        .limit(1);

    if (!vehicle || vehicle.userId !== userId) {
        return null;
    }

    return vehicle;
}

export async function getAdminVehicles() {
    const { userId } = await auth();
    // In a real app, verify admin role here
    if (!userId) throw new Error("Unauthorized");

    const data = await db.select().from(vehicles).orderBy(desc(vehicles.createdAt));
    return data;
}

export async function updateVehicleStatus(id: string, status: "active" | "rejected") {
    const { userId } = await auth();
    // In a real app, verify admin role here
    if (!userId) throw new Error("Unauthorized");

    await db.update(vehicles).set({ status }).where(eq(vehicles.id, id));
    revalidatePath("/admin/listings");
    revalidatePath("/search");
}

export async function updateVehicle(id: string, input: z.infer<typeof vehicleSchema>) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedFields = vehicleSchema.safeParse(input);

    if (!validatedFields.success) {
        throw new Error("Invalid fields");
    }

    const [existing] = await db
        .select({ userId: vehicles.userId })
        .from(vehicles)
        .where(eq(vehicles.id, id))
        .limit(1);

    if (!existing || existing.userId !== userId) {
        throw new Error("Unauthorized");
    }

    await db
        .update(vehicles)
        .set({
            ...validatedFields.data,
            updatedAt: new Date(),
        })
        .where(eq(vehicles.id, id));

    revalidatePath("/dashboard/listings");
    revalidatePath(`/vehicles/${id}`);
    revalidatePath("/search");
}

export async function deleteVehicle(id: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const [existing] = await db
        .select({ userId: vehicles.userId })
        .from(vehicles)
        .where(eq(vehicles.id, id))
        .limit(1);

    if (!existing || existing.userId !== userId) {
        throw new Error("Unauthorized");
    }

    await db.delete(vehicles).where(eq(vehicles.id, id));

    revalidatePath("/dashboard/listings");
    revalidatePath("/search");
}
