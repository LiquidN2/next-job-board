'use client';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import Link from 'next/link';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  asLink: false;
  theme?: 'default' | 'primary' | 'secondary' | 'alert';
}

interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  asLink: true;
  theme?: 'default' | 'primary' | 'secondary' | 'default-no-bg';
}

export default function Button(props: ButtonProps | LinkProps) {
  const className: string = useMemo(() => {
    let colorTheme = '';

    switch (props.theme) {
      case 'primary':
        colorTheme = 'shadow-sm text-white bg-indigo-600 hover:bg-indigo-500';
        break;

      case 'alert':
        colorTheme = 'shadow-sm text-white bg-red-600 hover:bg-red-500';
        break;

      case 'default-no-bg':
        colorTheme = 'text-gray-900 hover:text-gray-700';
        break;

      case 'default':
      default:
        colorTheme = 'shadow-sm text-gray-900 bg-gray-200 hover:bg-gray-400';
    }

    return `flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 transition ${colorTheme}`;
  }, [props.theme]);

  if (props.asLink) {
    const { asLink, href, children, ...rest } = props;
    return (
      <Link href={href || '#'} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { asLink, children, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
