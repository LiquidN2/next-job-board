import type { Metadata } from 'next';

import Header from '@/components/ui/Header';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import JobCard from '@/components/job/JobCard';
import { findJobs } from '@/db/queries/job';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Next VPS | Jobs Listings',
};

export default async function JobsIndex() {
  const jobs = await findJobs();

  return (
    <>
      <Header>
        <Heading>Jobs</Heading>
        <Button asLink={true} theme="primary" href="/jobs/create">
          New Job
        </Button>
      </Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <div className="flex flex-col">
            {jobs.map(job => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
