import type { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import Header from '@/components/ui/Header';
import JobForm from '@/components/job/JobForm';
import { createJob, processJobFormData } from '@/actions/job';

export const metadata: Metadata = {
  title: 'Next Job Board | Create Job',
};

export default function JobCreatePage() {
  async function submit(formData: FormData) {
    'use server';

    // process data
    const data = await processJobFormData(formData);

    // create job
    await createJob(data);

    // fetch new data for '/jobs' page
    revalidatePath('/jobs');

    // redirect
    redirect('/jobs');
  }

  return (
    <>
      <Header>Create New Job</Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobForm action={submit} />
        </div>
      </main>
    </>
  );
}
