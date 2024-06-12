import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';

import { registerUser } from '@/actions/user';
import { register } from '@/actions/auth';

export const metadata: Metadata = {
  title: 'Next VPS | Register',
};

export default function Register() {
  async function submit(formData: FormData) {
    'use server';
    console.log('Form submitted');
  }

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
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={submit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <div className="mt-2">
              <Input id="name" name="name" type="text" required />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password-confirmation">Password confirmation</Label>
            <div className="mt-2">
              <Input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
