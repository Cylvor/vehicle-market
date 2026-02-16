"use server"

import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";

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

export async function getVehicles() {
    // Public fetch - only active vehicles
    const data = await db.select().from(vehicles).where(eq(vehicles.status, "active")).orderBy(desc(vehicles.createdAt));
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
