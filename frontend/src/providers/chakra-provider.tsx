'use client';
import { ReactNode } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider as Provider, ThemeConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { useHuddle01 } from '@huddle01/react';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({config, colors });
export default function ChakraProviders({ children }: { children: ReactNode }) {
  // const { initialize } = useHuddle01();

  // initialize("nJVgJl-fL9NWACJ-bEKbcR6U6DEt6Fsr")
  return (
    <CacheProvider>
      <Provider theme={theme}>{children}</Provider>
    </CacheProvider>
  );
}
