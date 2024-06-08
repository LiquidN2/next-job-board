import { type InsertJob } from '@/db/schema';

export async function processJobFormData(formData: FormData) {
  'use server';

  const rawData: InsertJob = {
    title: formData.get('title')?.toString() || '',
    salary: parseInt(formData.get('salary')?.toString() || '0'),
    description: formData.get('description')?.toString() || '',
    employerId: 1,
  };

  return rawData;
}
