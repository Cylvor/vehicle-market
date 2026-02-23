import { pgTable, text, timestamp, uuid, pgEnum, integer, json, uniqueIndex } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "active", "rejected", "sold"]);
export const fuelEnum = pgEnum("fuel", ["Petrol", "Diesel", "Electric", "Hybrid", "LPG"]);
export const transmissionEnum = pgEnum("transmission", ["Automatic", "Manual", "CVT", "DCT"]);
export const bodyTypeEnum = pgEnum("body_type", ["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Convertible", "Van", "Wagon"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").unique(),
    name: text("name"),
    email: text("email").notNull().unique(),
    location: text("location"),
    phone: text("phone"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vehicles = pgTable("vehicles", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Clerk user ID
    status: statusEnum("status").default("pending").notNull(),

    // Seller Details
    sellerName: text("seller_name"),
    sellerLocation: text("seller_location"),

    // Vehicle Details
    year: integer("year").notNull(),
    make: text("make").notNull(),
    model: text("model").notNull(),
    variant: text("variant"),

    // Specs
    price: integer("price").notNull(),
    odometer: integer("odometer").notNull(),
    description: text("description"),
    fuel: fuelEnum("fuel").notNull(),
    transmission: transmissionEnum("transmission").notNull(),
    bodyType: bodyTypeEnum("body_type").notNull(),
    colour: text("colour"),

    // Media & Features
    features: json("features").$type<string[]>().default([]),
    tags: json("tags").$type<string[]>().default([]),
    images: json("images").$type<string[]>().default([]),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const enquiries = pgTable("enquiries", {
    id: uuid("id").primaryKey().defaultRandom(),
    vehicleId: uuid("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
    sellerUserId: text("seller_user_id").notNull(),
    buyerUserId: text("buyer_user_id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name"),
    email: text("email").notNull(),
    phone: text("phone"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedVehicles = pgTable(
    "saved_vehicles",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: text("user_id").notNull(),
        vehicleId: uuid("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        savedVehiclesUserVehicleUnique: uniqueIndex("saved_vehicles_user_vehicle_unique").on(table.userId, table.vehicleId),
    })
);

export const vehicleViews = pgTable("vehicle_views", {
    id: uuid("id").primaryKey().defaultRandom(),
    vehicleId: uuid("vehicle_id").notNull().references(() => vehicles.id, { onDelete: "cascade" }),
    viewerUserId: text("viewer_user_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
