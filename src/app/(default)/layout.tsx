import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';

import ProtectedAccess from '@/components/auth/ProtectedAccess';
import Nav from '@/components/ui/Nav';
// import Loading from './loading';

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
          <ProtectedAccess>
            <Nav />
            {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
            {children}
          </ProtectedAccess>
        </div>
      </body>
    </html>
  );
}
