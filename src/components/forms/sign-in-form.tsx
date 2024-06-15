'use client';
import ButtonConfirm from '@/components/ui/button/button-confirm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState} from 'react';
import LogoContainer from '@/components/ui/logo/logo-container';
import Link from 'next/link';
import Logo from '@/components/ui/logo/logo';
import ErrorIcon from '@mui/icons-material/Error';
import {useLogin} from '@/hooks/auth/useLogin';
import LoadingSignScreen from '@/components/ui/loading-sign-screen';

export default function SignInForm() {
  const [processing, setProcessing] = useState<boolean>(false);

  const SignInImage = () => {
    return (
      <div className='hidden lg:flex lg:justify-center lg:items-center lg:w-1/2 h-full relative'>
        <div className='absolute w-full h-full bg-gradient-to-br from-fuchsia-700 to-emerald-400 opacity-20 rounded-r-lg'></div>
        <img src={'/images/sign1.jpg'} alt={'Image'} className='object-cover h-full rounded-r-lg opacity-75' />
      </div>
    );
  };

  const Inputs = () => {
    const {loginUser} = useLogin();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkingCredentials, setCheckingCredentials] = useState<boolean>(false);

    const handleOnSubmitData = async () => {
      try {
        if (!email || !password) throw Error('All fields are required');

        setCheckingCredentials(true);
        const res = await loginUser(email, password);
        if (!res) throw Error('Invalid credentials');

        setProcessing(true);
      } catch (error: any) {
        window.setTimeout(() => {
          setCheckingCredentials(false);
          setErrorMessage(error.message);
        }, 500);
        setProcessing(false);
      }
    };
    return (
      <>
        <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
          <span className='tracking-wide text-2xl pb-4 inline-block bg-gradient-to-r from-zinc-200  to-zinc-500 text-transparent bg-clip-text'>
            Sign in
          </span>
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
          {!checkingCredentials && (
            <div className='w-full' onClick={handleOnSubmitData}>
              <ButtonConfirm text='Sign in' />
            </div>
          )}
          {checkingCredentials && (
            <div className='w-full' onClick={handleOnSubmitData}>
              <ButtonConfirm text='Checking credentials...' disabled={true} />
            </div>
          )}
          <span className='text-zinc-300'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='font-semibold  inline-block bg-gradient-to-r from-fuchsia-500 via-fuchsia-400  to-fuchsia-500 text-transparent bg-clip-text'>
              Sign up here
            </Link>
          </span>
        </div>
      </>
    );
  };
  if (!processing)
    return (
      <>
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
      </>
    );
  if (processing) {
    return (
      <div className='w-full h-screen lg:h-full flex items-center justify-center'>
        <LoadingSignScreen />
      </div>
    );
  }
}
