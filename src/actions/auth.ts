'use server';

import { z } from 'zod';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getIronSession, IronSession } from 'iron-session';

import { db } from '@/db/db';
import { insertUserSchema, users } from '@/db/schema';
import {
  type SessionData,
  defaultSession,
  sessionOptions,
} from '@/libs/session';

export async function findUserByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.userEmail = defaultSession.userEmail;
    session.userId = defaultSession.userId;
  }

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}

export async function login(_prevState: any, formData: FormData) {
  let response: any = {};
  response.data = null;
  response.error = null;

  try {
    // Get raw form data
    const rawData = {
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString().trim() || '',
    };

    // Validate form data
    const validationSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const validated = validationSchema.safeParse(rawData);

    if (!validated.success) {
      response.error = validated.error.flatten().fieldErrors;
      throw new Error();
    }

    // Verify user by email
    const user = await findUserByEmail(validated.data.email);
    if (!user) {
      response.error = { email: 'Email does not exist' };
      throw new Error();
    }

    // Varify password
    const matchedPassword = await argon2.verify(
      user.password,
      validated.data.password
    );
    if (!matchedPassword) {
      response.error = { password: 'Wrong password' };
      throw new Error();
    }

    // Create session
    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = user.id;
    session.userEmail = user.email;
    await session.save();

    response.data = { session };

    // Response
  } catch (error: any) {
    if (error.message !== '') {
      response.error = error.message;
    }
  }

  console.log(response);

  return response;
}

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
    const existingUser = await findUserByEmail(userData.email);
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
