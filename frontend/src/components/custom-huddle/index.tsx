import { Box, Button } from '@chakra-ui/react';
import { useHuddle01 } from '@huddle01/react';
import { useLobby } from '@huddle01/react/hooks';
import { useEffect } from 'react';

import axios from 'axios';
import Icon from '../Icon';

export default function CustomHuddle({}) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize(PROJECT_ID);
  }, [PROJECT_ID, initialize]);
  const createRoom = async () => {
    try {
      const { data } = await axios.get('/api/create-room');
      console.log('huddle:', { data });
      if (joinLobby.isCallable) {
        joinLobby(data?.data?.roomId);
      }
    } catch (err) {
      console.log('error client:', { err });
    }
  };

  return (
    <Button
      size={'sm'}
      rounded={'full'}
      gap={2}
      className='hover:bg-primaryYellowTrans hover:text-primaryGreen text-primaryBeige bg-primaryGreen'
    >
      <Icon size={20} name='phone' /> Start Call
    </Button>
  );
}
