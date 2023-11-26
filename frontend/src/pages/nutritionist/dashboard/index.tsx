'use client';

import DashBoardHeader from '@/components/dashboard-header';
import DashboardSideBar from '@/components/dashboard-sidebar';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import NutritionistDashBoardLayout from './layout';

export default function DashBoard() {
  return (
    <NutritionistDashBoardLayout>
      <Box className='min-h-full h-full px-4 mt-6'>
        <Heading size={'lg'} className='text-primaryGreen'>
          Activity
        </Heading>
        <Flex
          align={'center'}
          justify={'center'}
          minH={220}
          bg={'white'}
          my={3}
        >
          <Text
            fontSize={18}
            className='text-secondaryGray'
            fontWeight={'semibold'}
          >
            No Activity yet
          </Text>
        </Flex>
      </Box>
    </NutritionistDashBoardLayout>
  );
}
