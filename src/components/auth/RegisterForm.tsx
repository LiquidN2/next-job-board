'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import Label from '../ui/Label';
import Input from '../ui/Input';
import InputError from '../ui/InputError';

import { registerUser } from '@/actions/auth';

const initialState = {
  error: null,
  data: null,
};

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(registerUser, initialState);
  const router = useRouter();

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <Label htmlFor="name" hasError={!!state?.error?.name}>
          Name
        </Label>
        <div className="mt-2">
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            hasError={!!state?.error?.name}
          />
        </div>
        {!!state?.error?.name && <InputError>{state.error.name}</InputError>}
      </div>

      <div>
        <Label htmlFor="email" hasError={!!state?.error?.email}>
          Email
        </Label>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type="email"
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
        <Label
          htmlFor="password-confirmation"
          hasError={!!state?.error?.['password-confirmation']}
        >
          Password confirmation
        </Label>
        <div className="mt-2">
          <Input
            id="password-confirmation"
            name="password-confirmation"
            type="password"
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
            hasError={!!state?.error?.['password-confirmation']}
          />
        </div>
        {!!state?.error?.['password-confirmation'] && (
          <InputError>{state.error['password-confirmation']}</InputError>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={pending}
        >
          Register
        </button>
      </div>
    </form>
  );
}
