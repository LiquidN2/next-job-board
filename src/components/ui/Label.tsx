import { ComponentPropsWithoutRef } from 'react';

export default function Label({
  children,
  ...rest
}: ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      {...rest}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
}
