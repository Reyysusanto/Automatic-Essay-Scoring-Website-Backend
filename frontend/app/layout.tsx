import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Essay Scoring System',
  // icons: {
  //   icon: '/assets/logo.svg',
  // },
  keywords: ['Essay', 'Scoring'],
  description: 'Essay Scoring System Website',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Essay Scoring System',
    description: 'Essay Scoring System Website',
    url: '/',
    siteName: 'Essay Scoring System',
    // images: [
    //   {
    //     url: '/assets/logo.svg',
    //     alt: 'Essay Scoring System Logo',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
