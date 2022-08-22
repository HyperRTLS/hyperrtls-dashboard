import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Dashboard for managing IPS systems" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
