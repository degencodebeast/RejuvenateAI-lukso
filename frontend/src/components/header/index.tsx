'use client';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import RejuvenateAi from '../../images/svg/rejuvenate-logo.svg';
import { DataContext } from '../../context/state';
import RegisterForm from '../register-form';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
// import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';

const Header = ({ bg = 'transparent' }: { bg?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
  }

  //const { address } = useAccount();
  const address = '';
  // const { isConnected } = useAccount();
  // const { openConnectModal } = useConnectModal();

  // const openConnectModal = () => {};
  console.log(wallet);
  // const { setAddress } = useAppContext();
  // const { openConnectModal } = useConnectModal();

  // useEffect(() => {
  //   setAddress(`${address}`);
  // }, [address, setAddress]);

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

        {/* <HStack spacing={4}>
          <Text as={Link} href={'/'} fontWeight={'medium'}>
            Home
          </Text>
          <Text as={Link} href={'/blog'} fontWeight={'medium'}>
            Blog
          </Text>
        </HStack> */}
        {wallet && (
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
        {!wallet && (
          <Button
            size={'lg'}
            onClick={() => (wallet ? disconnect(wallet) : connect())}
          >
            {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
          </Button>
        )}
        {/* <ConnectKitButton /> */}
      </header>
      <RegisterForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
