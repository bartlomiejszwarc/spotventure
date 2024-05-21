'use client';
import LayoutSign from '@/layouts/layoutSign';
import ButtonConfirm from '@/components/ui/button/buttonConfirm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/logo/logo';
import LogoContainer from '@/components/ui/logo/logoContainer';
import ErrorIcon from '@mui/icons-material/Error';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {app, auth} from '@/firebase/config';
import {useCreateUser} from '@/hooks/user/useCreateUser';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

export default function Page() {
  const SignUpImage = () => {
    return (
      <div className='hidden lg:flex lg:justify-center lg:items-center lg:w-1/2 h-full relative'>
        <div className='absolute w-full h-full bg-gradient-to-br from-fuchsia-700 to-emerald-400 opacity-20 rounded-l-lg'></div>
        <img
          src={'/images/sign1.jpg'}
          alt={'Image'}
          className='object-cover h-full rounded-r-lg opacity-75 transform -scale-x-100'
        />
      </div>
    );
  };

  const Inputs = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const {createUser} = useCreateUser();

    const handleOnSubmitData = async () => {
      setErrorMessage(null);
      try {
        if (!email || !name || !password || !repeatPassword) throw Error('All fields are required');
        if (password !== repeatPassword) throw Error('Passwords do not match');
        const res = await createUserWithEmailAndPassword(email, password);
        if (!res) throw Error('Invalid e-mail');
        const body = {
          uid: res.user.uid,
          email: res.user.email,
          name: name,
          createdAt: new Date(),
        };
        await createUser(body);
      } catch (error: any) {
        setErrorMessage(String(error.message));
      }
    };
    return (
      <>
        <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
          <span className='text-zinc-300 text-2xl pb-4'>Create your account</span>
          <span className='text-zinc-200'>E-mail</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type='text'
            name='email'
            placeholder='example@domain.com'
            className='py-1 outline-none bg-transparent  text-zinc-100 placeholder:text-zinc-400'
          />
        </div>
        <div className='flex flex-col leading-8 border-b-[1px] border-zinc-400'>
          <span className='text-zinc-200'>Name</span>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            name='name'
            type='text'
            placeholder='John Doe'
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
        </div>
        <div className='flex flex-col leading-8 w-full '>
          <span className='text-zinc-200'>Repeat password</span>
          <div className='w-full flex justify-between border-b-[1px] border-zinc-400'>
            <input
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              name='repeatPassword'
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Repeat password'
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
            <ButtonConfirm text='Sign up!' />
          </div>
          <span className='text-zinc-300'>
            Already have an account?{' '}
            <Link href='/signin' className='font-semibold text-fuchsia-400'>
              Sign in
            </Link>
          </span>
        </div>
      </>
    );
  };

  return (
    <LayoutSign>
      <SignUpImage />
      <div className='flex justify-center w-full lg:w-1/2'>
        <div className=' flex flex-col justify-center w-full items-center'>
          <div className='w-10/12 flex flex-col space-y-10 md:space-y-4'>
            <LogoContainer>
              <Logo size={36} />
            </LogoContainer>
            <Inputs />
          </div>
        </div>
      </div>
    </LayoutSign>
  );
}
