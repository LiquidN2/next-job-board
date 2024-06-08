import { createJob, findJobs } from '@/db/queries/job';
import { type InsertJob } from '@/db/schema';

/**
 * Get all jobs
 * GET /api/jobs
 */
export async function GET(_request: Request) {
  const jobs = await findJobs();

  return Response.json({ data: { jobs } }, { status: 200 });
}

/**
 * Creat a new job
 * POST /api/jobs
 */
export async function POST(request: Request) {
  try {
    // Validate request data
    const rawData = await request.json();

    const data: InsertJob = {
      title: rawData.title?.toString() || '',
      salary: parseInt(rawData.salary?.toString() || '0'),
      description: rawData.description?.toString(),
      employerId: parseInt(rawData.employerId?.toString() || '2'),
    };

    // Create job
    const job = await createJob(data);

    // Response
    return Response.json(
      {
        message: 'job created',
        data: { job },
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
