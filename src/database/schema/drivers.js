import { pgTable, uuid, text, timestamp, real } from "drizzle-orm/pg-core";
import { buses } from "./buses";

export const drivers = pgTable("drivers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  assignedBusId: uuid("assigned_bus_id").references(() => buses.id),
  lastLat: real("last_lat"),
  lastLng: real("last_lng"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
