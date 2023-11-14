import QuoteSvg from '@/images/svg/quote.svg';

const CTA = () => {
  return (
    <section className="w-full h-[400px] lg:h-[499px] flex items-center justify-center px-3 bg-[url('/images/svg/cta.svg')] bg-no-repeat bg-cover">
      <div className='max-w-[589px] w-full  text-[#FFFFFF] flex flex-col gap-7 items-center justify-center font-bold text-xl  lg:text-[24px] lg:leading-[25px] text-center'>
        <QuoteSvg />
        <p className='w-full'>
          “To ensure good health: eat lightly, breathe deeply, live moderately,
          cultivate cheerfulness, and maintain an interest in life.”
        </p>
        <p className='text-[20px] font-normal'>William Londen</p>
      </div>
    </section>
  );
};

export default CTA;
