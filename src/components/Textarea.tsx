import { ComponentPropsWithoutRef } from 'react';

export default function Textarea({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-0.5 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      {...rest}
    ></textarea>
  );
}
