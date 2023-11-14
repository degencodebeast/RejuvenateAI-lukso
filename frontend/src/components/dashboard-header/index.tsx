import { Avatar, Text } from '@chakra-ui/react';

export default function DashBoardHeader(props: any) {
  return (
    <div className='flex items-center justify-between w-full bg-white py-2  px-4'>
      <Text fontWeight={'semibold'} className='text-primaryGreen '>
        Welcome back, David
      </Text>
      <div className='flex items-center gap-3'>
        <Avatar size={'md'} src='/images/user-54.jpg' />
        <Text fontWeight={'semibold'} className='text-primaryGreen '>
          David
        </Text>
      </div>
    </div>
  );
}
