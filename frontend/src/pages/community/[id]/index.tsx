'use client';
import { Box, Flex } from '@chakra-ui/react';

export default function CommunityViewPage() {
  return (
    <Flex
      gap={6}
      mx={'auto'}
      className='h-screen'
      bg={'secondaryColor.200'}
      p={6}
    >
      <Box bg={'white'} maxW={'900px'} flex={1}>
        Community
      </Box>
    </Flex>
  );
}
