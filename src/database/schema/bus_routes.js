import { pgTable, uuid, text, json } from "drizzle-orm/pg-core";

export const routes = pgTable("routes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  stops: json("stops"), // You can store an array of stop names or objects
});
