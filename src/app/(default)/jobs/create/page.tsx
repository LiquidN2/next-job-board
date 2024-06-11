import type { Metadata } from 'next';

import Header from '@/components/ui/Header';
import JobForm from '@/components/job/JobForm';
import { submitJobForm } from '@/actions/job';

export const metadata: Metadata = {
  title: 'Next Job Board | Create Job',
};

export default function JobCreatePage() {
  const createJob = submitJobForm.bind(null, null);

  return (
    <>
      <Header>Create New Job</Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobForm submit={createJob} />
        </div>
      </main>
    </>
  );
}
