import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";

export const set = pgTable('SETS', {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    user: integer('user'),
    kategorie: varchar('kategorie'),
});

export const card = pgTable('CARD', {
    id: serial('id').primaryKey(),
    set: integer('set'),
    question: varchar('question'),
    answer: varchar('answer'),
    status: integer('status').notNull().default(5), //richtig -> steigt & falsch -> sinkt 
    difficulty: varchar('difficulty'), // schwer, mittel, leicht
    lastreview: varchar('lastreview').default('now()'), //wann zuletzt gesehen
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