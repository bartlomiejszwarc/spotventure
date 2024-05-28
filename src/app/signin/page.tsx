'use client';
import LayoutSign from '@/layouts/layoutSign';
import ButtonConfirm from '@/components/ui/button/buttonConfirm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState, FormEvent, useRef} from 'react';
import LogoContainer from '@/components/ui/card/logo/logoContainer';
import Link from 'next/link';
import Logo from '@/components/ui/card/logo/logo';
import ErrorIcon from '@mui/icons-material/Error';
import {useLogin} from '@/hooks/auth/useLogin';
import {redirect} from 'next/navigation';

interface SignInFormData {
  email: string;
  password: string;
}

export default function Page() {
  const SignInImage = () => {
    return (
      <div className='hidden lg:flex lg:justify-center lg:items-center lg:w-1/2 h-full relative'>
        <div className='absolute w-full h-full bg-gradient-to-br from-fuchsia-700 to-emerald-400 opacity-20 rounded-r-lg'></div>
        <img src={'/images/sign1.jpg'} alt={'Image'} className='object-cover h-full rounded-r-lg opacity-75' />
      </div>
    );
  };

  const Inputs = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {loginUser, processing} = useLogin();
    const handleOnSubmitData = async () => {
      setErrorMessage(null);
      try {
        if (!email || !password) throw Error('All fields are required');
        const res = await loginUser(email, password);
        if (!res) throw Error('Invalid credentials');
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    return (
      <>
        <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
          <span className='text-zinc-300 text-2xl font-manrope tracking-wide pb-4'>Sign in</span>
          <span className='text-zinc-200'>E-mail</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            key='email'
            name='email'
            type='text'
            placeholder='example@domain.com'
            className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400'
          />
        </div>
        <div className='flex flex-col leading-8 w-full '>
          <span className='text-zinc-200'>Password</span>
          <div className='w-full flex justify-between border-b-[1px] border-zinc-400'>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              key='password'
              name='password'
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Password'
              className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400 w-full'
            />
            {passwordVisible ? (
              <VisibilityOffIcon className='text-zinc-400 cursor-pointer' onClick={() => setPasswordVisible(false)} />
            ) : (
              <VisibilityIcon className='text-zinc-400 cursor-pointer' onClick={() => setPasswordVisible(true)} />
            )}
          </div>
          <div className='w-full h-8 bg-transparent text-sm text-red-500 flex space-x-1 items-center'>
            {errorMessage ? (
              <>
                <ErrorIcon style={{fontSize: 15}} />
                <span>{errorMessage}</span>
              </>
            ) : null}
          </div>
        </div>
        <div className='flex flex-col space-y-3 items-center'>
          <div className='w-full' onClick={handleOnSubmitData}>
            <ButtonConfirm text='Sign in' />
          </div>
          <span className='text-zinc-300'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='font-semibold text-fuchsia-400'>
              Sign up here
            </Link>
          </span>
        </div>
      </>
    );
  };

  return (
    <LayoutSign>
      <div className='flex justify-center w-full lg:w-1/2'>
        <div className=' flex flex-col justify-center space-y-10 w-full items-center'>
          <div className='w-10/12 flex flex-col space-y-8'>
            <LogoContainer>
              <Logo size={64} />
            </LogoContainer>
            <Inputs />
          </div>
        </div>
      </div>
      <SignInImage />
    </LayoutSign>
  );
}
