import Workwithus from '@/images/png/work-with-us.png';
import Image from 'next/image';
import NutritionistForm from '../nutritionist-form';

const WorkWithUs = () => {
  return (
    <div className='w-full bg-[#EEC438] px-4 lg:px-8 text-[#3C4142]'>
      <section className='w-full flex flex-col  gap-6 lg:flex-row py-20 max-w-[1074px] mx-auto items-center justify-between'>
        <div className='w-full h-[250px] max-w-[471px] lg:h-[474px]  relative'>
          <Image src={Workwithus} fill alt='work with us' />
        </div>
        <div className='w-full flex flex-col gap-6 lg:max-w-[493px]'>
          <p className='text-[#014421] text-lg font-bold lg:text-[40px]'>
            Work With Us
          </p>
          <p className='text-sm lg:text-base'>
            We offer a variety of services to put the Green Zones principles to
            work and help everyone, everywhere live better, longer. From
            community-wide well-being transformation projects to speaking
            engagements, worksite programs, the Green Zones Cooking Course,
            Green Zones Meal Planner, Green Zones Kitchen frozen foods,
            retreats, and more–there are countless ways to work with our team to
            improve well-being in all the places you live, work, learn, and
            play.
            <br />
            <br />
            Are you a top tier professional nutritionist and looking to work
            with us? Get in touch with our partnership team here.
          </p>
          <>
            <label
              className='bg-primaryGreen max-w-[220px] h-[48px] px-5 hover:bg-primaryYellow hover:text-primaryBeige lg:h-[59px] font-bold text-base lg:text-[20px] text-[#F5F5DC] rounded-xl'
              htmlFor='modal-3'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Join us
            </label>
            <input className='modal-state' id='modal-3' type='checkbox' />
            <NutritionistForm showModal={true} />
          </>
        </div>
      </section>
    </div>
  );
};

export default WorkWithUs;
