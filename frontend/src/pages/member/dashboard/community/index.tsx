'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import { Box } from '@chakra-ui/react';

export default function DashBoard() {
  const navLinks = [
    { url: '/', title: 'Overview', icon: 'dashboard' },
    { url: '/meal-plans', title: 'Meal Plans', icon: 'fastfood' },
    { url: '/fitness-plans', title: 'Fitness Plans', icon: 'exercise' },
    { url: '/appointments', title: 'Appointments', icon: 'book_online' },
  ];
  return (
    <Box className='min-h-full h-full'>
      {/* <DashboardSideBar links={navLinks} /> */}
    </Box>
  );
}
