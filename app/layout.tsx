import './globals.css';

import type { Metadata } from 'next';
import { Arimo } from 'next/font/google';

const arimo = Arimo({
  subsets: ['latin'],
  variable: '--font-arimo',
});

export const metadata: Metadata = {
  title: 'MiaDocs',
  icons: '/favicon.svg',
  // description: 'TODO:',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${arimo.variable} antialiased`} lang='en'>
      <body>{children}</body>
    </html>
  );
}
