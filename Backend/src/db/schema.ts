import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const set = pgTable('SET', {
    id: integer('id').primaryKey(),
    name: varchar('name'),
    user: integer('user'),
    kategorie: varchar('kategorie'),
});

export const card = pgTable('CARD', {
    id: integer('id').primaryKey(),
    set: integer('set'),
    question: varchar('question'),
    answer: varchar('answer'),
    status: integer('status').notNull(),
    difficulty: varchar('difficulty'),
});

export const user = pgTable('USER', {
    id: integer('id').primaryKey(),
    email: varchar('email'),
    password: varchar('password'),
    leicht: integer('leicht').notNull(),
    mittel: integer('mittel').notNull(),
    schwer: integer('schwer').notNull(),
    lernmethode: varchar('lernmethode').notNull(),
});