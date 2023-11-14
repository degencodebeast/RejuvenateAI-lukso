import './globals.css';

import type { AppProps } from 'next/app';
import Providers from './providers';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { WagmiConfig, createConfig, configureChains } from "wagmi";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { arbitrumGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrumGoerli],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

// NOTE: This may cause CORS errors during the development
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});


const { connectors } = getDefaultWallets({
  appName: "RejuvenateAI",
  projectId: projectId,
  chains,
});

const config = createConfig(
  {
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  }
 
);


export default function App({ Component, pageProps }: AppProps) {
  //const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Head>
        <title>RejuvenateAI</title>
      </Head>
      <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains} modalSize="compact">
      <Providers>
        <Component {...pageProps} className={poppins.className} />
      </Providers>
      </RainbowKitProvider>
  </WagmiConfig>
    </>
  );
}
