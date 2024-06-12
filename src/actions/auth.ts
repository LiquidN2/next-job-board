'use server';

import * as argon2 from 'argon2';

import { db } from '@/db/db';
import { insertUserSchema, users } from '@/db/schema';

export async function registerUser(_prevState: any, formData: FormData) {
  let response: any = {};
  response.data = null;
  response.error = null;

  // Form data validation
  const validated = insertUserSchema.safeParse({
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    password: formData.get('password')?.toString().trim() || '',
    passwordConfirmation:
      formData.get('password-confirmation')?.toString().trim() || '',
  });

  if (!validated.success) {
    response.error = validated.error.flatten().fieldErrors;
    return response;
  }

  const userData = validated.data;

  // try {
  //   // Hash password
  //   const hash = await argon2.hash(userData.password);

  //   // Create user
  //   const inserteds = await db
  //     .insert(users)
  //     .values({
  //       ...userData,
  //       password: hash,
  //     })
  //     .returning({ newUserId: users.id });

  //   const { newUserId } = inserteds[0];
  //   if (!newUserId) throw new Error('Unable to register user');

  //   response.data = { newUserId };
  // } catch (error: any) {
  //   response.error = error;
  // }

  return response;
}
