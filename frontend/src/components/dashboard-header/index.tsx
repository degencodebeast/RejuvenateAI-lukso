import { maskHexAddress } from '@/helpers/prompt';
import {  Button, HStack, Text } from '@chakra-ui/react';
import Avatar from 'boring-avatars'
import Icon from '../Icon';
export default function DashBoardHeader(props: any) {
const address = ''

  return (
    <div className='flex items-center justify-between w-full bg-white py-2  px-4'>
      <Text as={'span'} fontSize={{lg:'xl',base:'lg'}} fontWeight={'semibold'} className='text-primaryGreen '>
        Welcome back
      </Text>
      <div className='flex items-center gap-3'>
        <HStack mr={4}>

        <Avatar variant='beam' colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}/>
       
        <Text fontWeight={'semibold'} className='text-primaryGreen '>
        {maskHexAddress(address as string)}
        </Text>
        </HStack>
        <Button size={'sm'} variant={'outline'} colorScheme='red' rounded={'full'}><Text mr={2} as={'span'}>Logout</Text> <Icon  size={20} name='logout'/></Button>
      </div>
    </div>
  );
}
