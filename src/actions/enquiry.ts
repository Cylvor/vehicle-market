"use server"

import { db } from "@/db";
import { enquiries, users, vehicles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

const createEnquirySchema = z.object({
    vehicleId: z.uuid("Invalid vehicle id"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().optional(),
    email: z.email("Invalid email address"),
    phone: z.string().trim().optional(),
    message: z.string().trim().min(1, "Message is required"),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;

export async function createEnquiry(input: CreateEnquiryInput) {
    const parsed = createEnquirySchema.safeParse(input);

    if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || "Invalid enquiry input");
    }

    const { userId } = await auth();

    const [vehicle] = await db
        .select({
            id: vehicles.id,
            userId: vehicles.userId,
            status: vehicles.status,
        })
        .from(vehicles)
        .where(eq(vehicles.id, parsed.data.vehicleId))
        .limit(1);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "active") {
        throw new Error("You can only enquire on active listings");
    }

    await db.insert(enquiries).values({
        vehicleId: vehicle.id,
        sellerUserId: vehicle.userId,
        buyerUserId: userId ?? null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName || null,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
    });
}

export async function getReceivedEnquiries() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const data = await db
        .select({
            id: enquiries.id,
            vehicleId: enquiries.vehicleId,
            firstName: enquiries.firstName,
            lastName: enquiries.lastName,
            email: enquiries.email,
            phone: enquiries.phone,
            message: enquiries.message,
            createdAt: enquiries.createdAt,
            vehicleYear: vehicles.year,
            vehicleMake: vehicles.make,
            vehicleModel: vehicles.model,
            vehicleVariant: vehicles.variant,
        })
        .from(enquiries)
        .innerJoin(vehicles, eq(enquiries.vehicleId, vehicles.id))
        .where(eq(enquiries.sellerUserId, userId))
        .orderBy(desc(enquiries.createdAt));

    return data;
}

export async function getReceivedEnquiriesCount() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const [row] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(enquiries)
        .where(eq(enquiries.sellerUserId, userId));

    return row?.count ?? 0;
}

export async function getSentEnquiries() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const data = await db
        .select({
            id: enquiries.id,
            vehicleId: enquiries.vehicleId,
            sellerUserId: enquiries.sellerUserId,
            firstName: enquiries.firstName,
            lastName: enquiries.lastName,
            email: enquiries.email,
            phone: enquiries.phone,
            message: enquiries.message,
            createdAt: enquiries.createdAt,
            vehicleYear: vehicles.year,
            vehicleMake: vehicles.make,
            vehicleModel: vehicles.model,
            vehicleVariant: vehicles.variant,
            vehicleImages: vehicles.images,
            sellerName: users.name,
            sellerImageUrl: users.imageUrl,
        })
        .from(enquiries)
        .innerJoin(vehicles, eq(enquiries.vehicleId, vehicles.id))
        .leftJoin(users, eq(users.clerkUserId, enquiries.sellerUserId))
        .where(eq(enquiries.buyerUserId, userId))
        .orderBy(desc(enquiries.createdAt));

    return data;
}
