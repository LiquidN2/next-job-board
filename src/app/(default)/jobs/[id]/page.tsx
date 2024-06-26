import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/ui/Header';
import Heading from '@/components/ui/Heading';
import JobShow from '@/components/job/JobShow';

import { findJobById } from '@/db/queries/job';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Next Job Board | Jobs Details',
};

export default async function JobShowPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const job = await findJobById(+id);
  if (!job) return notFound();

  return (
    <>
      <Header>
        <Heading>Job Details</Heading>
      </Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobShow {...job} />
        </div>
      </main>
    </>
  );
}
