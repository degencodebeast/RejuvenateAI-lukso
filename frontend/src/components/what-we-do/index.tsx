import Food from '@/images/png/food.png';
import Exercise from '@/images/png/excercise.png';
import Image from 'next/image';

const WhatWeDo = () => {
  return (
    <section className='w-full flex flex-col py-20 max-w-[1074px] mx-auto items-center justify-center'>
      <p className='uppercase text-[#014421] text-lg font-bold pb-2 lg:text-[40px]'>
        What We do
      </p>
      <p className='text-xs text-[#3C4142] text-center lg:text-base pb-4'>
        We are at the forefront of healthy living. We want to build healthy
        communities all around the world, we want these communities to form
        green zones in their regions, where people can live up to 100 years and
        become centenarians and live healthy, vital and fulfilling lives whilst
        still contributing to community.
      </p>
      <div className='flex flex-col gap-5 lg:flex-row lg:gap-16 text-[#3C4142]'>
        <div className='w-full flex flex-col items-center gap-2'>
          <div className='w-full relative max-w-[350px]   lg:max-w-[471px] h-[200px] lg:h-[471px]'>
            <Image src={Food} fill alt='food' />
          </div>
          <div className='flex flex-col w-full items-center justify-center lg:items-start gap-2'>
            <p className='font-bold text-lg'>Meal Plans</p>
            <p className='lg:max-w-[70%] text-sm lg:text-base w-full'>
              Learn to eat like the world&apos;s longest-lived people with the
              Rejuvenate Meal Planner. Savor delicious meals that are optimized
              for your life. Eat for wellness, vitality, and longevity. Make
              life simple, with easy-to-make, flavorful recipes.
            </p>
          </div>
        </div>
        <div className='w-full flex flex-col items-center gap-2'>
          <div className='w-full relative  max-w-[350px] lg:max-w-[471px] h-[200px] lg:h-[471px]'>
            <Image src={Exercise} fill alt='food' />
          </div>
          <div className='flex flex-col w-full items-center lg:items-start gap-2'>
            <p className='font-bold text-lg'>Fitness</p>
            <p className='lg:max-w-[70%] text-sm lg:text-base w-full'>
              Learn how to incorporate fitness into your daily routines
              naturally, so exercises don’t just feel like work anymore, so
              rather than separating fitness into a different part of your day.
              It’s built into your lifestyles subconsciously.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
