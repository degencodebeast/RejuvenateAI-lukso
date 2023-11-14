'use client';
import React, { useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uploadPromptToIpfs } from '@/helpers/prompt';
//import { useAuth } from "near-social-bridge";

const RegisterForm = () => {
  //const auth = useAuth()
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Field is required'),
    sex: Yup.string().required('Field is required'),
    weight: Yup.string().required('Field is required'),
    height: Yup.string().required('Field is required'),
    diet: Yup.string().required('Field is required'),
    active: Yup.string().required('Field is required'),
    sitting: Yup.string().required('Field is required'),
    alcohol: Yup.string().required('Field is required'),
    smoke: Yup.string().required('Field is required'),
    sleepLength: Yup.string().required('Field is required'),
    overallHealth: Yup.string().required('Field is required'),
    birthDate: Yup.string().required('Field is required'),
    smokingStopped: Yup.string(),
    smokingLength: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    //    const cid = await uploadPromptToIpfs(data);
    router.push('/member/dashboard');
  };

  return (
    <div className='modal'>
      <label className='modal-overlay' htmlFor='modal-1'></label>
      <div className='modal-content flex flex-col gap-5 max-w-[90%] lg:max-w-[60%] w-full'>
        <label
          htmlFor='modal-1'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        >
          ✕
        </label>
        <h2 className='text-[45px]'>Register</h2>
        <form
          className='w-full flex flex-col gap-7'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              className='input w-full max-w-[100%]'
              {...register('fullName')}
              placeholder='Full name'
            />
            <div className='text-red-200'>{errors.fullName?.message}</div>
          </div>
          <div>
            <input
              type='date'
              id='start'
              {...register('birthDate')}
              className='input w-full max-w-[100%]'
            ></input>
            <div className='text-red-200'>{errors.birthDate?.message}</div>
          </div>
          <div>
            <select
              className='select w-full max-w-[100%]'
              {...register('sex')}
              placeholder="What's your biological sex?"
              defaultValue=''
            >
              <option value='' disabled>
                What&apos;s your biological sex?
              </option>
              <option value='name'>Male</option>
              <option value='female'>Female</option>
            </select>
            <div className='text-red-200'>{errors.sex?.message}</div>
          </div>
          <div>
            <input
              className='input w-full max-w-[100%]'
              {...register('weight')}
              placeholder="What's your weight in kg?"
            />
            <div className='text-red-200'>{errors.weight?.message}</div>
          </div>
          <div>
            <input
              className='input w-full max-w-[100%]'
              {...register('height')}
              placeholder="What's your height in feet and inches?"
            />
            <div className='text-red-200'>{errors.height?.message}</div>
          </div>
          <div>
            <select
              className='select w-full max-w-[100%]'
              {...register('diet')}
              placeholder='Tell us about your diet?'
              defaultValue=''
            >
              <option value='' disabled>
                Tell us about your diet?
              </option>
              <option value='I eat 5 or more servings of vegetables per day'>
                I eat 5 or more servings of vegetables per day
              </option>
              <option value='I eat two or more servings of fruit per day'>
                I eat two or more servings of fruit per day
              </option>
              <option value='I have two or more servings of dairy (or equivalent) per day'>
                I have two or more servings of dairy (or equivalent) per day
              </option>
              <option value='My cereals are mostly whole grains'>
                My cereals are mostly whole grains
              </option>
              <option value='I eat fast lean protein every day'>
                I eat fast lean protein every day
              </option>
              <option value='I eat fast food once per week or less'>
                I eat fast food once per week or less
              </option>
              <option value='I eat pastries or cakes once a week or less'>
                I eat pastries or cakes once a week or less
              </option>
              <option value='I have less than 1 teaspoon of salt per day'>
                I have less than 1 teaspoon of salt per day
              </option>
              <option value='I have 2 or less alcoholic drinks on any day'>
                I have 2 or less alcoholic drinks on any day
              </option>
              <option value='I drink at least 2 litres of water per day'>
                I drink at least 2 litres of water per day
              </option>
            </select>
            <div className='text-red-200'>{errors.diet?.message}</div>
          </div>
          <div>
            <select
              {...register('active')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                How active are you on an average week?
              </option>
              <option value='inactive'>inactive</option>
              <option value='active'>active</option>
              <option value='very active'>very active</option>
            </select>
            <div className='text-red-200'>{errors.active?.message}</div>
          </div>
          <div>
            <select
              {...register('sitting')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                How many hours a day are you sitting
              </option>
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23,
              ].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className='text-red-200'>{errors.sitting?.message}</div>
          </div>
          <div>
            <select
              {...register('alcohol')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                How much alcohol do you drink
              </option>
              <option value='0 - 10 drinks a week'>0 - 10 drinks a week</option>
              <option value='10 - 20 drinks a week'>
                10 - 20 drinks a week
              </option>
              <option value='greater than 20 drinks a week'>
                greater than 20 drinks a week
              </option>
            </select>
            <div className='text-red-200'>{errors.alcohol?.message}</div>
          </div>
          <div>
            <select
              {...register('smoke')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                Do you smoke?
              </option>
              <option value='Never smoked'>Never smoked</option>
              <option value='Ex smoker'>Ex smoker</option>
              <option value='Current smoker'>Current smoker</option>
            </select>
            <div className='text-red-200'>{errors.smoke?.message}</div>
          </div>
          <div>
            <select
              {...register('smokingStopped')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                If you are an ex-smoker, how many months ago did you stop?
              </option>
              <option value='less than 6 months ago'>
                less than 6 months ago
              </option>
              <option value='six to twelve months ago'>
                six to twelve months ago
              </option>
              <option value='more than twelve months ago'>
                more than twelve months ago
              </option>
            </select>
          </div>
          <div>
            <select
              {...register('smokingLength')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                If you are a current smoker, how many cigarettes do you smoke
                per day?
              </option>
              <option value='less than 5 cigarettes'>
                less than 5 cigarettes
              </option>
              <option value='5 to 10 cigarettes'>5 to 10 cigarettes</option>
              <option value='11 to 20 cigarettes'>11 to 20 cigarettes</option>
              <option value='above 20 cigarettes'>above 20 cigarettes</option>
            </select>
          </div>
          <div>
            <select
              {...register('sleepLength')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                How mamy hours of sleep do you get per day?
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className='text-red-200'>{errors.sleepLength?.message}</div>
          </div>
          <div>
            <select
              {...register('overallHealth')}
              className='select w-full max-w-[100%]'
              defaultValue=''
            >
              <option value='' disabled>
                Rate your overall Health
              </option>
              <option value='Excellent'>Excellent</option>
              <option value='Very good'>Very good</option>
              <option value='Good'>Good</option>
              <option value='Fair'>Fair</option>
              <option value='Poor'>Poor</option>
            </select>
            <div className='text-red-200'>{errors.overallHealth?.message}</div>
          </div>
          <div className='flex'>
            <button onClick={onSubmit}
              type='submit'
              className='btn w-full max-w-[100%] flex items-center bg-[#014421] h-[48px] px-5 lg:h-[50px] font-bold text-base lg:text-[20px] text-[#F5F5DC] rounded-xl'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
