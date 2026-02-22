ALTER TABLE "users" ADD COLUMN "clerk_user_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";