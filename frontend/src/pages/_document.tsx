import { Metadata } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';

export const metadata: Metadata = {
  title: 'Rejuvenate AI',
  description: 'We Empower Everyone, Everywhere To LIVE BETTER, LONGER',
};

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
