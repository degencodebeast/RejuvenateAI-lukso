'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uploadPromptToIpfs } from '@/helpers/prompt';
// import toast, { Toaster } from "react-hot-toast";
import { toast } from 'react-toastify';

const NutritionistForm = () => {
  //const auth = useAuth()
  const router = useRouter();
  const [cid, setCid] = useState('');
  const [Image, setImage] = useState<File | null>(null);
  const [ImageUrl, setImageUrl] = useState('');

  // form validation rules
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Field is required'),
    sex: Yup.string().required('Field is required'),
    birthDate: Yup.string().required('Field is required'),
    credentials: Yup.mixed().required('Field is required'),
    // .test(
    //   'fileSize',
    //   'File size is too large',
    //   (value) =>  Array.isArray(value) && value[0]?.size <= 2048 * 2048 // 1 MB
    // )
    // .test(
    //   'fileType',
    //   'Unsupported file type',
    //   (value) =>
    //   Array.isArray(value) && ['image/jpeg', 'image/png'].includes(value[0]?.type)
    // ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    //    const cid = await uploadPromptToIpfs(data);
    router.push('/nutritionist/dashboard');
    //const {file} = data;
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
    toast.success('Successfully added!');
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='modal'>
      <label className='modal-overlay' htmlFor='modal-3'></label>
      <div className='modal-content flex flex-col gap-5 max-w-[90%] lg:max-w-[60%] w-full'>
        <label
          htmlFor='modal-3'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
        >
          ✕
        </label>
        <h2 className='text-[45px]'>Register as a Nutritionist</h2>
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
              type='file'
              {...register('credentials')}
              className='input w-full max-w-[100%]'
              placeholder='Upload your credentials'
              onChange={handleFileChange}
            ></input>
            <div className='text-red-200'>{errors.credentials?.message}</div>
          </div>
          <div className='flex'>
            <button
              type='submit'
              className='btn w-full max-w-[100%] flex items-center bg-[#014421] h-[48px] px-5 lg:h-[50px] font-bold text-base lg:text-[20px] text-[#F5F5DC] rounded-xl'
            >
              Register as a Nutritionist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NutritionistForm;
