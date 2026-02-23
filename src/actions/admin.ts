"use server";

import { db } from "@/db";
import { enquiries, users, vehicles } from "@/db/schema";
import { and, desc, eq, gte, lt, sql } from "drizzle-orm";

function getStartOfWeek(date: Date) {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getMonthStart(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getPreviousMonthStart(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function getPreviousMonthEnd(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export async function getAdminDashboardData() {
    const now = new Date();
    const weekStart = getStartOfWeek(now);
    const monthStart = getMonthStart(now);
    const previousMonthStart = getPreviousMonthStart(now);
    const previousMonthEnd = getPreviousMonthEnd(now);

    const [totalUsersRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(users);

    const [newUsersThisWeekRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(users)
        .where(gte(users.createdAt, weekStart));

    const [activeListingsRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(vehicles)
        .where(eq(vehicles.status, "active"));

    const [newListingsThisWeekRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(vehicles)
        .where(gte(vehicles.createdAt, weekStart));

    const [pendingApprovalsRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(vehicles)
        .where(eq(vehicles.status, "pending"));

    const [enquiriesMtdRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(enquiries)
        .where(gte(enquiries.createdAt, monthStart));

    const [enquiriesPreviousMonthRow] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(enquiries)
        .where(and(gte(enquiries.createdAt, previousMonthStart), lt(enquiries.createdAt, previousMonthEnd)));

    const previousMonthCount = enquiriesPreviousMonthRow?.count ?? 0;
    const enquiriesMtd = enquiriesMtdRow?.count ?? 0;
    const enquiriesDeltaPct = previousMonthCount > 0
        ? Math.round(((enquiriesMtd - previousMonthCount) / previousMonthCount) * 100)
        : enquiriesMtd > 0
            ? 100
            : 0;

    const recentListings = await db
        .select({
            id: vehicles.id,
            year: vehicles.year,
            make: vehicles.make,
            model: vehicles.model,
            price: vehicles.price,
            createdAt: vehicles.createdAt,
            images: vehicles.images,
            sellerDisplayName: users.name,
            sellerFallbackName: vehicles.sellerName,
        })
        .from(vehicles)
        .leftJoin(users, eq(vehicles.userId, users.clerkUserId))
        .orderBy(desc(vehicles.createdAt))
        .limit(5);

    return {
        totalUsers: totalUsersRow?.count ?? 0,
        newUsersThisWeek: newUsersThisWeekRow?.count ?? 0,
        activeListings: activeListingsRow?.count ?? 0,
        newListingsThisWeek: newListingsThisWeekRow?.count ?? 0,
        pendingApprovals: pendingApprovalsRow?.count ?? 0,
        enquiriesMtd,
        enquiriesDeltaPct,
        recentListings,
    };
}
