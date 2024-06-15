'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import Label from '../ui/Label';
import Input from '../ui/Input';
import InputError from '../ui/InputError';

import { handleLogin } from '@/actions/auth';

const initialState = {
  error: null,
  data: null,
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(handleLogin, initialState);

  useEffect(() => {
    if (!state?.data?.isLoggedIn) return;
    router.push('/');
  }, [router, state]);

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <Label htmlFor="email" hasError={!!state?.error?.email}>
          Email
        </Label>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            hasError={!!state?.error?.email}
          />
        </div>
        {!!state?.error?.email && <InputError>{state.error.email}</InputError>}
      </div>

      <div>
        <Label htmlFor="password" hasError={!!state?.error?.password}>
          Password
        </Label>
        <div className="mt-2">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            hasError={!!state?.error?.password}
          />
        </div>
        {!!state?.error?.password && (
          <InputError>{state.error.password}</InputError>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={pending}
        >
          Login
        </button>
      </div>
    </form>
  );
}
