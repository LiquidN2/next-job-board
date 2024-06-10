import type { Metadata } from 'next';
import Header from '@/components/ui/Header';

export const metadata: Metadata = {
  title: 'Next VPS | Dashboard',
};

export default function Home() {
  return (
    <>
      <Header>Dashboard</Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          Dashboard
        </div>
      </main>
    </>
  );
}
