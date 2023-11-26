'use client';
import { ReactNode } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import {
  ChakraProvider as Provider,
  StyleFunctionProps,
  ThemeConfig,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { useHuddle01 } from '@huddle01/react';
const colors = {
  primaryColor: {
    50: '#e1fff0',
    100: '#b4fed7',
    200: '#85fcbd',
    300: '#57fba4',
    400: '#33fb8a',
    500: '#24e171',
    600: '#19af57',
    700: '#0d7e3e',
    800: '#014b25',
    900: '#001a09',
  },
  secondaryColor: {
    50: '#fff8dd',
    100: '#faeab3',
    200: '#f6dc87',
    300: '#f1ce59',
    400: '#edc02c',
    500: '#d3a712',
    600: '#a4820a',
    700: '#755d05',
    800: '#473800',
    900: '#1a1300',
  },
};
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  components: {
    Button: {
      variants: {
        solid: (props: StyleFunctionProps) => {
          return props.colorScheme == 'primaryColor'
            ? {
                bg: 'primaryColor.800',
                color: 'secondaryColor.300',
                _hover: {
                  bg: 'secondaryColor.400',
                  color: 'primaryColor.900',
                },
                // _disabled: {
                //   bg: 'primaryColor.300',
                //   cursor: 'not-allowed',
                // },
              }
            : {};
        },
      },
      defaultProps: {
        colorScheme: 'primaryColor',
      },
    },
  },
});
export default function ChakraProviders({ children }: { children: ReactNode }) {
  // const { initialize } = useHuddle01();

  // initialize("nJVgJl-fL9NWACJ-bEKbcR6U6DEt6Fsr")
  return (
    // <CacheProvider>
    <Provider theme={theme}>{children}</Provider>

    // </CacheProvider>
  );
}
