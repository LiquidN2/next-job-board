import { findJobById, deleteJob } from '@/db/queries/job';
import { type SelectJob } from '@/db/schema';

/**
 * Get job by id
 * GET /api/jobs/[id]
 */
export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: SelectJob['id'] } }
) {
  const job = await findJobById(id);
  if (!job) {
    return Response.json({ message: 'job not found' }, { status: 400 });
  }

  return Response.json({ data: { job } }, { status: 200 });
}

/**
 * Update job by id
 * PUT /api/jobs/[id]
 */
export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: SelectJob['id'] } }
) {
  const job = await findJobById(id);
  if (!job) {
    return Response.json({ message: 'job not found' }, { status: 400 });
  }
}

/**
 * Delete job by id
 * DELETE /api/jobs/[id]
 */
export async function DELETE(
  _request: Request,
  { params: { id } }: { params: { id: SelectJob['id'] } }
) {
  const job = await findJobById(id);
  if (!job) {
    return Response.json({ message: 'job not found' }, { status: 400 });
  }

  await deleteJob(id);

  return Response.json({ message: `job deletion successful` }, { status: 200 });
}
