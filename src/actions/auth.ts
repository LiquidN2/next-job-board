'use server';

import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db/db';
import { insertUserSchema, users } from '@/db/schema';

export async function registerUser(_prevState: any, formData: FormData) {
  let response: any = {};
  response.data = null;
  response.error = null;

  try {
    // Get raw form data
    const rawData = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString().trim() || '',
      passwordConfirmation:
        formData.get('password-confirmation')?.toString().trim() || '',
    };

    // Check if password is confirmed
    if (rawData.password !== rawData.passwordConfirmation) {
      response.error = {
        password: 'password and password confirmation must be the same',
        'password-confirmation':
          'password and password confirmation must be the same',
      };
      throw new Error();
    }

    // Form data validation
    const validated = insertUserSchema.safeParse({
      name: rawData.name,
      email: rawData.email,
      password: rawData.password,
    });

    if (!validated.success) {
      response.error = validated.error.flatten().fieldErrors;
      throw new Error();
    }

    const userData = validated.data;

    // Check if email is unique
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, userData.email),
    });
    if (existingUser) {
      response.error = { email: 'Email in use' };
      throw new Error();
    }

    // Hash password
    const hash = await argon2.hash(userData.password);

    // Create user
    const newUsers = await db
      .insert(users)
      .values({
        ...userData,
        password: hash,
      })
      .returning({ id: users.id });
    if (!newUsers || newUsers.length === 0)
      throw new Error('Unable to register new user');

    // Set session cookie

    response.data = { user: newUsers[0] };
  } catch (error: any) {
    if (error.message !== '') {
      response.error = error.message;
    }
  }

  return response;
}
