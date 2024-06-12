import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updated_at')
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  // updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
  //   () => new Date()
  // ),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// Insert request validation
export const insertUserSchema = createInsertSchema(users, {
  email: schema => schema.email.trim().toLowerCase().email(),
  password: schema => schema.password.trim().min(8),
});
