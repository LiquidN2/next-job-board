import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import Header from '@/components/ui/Header';
import JobForm from '@/components/job/JobForm';

import { findJobById, updateJob, processJobFormData } from '@/actions/job';

export const metadata: Metadata = {
  title: 'Next Job Board | Edit Job',
};

export default async function JobEditPage({
  params: { id },
}: {
  params: { id: number };
}) {
  async function submit(formData: FormData) {
    'use server';

    // process data
    const data = await processJobFormData(formData);

    // update job
    await updateJob(id, data);

    // fetch new data for '/jobs' page
    revalidatePath('/jobs');

    // redirect
    redirect('/jobs');
  }

  const job = await findJobById(+id);
  if (!job) return notFound();

  return (
    <>
      <Header>Edit Job</Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobForm action={submit} job={job} />
        </div>
      </main>
    </>
  );
}
