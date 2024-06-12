import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import RegisterForm from '@/components/auth/RegisterForm';

import { registerUser } from '@/actions/auth';

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
        <RegisterForm />

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
