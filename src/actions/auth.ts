'use server';

import { z } from 'zod';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';

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

  // Reset session data to default if not logged in
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.userEmail = defaultSession.userEmail;
    session.userId = defaultSession.userId;
    return session;
  }

  // Look up user in DB
  if (session.isLoggedIn && session.userEmail !== '') {
    const user = await findUserByEmail(session.userEmail);
    if (!user) {
      session.isLoggedIn = defaultSession.isLoggedIn;
      session.userEmail = defaultSession.userEmail;
      session.userId = defaultSession.userId;
      return session;
    }
  }

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}

export async function login(email: string, password: string) {
  let loginResponse: any = {};
  loginResponse.data = null;
  loginResponse.error = null;

  try {
    // 1. Validate form data
    const validationSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const validated = validationSchema.safeParse({ email, password });
    if (!validated.success) {
      loginResponse.error = validated.error.flatten().fieldErrors;
      throw new Error();
    }

    // 2. Verify email
    const user = await findUserByEmail(email);
    if (!user) {
      loginResponse.error = { email: 'Email does not exist' };
      throw new Error();
    }

    // 3. Verify password
    const matchedPassword = await argon2.verify(user.password, password);
    if (!matchedPassword) {
      loginResponse.error = { password: 'Incorrect password' };
      throw new Error();
    }

    // 4. Create session
    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = user.id;
    session.userEmail = user.email;
    await session.save();

    // 5. Response
    loginResponse.data = { isLoggedIn: session.isLoggedIn };
  } catch (error: any) {
    if (error.message !== '') {
      loginResponse.error = error.message;
    }
  }

  return loginResponse;
}

export async function handleLogin(_prevState: any, formData: FormData) {
  let response: any = {};
  response.data = null;
  response.error = null;

  try {
    // 1. Get raw form data
    const rawData = {
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString().trim() || '',
    };

    // 2. Login with email & password
    const loginResponse = await login(rawData.email, rawData.password);
    if (loginResponse.error) {
      response.error = loginResponse.error;
      throw new Error();
    }

    response.data = loginResponse.data;
  } catch (error: any) {
    if (error.message !== '') {
      response.error = error.message;
    }
  }

  return response;
}

export async function handleRegister(_prevState: any, formData: FormData) {
  let response: any = {};
  response.data = null;
  response.error = null;

  try {
    // 1. Get raw form data
    const rawData = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      password: formData.get('password')?.toString().trim() || '',
      passwordConfirmation:
        formData.get('password-confirmation')?.toString().trim() || '',
    };

    // 2. Validate password confirmation
    if (rawData.password !== rawData.passwordConfirmation) {
      response.error = {
        password: 'password and password confirmation must be the same',
        'password-confirmation':
          'password and password confirmation must be the same',
      };
      throw new Error();
    }

    // 3. Validate user registation data
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

    // 4. Validate unique email
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      response.error = { email: 'Email in use' };
      throw new Error();
    }

    // 5. Hash password
    const hash = await argon2.hash(userData.password);

    // 6. Create new user
    const newUsers = await db
      .insert(users)
      .values({
        ...userData,
        password: hash,
      })
      .returning({ id: users.id, email: users.email });

    if (!newUsers || newUsers.length === 0)
      throw new Error('Unable to register new user');

    // 7. Login with email & password
    const loginResponse = await login(userData.email, userData.password);
    if (loginResponse.error) {
      response.error = loginResponse.error;
      throw new Error();
    }

    // 8. Response session data
    response.data = loginResponse.data;
  } catch (error: any) {
    if (error.message !== '') {
      response.error = error.message;
    }
  }

  return response;
}
