import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  hasError?: boolean;
}

export default function Label({
  hasError = false,
  children,
  ...rest
}: LabelProps) {
  const [colorTheme, setColorTheme] = useState('');

  useEffect(() => {
    if (!hasError) {
      setColorTheme('text-gray-900');
      return;
    }
    setColorTheme('text-red-500');
  }, [hasError]);

  return (
    <label
      className={`block text-sm font-medium leading-6 ${colorTheme}`}
      {...rest}
    >
      {children}
    </label>
  );
}
