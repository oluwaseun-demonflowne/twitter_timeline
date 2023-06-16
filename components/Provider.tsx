'use client'
import { Session } from 'next-auth';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session: Session;
}

import { SessionProvider } from 'next-auth/react'

const Provider: React.FC<ProviderProps>  = ({children,session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider