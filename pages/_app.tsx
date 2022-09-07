import React from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import SWRProvider from '../components/SWRProvider';
import ThemeProvider from '../components/ThemeProvider';
import Layout from '../components/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';

export type NextPageWithTitle<P = unknown, IP = P> = NextPage<P, IP> & {
  title: string;
};

type AppPropsWithTitle = AppProps & {
  Component: NextPageWithTitle;
};

function App({ Component, pageProps }: AppPropsWithTitle) {
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content="#FFFFFF"
          media="(prefers-color-scheme: light)"
        ></meta>
        <meta
          name="theme-color"
          content="#121212"
          media="(prefers-color-scheme: dark)"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>

        <title>{`${Component.title} | HyperRTLS`}</title>
      </Head>

      <SWRProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRProvider>
    </>
  );
}

export default App;
