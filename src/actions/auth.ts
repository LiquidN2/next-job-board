'use server';

import { insertUserSchema, users } from '@/db/schema';

export async function register(_prevState: any, formData: FormData) {
  const validated = insertUserSchema.safeParse({
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    password: formData.get('password')?.toString().trim() || '',
    passwordConfirmation:
      formData.get('password-confirmation')?.toString().trim() || '',
  });

  console.log(validated);
}
