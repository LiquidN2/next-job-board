import type { ComponentPropsWithoutRef } from 'react';

export default function InputError({
  children,
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{children}</p>
  );
}
