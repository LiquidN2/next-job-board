import { desc, eq } from 'drizzle-orm';

import { db } from '../db';
import { type InsertJob, type SelectJob, jobs } from '../schema';

// CREATE
export async function createJob(data: InsertJob) {
  await db.insert(jobs).values(data);
}

// UPDATE
export async function updateJob(id: SelectJob['id'], data: InsertJob) {
  await db.update(jobs).set(data).where(eq(jobs.id, id));
}

// DELETE
export async function deleteJob(id: SelectJob['id']) {
  await db.delete(jobs).where(eq(jobs.id, id));
}

// FIND
export async function findJobs() {
  return db.query.jobs.findMany({
    with: { employer: true },
    orderBy: [desc(jobs.id)],
  });
}

export async function findJobById(id: SelectJob['id']) {
  return db.query.jobs.findFirst({
    where: eq(jobs.id, id),
    with: { employer: true },
  });
}
