import { FC } from 'react';
import { formatCurrency } from '@/utils/utils';

interface Props {
  id?: number;
  title?: string;
  employer?: {
    id?: number;
    name?: string;
  };
  salary?: number;
}

const JobCard: FC<Props> = ({
  id = 1,
  title = 'Job Title',
  employer = { id: 1, name: 'Employer Name' },
  salary = 50000,
}) => {
  return (
    <a
      href={`/jobs/${id}`}
      className="flex flex-col mb-6 px-6 py-4 w-full rounded-md border border-gray-200 bg-white transition hover:bg-gray-100"
    >
      <h5 className="font-semibold text-gray-700">{title}</h5>
      <h5 className="text-sky-600">{employer.name}</h5>
      <p className="">Salary: USD {formatCurrency(salary)}</p>
    </a>
  );
};

export default JobCard;
