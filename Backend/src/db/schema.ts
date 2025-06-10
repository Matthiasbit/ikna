import { pgTable, integer, varchar } from "drizzle-orm/pg-core"

export const set = pgTable('set', {
    id: integer('id').primaryKey(),
    name: varchar('name').notNull(),
    schwierigkeit: integer('schwierigkeit'),
});