'use client';
import DashBoardHeader from '@/components/dashboard-header';
import DashboardSideBar from '@/components/dashboard-sidebar';
import { ReactNode } from 'react';

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const navLinks = [
    { url: 'overview', title: 'Overview', icon: 'dashboard' },
    { url: 'my-meal-plans', title: 'My Meal Plans', icon: 'fastfood' },
    { url: 'nutritionists', title: 'Nutritionists', icon: 'nutrition' },
    { url: 'community', title: 'Community', icon: 'groups_2' },
    { url: 'settings', title: 'Settings', icon: 'settings' },
  ];
  return (
    <div className='flex max-w-[1350px] mx-auto my-0 h-[100vh] max-h-[750px] min-h-[700px] bg-primaryBeige'>
      <DashboardSideBar links={navLinks} entryPath='/member/dashboard/' />
      <div className=' flex-1'>
        <DashBoardHeader />

        {children}
      </div>
    </div>
  );
}
