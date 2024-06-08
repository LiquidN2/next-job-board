import { eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { type InsertEmployer, type SelectEmployer, employers } from '../schema';

// CREATE
export async function createEmployer(data: InsertEmployer) {
  await db.insert(employers).values(data);
}

// UPDATE
export async function updateEmployer(
  id: SelectEmployer['id'],
  data: InsertEmployer
) {
  return db.update(employers).set(data).where(eq(employers.id, id));
}

// FIND
export async function getAllEmployers() {
  return db.query.employers.findMany();
}

export async function getEmployerById(id: SelectEmployer['id']) {
  return db.query.employers.findFirst({
    where: eq(employers.id, id),
  });
}

export async function getRndEmployerId() {
  const employer = await db.query.employers.findFirst({
    columns: { id: true },
    orderBy: sql`RANDOM()`,
  });

  if (!employer) return null;

  return employer.id;
}
