
import * as z from "zod";

export const vehicleSchema = z.object({
    sellerName: z.string().trim().min(1, "Name is required"),
    sellerLocation: z.string().trim().min(1, "Location is required"),
    year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    variant: z.string().optional(),
    price: z.coerce.number().min(0, "Price must be positive"),
    odometer: z.coerce.number().min(0, "Odometer must be positive"),
    description: z.string().optional(),
    fuel: z.enum(["Petrol", "Diesel", "Electric", "Hybrid", "LPG"]),
    transmission: z.enum(["Automatic", "Manual", "CVT", "DCT"]),
    bodyType: z.enum(["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Convertible", "Van", "Wagon"]),
    colour: z.string().optional(),
    features: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string()).min(1, "At least one image is required"),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
