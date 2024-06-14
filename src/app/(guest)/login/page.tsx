import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Next VPS | Login',
};

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/images/favicon-32x32.png"
          alt="Your Company"
          height={32}
          width={32}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register an account
          </Link>
        </p>
      </div>
    </div>
  );
}
