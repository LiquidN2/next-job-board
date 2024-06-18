import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../globals.css';
import PublicAccess from '@/components/auth/PublicAccess';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Job Board ',
  description: 'A Web Application by NextJS',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-full ${inter.className}`}>
        <PublicAccess>{children}</PublicAccess>
      </body>
    </html>
  );
}
