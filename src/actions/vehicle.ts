"use server"

import { db } from "@/db";
import { savedVehicles, vehicleViews, vehicles } from "@/db/schema";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, asc, desc, eq, gte, ilike, inArray, lte, or, SQL, sql } from "drizzle-orm";

type VehicleFilters = {
    make?: string;
    model?: string;
    bodyType?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    sort?: string;
    q?: string;
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
    revalidatePath("/dashboard/seller/listings");
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

    // General search query - searches across make, model, and variant
    if (filters?.q && filters.q.trim()) {
        const searchTerm = `%${filters.q.trim()}%`;
        const searchConditions = [
            ilike(vehicles.make, searchTerm),
            ilike(vehicles.model, searchTerm),
        ];
        // Add variant search if variant column exists (handle nullable)
        searchConditions.push(
            sql`COALESCE(${vehicles.variant}, '') ILIKE ${searchTerm}`
        );
        conditions.push(or(...searchConditions)!);
    }

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

    const minYear = Number(filters?.minYear);
    if (Number.isFinite(minYear) && minYear > 0) {
        conditions.push(gte(vehicles.year, minYear));
    }

    const maxYear = Number(filters?.maxYear);
    if (Number.isFinite(maxYear) && maxYear > 0) {
        conditions.push(lte(vehicles.year, maxYear));
    }

    const sort = filters?.sort || "newest";
    const orderBy =
        sort === "price-asc"
            ? asc(vehicles.price)
            : sort === "price-desc"
                ? desc(vehicles.price)
                : sort === "oldest"
                    ? asc(vehicles.createdAt)
                    : desc(vehicles.createdAt);

    const data = await db
        .select()
        .from(vehicles)
        .where(and(...conditions))
        .orderBy(orderBy);

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

export async function trackVehicleView(vehicleId: string) {
    const { userId } = await auth();

    await db.insert(vehicleViews).values({
        vehicleId,
        viewerUserId: userId ?? null,
    });
}

type SellerVehiclePerformance = {
    id: string;
    title: string;
    status: "pending" | "active" | "rejected" | "sold";
    image: string;
    price: number;
    sellerLocation: string | null;
    createdAt: Date;
    totalViews: number;
    viewRate: number;
    totalSaved: number;
    savedRate: number;
};

export async function getSellerVehiclePerformance(): Promise<SellerVehiclePerformance[]> {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const listings = await db
        .select({
            id: vehicles.id,
            year: vehicles.year,
            make: vehicles.make,
            model: vehicles.model,
            variant: vehicles.variant,
            price: vehicles.price,
            sellerLocation: vehicles.sellerLocation,
            status: vehicles.status,
            images: vehicles.images,
            createdAt: vehicles.createdAt,
        })
        .from(vehicles)
        .where(eq(vehicles.userId, userId))
        .orderBy(desc(vehicles.createdAt));

    if (listings.length === 0) {
        return [];
    }

    const listingIds = listings.map((listing) => listing.id);
    const aggregatedViews = await db
        .select({
            vehicleId: vehicleViews.vehicleId,
            totalViews: sql<number>`COUNT(*)`.mapWith(Number),
        })
        .from(vehicleViews)
        .where(inArray(vehicleViews.vehicleId, listingIds))
        .groupBy(vehicleViews.vehicleId);

    const aggregatedSaved = await db
        .select({
            vehicleId: savedVehicles.vehicleId,
            totalSaved: sql<number>`COUNT(*)`.mapWith(Number),
        })
        .from(savedVehicles)
        .where(inArray(savedVehicles.vehicleId, listingIds))
        .groupBy(savedVehicles.vehicleId);

    const viewsByVehicle = new Map(
        aggregatedViews.map((row) => [row.vehicleId, row.totalViews])
    );

    const savedByVehicle = new Map(
        aggregatedSaved.map((row) => [row.vehicleId, row.totalSaved])
    );

    const totalViewsAcrossListings = listings.reduce(
        (accumulator, listing) => accumulator + (viewsByVehicle.get(listing.id) ?? 0),
        0
    );

    const totalSavedAcrossListings = listings.reduce(
        (accumulator, listing) => accumulator + (savedByVehicle.get(listing.id) ?? 0),
        0
    );

    return listings.map((listing) => {
        const title = `${listing.year} ${listing.make} ${listing.model}${listing.variant ? ` ${listing.variant}` : ""}`;
        const totalViews = viewsByVehicle.get(listing.id) ?? 0;
        const totalSaved = savedByVehicle.get(listing.id) ?? 0;
        const viewRate = totalViewsAcrossListings > 0
            ? Number(((totalViews / totalViewsAcrossListings) * 100).toFixed(1))
            : 0;
        const savedRate = totalSavedAcrossListings > 0
            ? Number(((totalSaved / totalSavedAcrossListings) * 100).toFixed(1))
            : 0;

        return {
            id: listing.id,
            title,
            status: listing.status,
            image: listing.images?.[0] || "/placeholder-car.png",
            price: listing.price,
            sellerLocation: listing.sellerLocation,
            createdAt: listing.createdAt,
            totalViews,
            viewRate,
            totalSaved,
            savedRate,
        };
    });
}

type SellerPerformanceCharts = {
    byDate: Array<{
        date: string;
        label: string;
        views: number;
        saved: number;
    }>;
};

export async function getSellerPerformanceCharts(): Promise<SellerPerformanceCharts> {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const listings = await db
        .select({ id: vehicles.id })
        .from(vehicles)
        .where(eq(vehicles.userId, userId));

    if (listings.length === 0) {
        return { byDate: [] };
    }

    const listingIds = listings.map((listing) => listing.id);

    const viewRows = await db
        .select({
            date: sql<string>`DATE(${vehicleViews.createdAt})::text`,
            count: sql<number>`COUNT(*)`.mapWith(Number),
        })
        .from(vehicleViews)
        .where(inArray(vehicleViews.vehicleId, listingIds))
        .groupBy(sql`DATE(${vehicleViews.createdAt})`);

    const savedRows = await db
        .select({
            date: sql<string>`DATE(${savedVehicles.createdAt})::text`,
            count: sql<number>`COUNT(*)`.mapWith(Number),
        })
        .from(savedVehicles)
        .where(inArray(savedVehicles.vehicleId, listingIds))
        .groupBy(sql`DATE(${savedVehicles.createdAt})`);

    const viewsByDate = new Map(viewRows.map((row) => [row.date, row.count]));
    const savedByDate = new Map(savedRows.map((row) => [row.date, row.count]));

    const byDate: SellerPerformanceCharts["byDate"] = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - offset);

        const dateKey = date.toISOString().slice(0, 10);
        const label = date.toLocaleDateString("en-AU", { weekday: "short" });

        byDate.push({
            date: dateKey,
            label,
            views: viewsByDate.get(dateKey) ?? 0,
            saved: savedByDate.get(dateKey) ?? 0,
        });
    }

    return { byDate };
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

export async function getAdminVehicleById(id: string) {
    const { userId } = await auth();
    // In a real app, verify admin role here
    if (!userId) throw new Error("Unauthorized");

    const [vehicle] = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.id, id))
        .limit(1);

    return vehicle ?? null;
}

export async function updateVehicleStatus(id: string, status: "active" | "rejected") {
    const { userId } = await auth();
    // In a real app, verify admin role here
    if (!userId) throw new Error("Unauthorized");

    await db.update(vehicles).set({ status }).where(eq(vehicles.id, id));
    revalidatePath("/admin/listings");
    revalidatePath("/search");
}

export async function updateUserVehicleStatus(id: string, status: "active" | "sold") {
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

    await db
        .update(vehicles)
        .set({ status, updatedAt: new Date() })
        .where(eq(vehicles.id, id));

    revalidatePath("/dashboard/seller/listings");
    revalidatePath("/search");
    revalidatePath(`/vehicles/${id}`);
    revalidatePath("/");
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

    revalidatePath("/dashboard/seller/listings");
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

    revalidatePath("/dashboard/seller/listings");
    revalidatePath("/search");
}

export async function deleteVehicleAsAdmin(id: string) {
    const { userId } = await auth();
    // In a real app, verify admin role here
    if (!userId) {
        throw new Error("Unauthorized");
    }

    await db.delete(vehicles).where(eq(vehicles.id, id));

    revalidatePath("/admin/listings");
    revalidatePath(`/admin/listings/${id}`);
    revalidatePath("/dashboard/seller/listings");
    revalidatePath("/search");
}
