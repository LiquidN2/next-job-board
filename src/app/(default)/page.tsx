import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Header from '@/components/ui/Header';
import Heading from '@/components/ui/Heading';

import { getSession } from '@/actions/auth';

export const metadata: Metadata = {
  title: 'Next VPS | Dashboard',
};

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect('/login');
  }

  return (
    <>
      <Header>
        <Heading>Dashboard</Heading>
      </Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          Dashboard
        </div>
      </main>
    </>
  );
}
