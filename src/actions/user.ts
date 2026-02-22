"use server"

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const accountSettingsSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().email(),
    location: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    imageUrl: z.string().trim().optional(),
});

export type AccountSettingsInput = z.infer<typeof accountSettingsSchema>;

async function getClerkDefaults(userId: string) {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    return {
        fullName:
            clerkUser.fullName?.trim() ||
            [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
            "",
        email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: clerkUser.imageUrl ?? "",
    };
}

export async function getAccountSettings() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const defaults = await getClerkDefaults(userId);

    const [existing] = await db
        .select({
            name: users.name,
            email: users.email,
            location: users.location,
            phone: users.phone,
            imageUrl: users.imageUrl,
        })
        .from(users)
        .where(eq(users.clerkUserId, userId))
        .limit(1);

    return {
        fullName: existing?.name ?? defaults.fullName,
        email: existing?.email ?? defaults.email,
        location: existing?.location ?? "",
        phone: existing?.phone ?? "",
        imageUrl: existing?.imageUrl ?? defaults.imageUrl,
    } satisfies AccountSettingsInput;
}

export async function updateAccountSettings(input: AccountSettingsInput) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validated = accountSettingsSchema.parse(input);

    await db
        .insert(users)
        .values({
            clerkUserId: userId,
            name: validated.fullName,
            email: validated.email,
            location: validated.location || null,
            phone: validated.phone || null,
            imageUrl: validated.imageUrl || null,
            updatedAt: new Date(),
        })
        .onConflictDoUpdate({
            target: users.clerkUserId,
            set: {
                name: validated.fullName,
                email: validated.email,
                location: validated.location || null,
                phone: validated.phone || null,
                imageUrl: validated.imageUrl || null,
                updatedAt: new Date(),
            },
        });

    return {
        fullName: validated.fullName,
        email: validated.email,
        location: validated.location ?? "",
        phone: validated.phone ?? "",
        imageUrl: validated.imageUrl ?? "",
    } satisfies AccountSettingsInput;
}

export async function getAdminUsers() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const data = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            location: users.location,
            phone: users.phone,
            imageUrl: users.imageUrl,
            createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt));

    return data;
}
