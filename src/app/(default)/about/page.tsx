import type { Metadata } from 'next';

import Header from '@/components/ui/Header';
import Heading from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Next VPS | About',
};

export default function About() {
  return (
    <>
      <Header>
        <Heading>About</Heading>
      </Header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </>
  );
}
