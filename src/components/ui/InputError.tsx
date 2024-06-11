import type { ComponentPropsWithoutRef } from 'react';

interface InputErrorProps extends ComponentPropsWithoutRef<'p'> {
  error: Record<string, string> | null;
  fieldName: string;
}

export default function InputError({ error, fieldName }: InputErrorProps) {
  if (error && error[fieldName]) {
    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error[fieldName]}
      </p>
    );
  }
  return null;
}
