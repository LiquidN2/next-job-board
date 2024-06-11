import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { SelectJob, InsertJob } from '@/db/schema';
import { createJob, updateJob } from '@/db/queries/job';

export { createJob, updateJob, findJobs, findJobById } from '@/db/queries/job';

const JobSchema = z.object({
  title: z.string().min(3, { message: "Minimum title's length is 3" }),
  salary: z.number().gt(0, { message: 'Salary must be greater than 0' }),
  description: z.string(),
  employerId: z.number().gt(0, { message: 'Invalid employerId' }),
});

export async function validateJobData(formData: FormData) {
  'use server';

  const rawData: InsertJob = {
    title: formData.get('title')?.toString() || '',
    salary: parseInt(formData.get('salary')?.toString() || '0'),
    description: formData.get('description')?.toString() || '',
    employerId: 1,
  };

  const validated = JobSchema.safeParse(rawData);

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
    revalidatePath(`/jobs/${id}`);
  } else {
    await createJob(data);
  }

  // revalidate and redirect
  revalidatePath('/jobs');
  redirect('/jobs');
}
