'use client';
import { createContext, useContext, useState } from 'react';
import { stateContextType } from '../types/state';
// import { WagmiConfig, createConfig } from "wagmi";
// import {
//   ConnectKitProvider,
//   getDefaultConfig,
// } from "connectkit";
// import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// const chains = [mainnet, polygon, optimism, arbitrum];

// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.ALCHEMY_ID, // or infuraId
//     walletConnectProjectId: "",
//     chains,

//     // Required
//     appName: "Your App Name",

//     // Optional
//     appDescription: "Your App Description",
//     appUrl: "https://family.co", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   })
// );


const contextDefaultValue: stateContextType = {
  allTokensData: {},
  address: '',
  setAllTokenData: () => null,
  setAddress: () => null,
  loading: false,
  setLoading: () => null,
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<stateContextType>(contextDefaultValue);

export function AppWrapper({ children }: StateContextProviderProps) {
  const [allTokensData, setAllTokenData] = useState<any>();
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  let sharedState = {
    allTokensData,
    setAllTokenData,
    address,
    setAddress,
    loading,
    setLoading,
  };

  return (
     <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  //   <WagmiConfig config={config}>
  //   <ConnectKitProvider>
  //     <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  //   </ConnectKitProvider> 
  // </WagmiConfig>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
