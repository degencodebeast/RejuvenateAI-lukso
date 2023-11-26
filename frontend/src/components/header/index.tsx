'use client';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import RejuvenateAi from '../../images/svg/rejuvenate-logo.svg';
import { DataContext } from '../../context/state';
import RegisterForm from '../register-form';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

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

  const openConnectModal = () => {};
  console.log(wallet);

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

        {wallet && (
          <>
            <Button onClick={() => onOpen()}>Register</Button>
          </>
        )}
        {!wallet && (
          <Button
            size={'lg'}
            disabled={connecting}
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
