import { pgTable, uuid, timestamp, real } from "drizzle-orm/pg-core";
import { buses } from "./buses";
import { drivers } from "./drivers";

export const busLocations = pgTable("bus_locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  busId: uuid("bus_id")
    .references(() => buses.id)
    .notNull(),
  driverId: uuid("driver_id")
    .references(() => drivers.id)
    .notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
