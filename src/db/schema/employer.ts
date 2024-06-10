import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { jobs } from './job';

export const employers = sqliteTable('employers', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
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

export const employersRelation = relations(employers, ({ many }) => ({
  jobs: many(jobs),
}));

export type InsertEmployer = typeof employers.$inferInsert;
export type SelectEmployer = typeof employers.$inferSelect;
