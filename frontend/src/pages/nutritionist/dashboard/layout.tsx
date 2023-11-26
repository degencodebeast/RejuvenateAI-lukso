'use client';
import DashBoardHeader from '@/components/dashboard-header';
import DashboardSideBar from '@/components/dashboard-sidebar';
import { ReactNode } from 'react';

export default function NutritionistDashBoardLayout({ children }: { children: ReactNode }) {
  const navLinks = [
    { url: 'overview', title: 'Overview', icon: 'dashboard' },
    { url: 'meal-plans', title: 'Meal Plans', icon: 'fastfood' },
    { url: 'fitness-plans', title: 'Fitness Plans', icon: 'exercise' },
    { url: 'appointments', title: 'Appointments', icon: 'book_online' },
    { url: 'settings', title: 'Settings', icon: 'settings' },
  ];
  return (
    <div className='flex max-w-[1350px] mx-auto my-0 h-[100vh] max-h-[700px] min-h-[750px] bg-primaryBeige'>
      <DashboardSideBar links={navLinks} entryPath='/nutritionist/dashboard' />
      <div className=' flex-1 pb-20'>
        <DashBoardHeader />

        {children}
      </div>
    </div>
  );
}
