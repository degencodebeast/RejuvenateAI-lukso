'use client';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import RejuvenateAi from '../../images/svg/rejuvenate-logo.svg';
import { useAppContext } from '@/context/state';
import RegisterForm from '../register-form';
import { Button, useDisclosure } from '@chakra-ui/react';

const Header = ({ bg = 'transparent' }: { bg?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setAddress } = useAppContext();
  //const { address } = useAccount();
  const address = "";
  // const { isConnected } = useAccount();
  // const { openConnectModal } = useConnectModal();

  const openConnectModal = () => {
    
  }

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

      {address && (
        <>
          <Button
            colorScheme='primaryColor'
            variant={'solid'}
            onClick={() => onOpen()}
          >
            Register
          </Button>
        </>
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
