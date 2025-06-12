CREATE TABLE "bus_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bus_id" uuid NOT NULL,
	"driver_id" uuid NOT NULL,
	"lat" real NOT NULL,
	"lng" real NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"stops" json
);
--> statement-breakpoint
CREATE TABLE "buses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bus_number" text NOT NULL,
	"route_name" text,
	"capacity" integer,
	"status" text DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"assigned_bus_id" uuid,
	"last_lat" real,
	"last_lng" real,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bus_locations" ADD CONSTRAINT "bus_locations_bus_id_buses_id_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."buses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bus_locations" ADD CONSTRAINT "bus_locations_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assigned_bus_id_buses_id_fk" FOREIGN KEY ("assigned_bus_id") REFERENCES "public"."buses"("id") ON DELETE no action ON UPDATE no action;