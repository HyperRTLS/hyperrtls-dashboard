import React from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';

import ThemeProvider from '@/components/ThemeProvider';
import PageLayout from '@/components/PageLayout';

import createEmotionCache from '@/utils/createEmotionCache';

import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export type EnhancedNextPage<P = unknown, IP = P> = NextPage<P, IP> & {
  title?: string;
};

export type EnhancedAppProps = AppProps & {
  Component: EnhancedNextPage;
  emotionCache?: EmotionCache;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: EnhancedAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <title>
          {Component.title ? `${Component.title} | HyperRTLS` : 'HyperRTLS'}
        </title>
      </Head>

      <ThemeProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
