'use client';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import RejuvenateAi from '../../images/svg/rejuvenate-logo.svg';
import { useAppContext } from '@/context/state';
import RegisterForm from '../register-form';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';

const Header = ({ bg = 'transparent' }: { bg?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setAddress } = useAppContext();
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    setAddress(`${address}`);
  }, [address, setAddress]);

  return (
    <>
      <header
        className={`bg-${bg} px-2 pr-4 max-w-[1300px] w-full py-1 flex justify-between items-center mx-auto`}
      >
        <div>
          <Link href={'/'} textDecor={'none'}>
            <RejuvenateAi />
          </Link>
        </div>
        <HStack spacing={4}>
          <Text as={Link} href={'/'} fontWeight={'medium'}>
            Home
          </Text>
          <Text as={Link} href={'/blog'} fontWeight={'medium'}>
            Blog
          </Text>
        </HStack>
        {address && (
          <HStack spacing={4}>
            <Button
              colorScheme='primaryColor'
              variant={'outline'}
              onClick={() => onOpen()}
            >
              Login
            </Button>
            <Button
              colorScheme='primaryColor'
              variant={'solid'}
              onClick={() => onOpen()}
            >
              Register
            </Button>
          </HStack>
        )}
        {!address && (
          <Button size={'lg'} onClick={openConnectModal}>
            Connect Wallet
          </Button>
        )}
        {/* <ConnectKitButton /> */}
      </header>
      <RegisterForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
