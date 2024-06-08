'use client';

import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import { type InsertJob } from '@/db/schema';
import Button from './Button';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';

interface JobFormButtonsProps extends ComponentPropsWithoutRef<'div'> {
  jobId?: number;
}

interface JobFormProps extends ComponentPropsWithoutRef<'form'> {
  job?: InsertJob;
}

const JobFormButtons = ({ jobId }: JobFormButtonsProps) => {
  const router = useRouter();
  const { pending } = useFormStatus();

  const onDelete = async () => {
    const res = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/jobs');
  };

  return jobId ? (
    <div className="mt-6 flex items-center justify-between">
      <Button asLink={false} type="button" theme="alert" onClick={onDelete}>
        Delete
      </Button>
      <div className="flex items-center gap-x-6">
        <Button asLink href="/jobs" theme="default-no-bg">
          Cancel
        </Button>
        <Button asLink={false} type="submit" theme="primary" disabled={pending}>
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <Button asLink href="/jobs" theme="default-no-bg">
        Cancel
      </Button>
      <Button asLink={false} type="submit" theme="primary" disabled={pending}>
        Save
      </Button>
    </div>
  );
};

export default function JobForm({ job, ...rest }: JobFormProps) {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState<null | string>(null);

  useEffect(() => {
    job?.title && setTitle(job.title);
    job?.salary && setSalary(job.salary);
    job?.description && setDescription(job.description);
  }, [job?.title, job?.salary, job?.description]);

  return (
    <form {...rest}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {job?.id ? 'Edit' : 'New'} Job Form
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Provide the details in the form below to{' '}
            {job?.id ? 'update the job' : 'create a new job'}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label htmlFor="title">Job Title</Label>
              <div className="mt-2">
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="salary">Salary</Label>
              <div className="mt-2">
                <Input
                  type="number"
                  id="salary"
                  name="salary"
                  value={salary}
                  onChange={e => setSalary(+e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <Label htmlFor="description">Description</Label>
              <div className="mt-2">
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={description || ''}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <JobFormButtons jobId={job?.id} />
    </form>
  );
}
