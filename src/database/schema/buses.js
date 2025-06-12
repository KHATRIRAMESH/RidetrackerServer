import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";

export const buses = pgTable("buses", {
  id: uuid("id").defaultRandom().primaryKey(),
  busNumber: text("bus_number").notNull(),
  routeName: text("route_name"),
  capacity: integer("capacity"),
  status: text("status").default("active"), // 'active' | 'inactive'
});
