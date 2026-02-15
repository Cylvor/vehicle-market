CREATE TYPE "public"."body_type" AS ENUM('Sedan', 'Hatchback', 'SUV', 'Ute', 'Coupe', 'Convertible', 'Van', 'Wagon');--> statement-breakpoint
CREATE TYPE "public"."fuel" AS ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'active', 'rejected', 'sold');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('Automatic', 'Manual', 'CVT', 'DCT');--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"year" integer NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"variant" text,
	"price" integer NOT NULL,
	"odometer" integer NOT NULL,
	"description" text,
	"fuel" "fuel" NOT NULL,
	"transmission" "transmission" NOT NULL,
	"body_type" "body_type" NOT NULL,
	"colour" text,
	"features" json DEFAULT '[]'::json,
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
