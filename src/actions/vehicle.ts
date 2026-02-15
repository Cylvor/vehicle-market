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
}

export async function getVehicles() {
    // Public fetch - only active vehicles
    const data = await db.select().from(vehicles).where(eq(vehicles.status, "active")).orderBy(desc(vehicles.createdAt));
    return data;
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
