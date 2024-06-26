import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { employers } from './employer';

export const jobs = sqliteTable('jobs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  employerId: integer('employer_id')
    .references(() => employers.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  salary: integer('salary', { mode: 'number' }).notNull().default(0),
  description: text('description'),
  location: text('location'),
  employmentType: text('employment_type'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updated_at')
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  // createdAt: integer('created_at', { mode: 'timestamp' })
  //   .default(sql`(unixepoch())`)
  //   .notNull(),
  // updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
  //   () => new Date()
  // ),
});

export const jobsRelation = relations(jobs, ({ one }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
}));

export type InsertJob = typeof jobs.$inferInsert;
export type SelectJob = typeof jobs.$inferSelect;

// Validate insert request
export const insertJobSchema = createInsertSchema(jobs, {
  title: schema =>
    schema.title.min(3, { message: 'Minimum length is 3 letters' }),
  salary: schema =>
    schema.salary.gt(0, { message: 'Salary must be greater than 0' }),
});

// Validate response
export const selectJobSchema = createSelectSchema(jobs);
