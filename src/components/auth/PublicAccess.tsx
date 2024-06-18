'use server';

import { getSession } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function PublicAccess({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session.isLoggedIn) return redirect('/');
  return <>{children}</>;
}
