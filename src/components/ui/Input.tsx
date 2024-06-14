import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  hasError?: boolean;
}

export default function Input({
  hasError = false,
  className,
  ...rest
}: InputProps) {
  const [colorTheme, setColorTheme] = useState('');

  useEffect(() => {
    if (!hasError) {
      setColorTheme('text-gray-900 ring-gray-300 focus:ring-indigo-600');
      return;
    }
    setColorTheme('text-red-600 ring-red-300 focus:ring-red-600');
  }, [hasError]);

  return (
    <input
      className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${colorTheme} sm:text-sm sm:leading-6`}
      {...rest}
    />
  );
}
