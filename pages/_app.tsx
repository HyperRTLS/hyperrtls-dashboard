import React from 'react';

import type { AppProps } from 'next/app';

import SWRProvider from '../components/SWRProvider';
import ThemeProvider from '../components/ThemeProvider';
import Layout from '../components/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content="#FFFFFF"
          media="(prefers-color-scheme: light)"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        ></meta>
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
