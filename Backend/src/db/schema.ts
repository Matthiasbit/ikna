import { pgTable, integer, varchar, serial} from "drizzle-orm/pg-core"

export const set = pgTable('set', {
    id: integer('id').primaryKey(),
    name: varchar('name').notNull(),
    schwierigkeit: integer('schwierigkeit'),
});

export const userData = pgTable("userdata", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});