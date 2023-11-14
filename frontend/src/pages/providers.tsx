'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { AppWrapper } from '../context/state';

function Providers({ children }: { children: React.ReactNode }) {
  return (
   
      <AppWrapper>
        <ChakraProvider>{children}</ChakraProvider>
      </AppWrapper>
  
  );
}

export default Providers;
