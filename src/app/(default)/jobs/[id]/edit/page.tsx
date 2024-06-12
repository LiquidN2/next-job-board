import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/ui/Header';
import Heading from '@/components/ui/Heading';
import JobForm from '@/components/job/JobForm';

import { findJobById, submitJobForm } from '@/actions/job';

export const metadata: Metadata = {
  title: 'Next Job Board | Edit Job',
};

export default async function JobEditPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const updateJob = submitJobForm.bind(null, id);

  const job = await findJobById(+id);
  if (!job) return notFound();

  return (
    <>
      <Header>
        <Heading>Edit Job</Heading>
      </Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobForm submit={updateJob} job={job} />
        </div>
      </main>
    </>
  );
}
