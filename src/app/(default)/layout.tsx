import type { Metadata } from 'next';
import { Suspense } from 'react';
// import Loading from './loading';
import { Inter } from 'next/font/google';
import '../globals.css';

import Nav from '@/components/ui/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Job Board',
  description: 'A Web App by NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`h-full ${inter.className}`}>
        <div className="min-h-full">
          <Nav />
          {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
          {children}
        </div>
      </body>
    </html>
  );
}
