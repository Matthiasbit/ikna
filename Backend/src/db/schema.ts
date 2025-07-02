import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";

export const set = pgTable('SETS', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    user: integer('user'),
    kategorie: varchar('kategorie'),
});

export const card = pgTable('CARD', {
    id: serial('id').primaryKey(),
    set: integer('set'),
    question: varchar('question'),
    answer: varchar('answer'),
    status: integer('status').notNull().default(0),
    difficulty: varchar('difficulty'),
    lastreview: varchar('lastreview').default('now()'),
});

export const user = pgTable('USER', {
    id: serial('id').primaryKey(),
    email: varchar('email'),
    password: varchar('password').notNull(),
    leicht: integer('leicht').notNull(),
    mittel: integer('mittel').notNull(),
    schwer: integer('schwer').notNull(),
    lernmethode: varchar('lernmethode').notNull(),
});