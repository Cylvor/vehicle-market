ALTER TABLE "vehicles" ADD COLUMN "seller_name" text;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "seller_location" text;--> statement-breakpoint
ALTER TABLE "vehicles" ADD COLUMN "tags" json DEFAULT '[]'::json;