'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import web3Onboard from '@/components/web3-onboard';
import { Web3OnboardProvider } from '@web3-onboard/react';

import { AppWrapper } from '../context/state';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppWrapper>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <ChakraProvider>{children}</ChakraProvider>
      </Web3OnboardProvider>
    </AppWrapper>
  );
}

export default Providers;
