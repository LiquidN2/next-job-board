import { SessionOptions } from 'iron-session';

export interface SessionData {
  userId: number | null;
  userEmail: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  userId: null,
  userEmail: '',
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PW!,
  cookieName: 'user-auth',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
