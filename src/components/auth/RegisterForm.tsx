'use client';

import { type ComponentPropsWithoutRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import Label from '../ui/Label';
import Input from '../ui/Input';
import InputError from '../ui/InputError';

import { registerUser } from '@/actions/auth';

interface RegisterFormProps extends ComponentPropsWithoutRef<'form'> {
  submit: (prevState: any, formData: FormData) => Promise<any>;
}

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

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <Label htmlFor="name">Name</Label>
        <div className="mt-2">
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <InputError error={state?.error} fieldName="name" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <InputError error={state?.error} fieldName="email" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-2">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <InputError error={state?.error} fieldName="password" />
      </div>

      <div>
        <Label htmlFor="password-confirmation">Password confirmation</Label>
        <div className="mt-2">
          <Input
            id="password-confirmation"
            name="password-confirmation"
            type="password"
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
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
