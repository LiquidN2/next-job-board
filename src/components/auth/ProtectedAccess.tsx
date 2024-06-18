'use server';

import { getSession } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedAccess({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.isLoggedIn) return redirect('/login');
  return <>{children}</>;
}
