import type { Metadata } from 'next';

import Header from '@/components/Header';
import JobCard from '@/components/JobCard';
import { findJobs } from '@/db/queries/job';

export const metadata: Metadata = {
  title: 'Next VPS | Jobs Listings',
};

export default async function JobsIndex() {
  const jobs = await findJobs();

  return (
    <>
      <Header>Jobs</Header>
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
