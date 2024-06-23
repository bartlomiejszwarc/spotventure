'use client';
import {useUserContext} from '@/hooks/context/useUserContext';
import React from 'react';

export default function Feed({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = useUserContext();
  const uid = user!?.uid;
  if (user) {
    return <>{children}</>;
  }
}
