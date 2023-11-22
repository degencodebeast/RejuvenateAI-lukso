'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import { Box, Button, Stack } from '@chakra-ui/react';
import DashBoardLayout from '../layout';
import Link from 'next/link';

export default function DashBoard() {
  const navLinks = [
    { url: '/', title: 'Overview', icon: 'dashboard' },
    { url: '/meal-plans', title: 'Meal Plans', icon: 'fastfood' },
    { url: '/fitness-plans', title: 'Fitness Plans', icon: 'exercise' },
    { url: '/appointments', title: 'Appointments', icon: 'book_online' },
  ];
  return (
    <DashBoardLayout>

    <Box className='min-h-full h-full' px={'4'}>
    <Stack spacing={4} align={'center'} my={4} bg={'white'} justify={'center'} minH={'250'}>
      <Box fontWeight={'medium'} color={'gray.400'} fontSize={'xl'}>

      You haven&apos;t joined any community yet.
      </Box>
      <Box>

      <Button as={Link} size={'lg'} href={'/community'}>Join a community</Button>
      </Box>
    </Stack>
    </Box>
    </DashBoardLayout>
  );
}
