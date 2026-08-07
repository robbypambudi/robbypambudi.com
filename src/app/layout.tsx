import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';

import { FirstLoadAnimation } from '@/components/layout/first-load-animation';
import Navbar from '@/components/navbar';
import AppProvider from '@/components/providers/app-provider';
import Footer from '@/components/sections/footer';
import data from '@/lib/data.json';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const { personal, socialLinks } = data;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robbypambudi.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Robby Pambudi',
    template: `%s | Robby Pambudi`,
  },
  description: personal.bio,
  keywords: [
    personal.name,
    'Software Engineer',
    'Backend',
    'AI',
    'LLM',
    'RAG',
    'ITS',
    ...data.techSkills.map((skill) => skill.name),
  ].join(', '),
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${personal.name} — Software Engineer`,
    description: personal.bio,
    siteName: 'Robby Pambudi',
    images: [
      {
        url: '/logo-light.png',
        width: 1200,
        height: 1200,
        alt: 'Robby wordmark',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${personal.name} — Software Engineer`,
    description: personal.bio,
    images: ['/logo-light.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    description: personal.bio,
    url: siteUrl,
    sameAs: socialLinks
      .filter((link) => link.platform !== 'Email')
      .map((link) => link.url),
    email: socialLinks
      .find((link) => link.platform === 'Email')
      ?.url.replace('mailto:', ''),
    knowsAbout: data.techSkills.map((skill) => skill.name),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surabaya',
      addressCountry: 'ID',
    },
  };

  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning data-scroll-behavior='smooth'>
        <body className={`${dmSans.variable} antialiased`}>
          <a
            href='#hero'
            className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-main focus:text-main-foreground focus:border-2 focus:border-border focus:rounded-base focus:shadow-shadow'
          >
            Skip to content
          </a>
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <AppProvider>
            <FirstLoadAnimation>
              <Navbar />
              <div className='min-h-screen'>{children}</div>
              <Footer />
            </FirstLoadAnimation>
          </AppProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
