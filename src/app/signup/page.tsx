'use client';
import LayoutSign from '@/layouts/layoutSign';
import ButtonConfirm from '@/components/ui/button/buttonConfirm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState} from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/logo/logo';
export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <LayoutSign>
      <div className='hidden lg:flex lg:justify-center lg:items-center lg:w-1/2 h-full relative'>
        <div className='absolute w-full h-full bg-gradient-to-br from-fuchsia-700 to-emerald-400 opacity-20 rounded-r-lg'></div>
        <img
          src={'/images/sign1.jpg'}
          alt={'Image'}
          className='object-cover h-full rounded-r-lg opacity-75 transform -scale-x-100'
        />
      </div>
      <div className='flex justify-center w-full lg:w-1/2'>
        <div className=' flex flex-col justify-center space-y-20 w-full items-center'>
          <div className='w-10/12 flex flex-col space-y-10 md:space-y-6'>
            <div className='flex space-x-2 justify-center lg:justify-start'>
              <span className='text-zinc-50 tracking-wider font-merienda'>
                <Logo size={64} />
              </span>
            </div>

            <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
              <span className='text-zinc-300 text-2xl pb-4'>Create your account</span>
              <span className='text-zinc-200'>E-mail</span>
              <input
                type='text'
                placeholder='example@domain.com'
                className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400'
              />
            </div>
            <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
              <span className='text-zinc-200'>Name</span>
              <input
                type='text'
                placeholder='John Doe'
                className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400'
              />
            </div>
            <div className='flex flex-col leading-8 w-full '>
              <span className='text-zinc-200'>Password</span>
              <div className='w-full flex justify-between border-b-[1px] border-zinc-400'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400 w-full'
                />
                {passwordVisible ? (
                  <VisibilityOffIcon
                    className='text-zinc-400 cursor-pointer'
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <VisibilityIcon className='text-zinc-400 cursor-pointer' onClick={() => setPasswordVisible(true)} />
                )}
              </div>
            </div>
            <div className='flex flex-col leading-8 w-full '>
              <span className='text-zinc-200'>Repeat password</span>
              <div className='w-full flex justify-between border-b-[1px] border-zinc-400'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Repeat password'
                  className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400 w-full'
                />
                {passwordVisible ? (
                  <VisibilityOffIcon
                    className='text-zinc-400 cursor-pointer'
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <VisibilityIcon className='text-zinc-400 cursor-pointer' onClick={() => setPasswordVisible(true)} />
                )}
              </div>
            </div>
            <div className='flex flex-col space-y-3 items-center'>
              <ButtonConfirm text='Sign in' />
              <span className='text-zinc-300'>
                Already have an account?{' '}
                <Link href='/signin' className='font-semibold text-fuchsia-400'>
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </LayoutSign>
  );
}
