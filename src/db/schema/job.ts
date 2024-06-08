import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { employers } from './employer';

export const jobs = sqliteTable('jobs', {
  id: integer('id').primaryKey(),
  employerId: integer('employer_id')
    .references(() => employers.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  salary: integer('salary').notNull().default(0),
  description: text('description'),
  location: text('location'),
  employmentType: text('employment_type'),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
});

export const jobsRelation = relations(jobs, ({ one }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
}));

export type InsertJob = typeof jobs.$inferInsert;
export type SelectJob = typeof jobs.$inferSelect;
