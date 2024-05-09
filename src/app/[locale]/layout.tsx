import React from 'react';

import { Exo_2 } from 'next/font/google';
import { cookies } from 'next/headers';
import { Metadata } from 'next';

import AuthProvider from '@/components/base/provider/auth-provider';
import { Database } from '@/lib/schema';
import { themeMantine } from '@/styles/themeConfig';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Notifications } from '@mantine/notifications';

import '@/styles/globals.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const inter = Exo_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'Helpin',
  title: {
    default: 'Helpin',
    template: '%s | Helpin',
  },
  description:
    'Helpin is a volunteer platform that connects people in need with those who want to help.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Helpin',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#4e9678',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <AuthProvider accessToken={accessToken}>
          <MantineProvider theme={themeMantine}>
            <Notifications />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
