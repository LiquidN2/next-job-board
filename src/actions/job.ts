'use server';

import { desc, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db/db';
import {
  type InsertJob,
  type SelectJob,
  insertJobSchema,
  jobs,
} from '@/db/schema';

// -------------------------------------------------------------------
// DB QUERIES
// -------------------------------------------------------------------
// Create
export async function createJob(data: InsertJob) {
  await db.insert(jobs).values(data);
}

// Update
export async function updateJob(id: SelectJob['id'], data: InsertJob) {
  await db.update(jobs).set(data).where(eq(jobs.id, id));
}

// Delete
export async function deleteJob(id: SelectJob['id']) {
  await db.delete(jobs).where(eq(jobs.id, id));
}

// Find Many
export async function findJobs() {
  return db.query.jobs.findMany({
    with: { employer: true },
    orderBy: [desc(jobs.id)],
  });
}

// Find By ID
export async function findJobById(id: SelectJob['id']) {
  return db.query.jobs.findFirst({
    where: eq(jobs.id, id),
    with: { employer: true },
  });
}

// -------------------------------------------------------------------
// APP ACTIONS
// -------------------------------------------------------------------
export async function validateJobData(formData: FormData) {
  'use server';

  const rawData: InsertJob = {
    title: formData.get('title')?.toString() || '',
    salary: parseInt(formData.get('salary')?.toString() || '0'),
    description: formData.get('description')?.toString() || '',
    employerId: 1,
  };

  // const validated = JobSchema.safeParse(rawData);
  const validated = insertJobSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      data: null,
      error: validated.error.flatten().fieldErrors,
    };
  }

  return {
    data: validated.data,
    error: null,
  };
}

export async function submitJobForm(
  id: InsertJob['id'] | null,
  _prevState: any,
  formData: FormData
) {
  'use server';

  // validata form data
  const { data, error } = await validateJobData(formData);
  if (error) return { data, error };

  // create or update job
  if (id) {
    await updateJob(id, data);
  } else {
    await createJob(data);
  }

  // revalidate and redirect
  redirect('/jobs');
}
