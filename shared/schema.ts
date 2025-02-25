import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  hasClicked: integer("has_clicked").notNull().default(0),
});

export const clicks = pgTable("clicks", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").notNull(),
  linkId: text("link_id").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertVisitSchema = createInsertSchema(visits);
export const insertClickSchema = createInsertSchema(clicks);

export type Visit = typeof visits.$inferSelect;
export type Click = typeof clicks.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type InsertClick = z.infer<typeof insertClickSchema>;

export const links = [
  { id: "olx", url: "https://www.olx.ua/uk/" },
  { id: "google", url: "https://www.google.com/webhp?hl=uk&sa=X&ved=0ahUKEwif-qGt4N6LAxVtLhAIHTrwEGwQPAgI" },
  { id: "facebook", url: "https://www.facebook.com/?locale=uk_UA" },
  { id: "amazon", url: "https://www.amazon.com" },
  { id: "ebay", url: "https://www.ebay.com" }
] as const;
