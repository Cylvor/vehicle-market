import { pgTable, text, timestamp, uuid, pgEnum, integer, json, boolean } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "active", "rejected", "sold"]);
export const fuelEnum = pgEnum("fuel", ["Petrol", "Diesel", "Electric", "Hybrid", "LPG"]);
export const transmissionEnum = pgEnum("transmission", ["Automatic", "Manual", "CVT", "DCT"]);
export const bodyTypeEnum = pgEnum("body_type", ["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Convertible", "Van", "Wagon"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vehicles = pgTable("vehicles", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Clerk user ID
    status: statusEnum("status").default("pending").notNull(),

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
    images: json("images").$type<string[]>().default([]),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
