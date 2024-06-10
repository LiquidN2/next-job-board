'use client';

import Button from '../ui/Button';
import { formatCurrency } from '@/utils/utils';

interface JobShowProps {
  id: number;
  title: string;
  employer: {
    id: number;
    name: string;
  };
  salary: number;
  description: string | null;
}

export default function JobShow({
  id,
  title,
  employer,
  salary,
  description,
}: JobShowProps) {
  return (
    <div>
      <h5 className="mb-1 font-semibold text-lg text-gray-900">{title}</h5>
      <h5 className="mb-3 text-sky-700">{employer.name}</h5>
      <div className="mb-5 grid grid-cols-[20px_1fr] gap-x-6 gap-y-1">
        <div>📍</div>
        <div>Location</div>
        <div>🏢</div>
        <div>Industry</div>
        <div>🕒</div>
        <div>Full-time</div>
        <div>💵</div>
        <div>USD {formatCurrency(salary)}</div>
      </div>
      <div>
        <h5 className="font-semibold">About the role:</h5>
        <p>{description}</p>
      </div>
      <hr className="mt-12 mb-12" />
      <div className="flex justify-end gap-4">
        <Button asLink theme="default-no-bg" href="/jobs">
          Go back
        </Button>
        <Button asLink theme="primary" href={`/jobs/${id}/edit`}>
          Edit
        </Button>
      </div>
    </div>
  );
}
