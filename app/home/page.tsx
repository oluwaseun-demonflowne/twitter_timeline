"use client"
import CreatePost from '@components/CreatePost'
import React from 'react'
import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TimelinePost from '@components/TimelinePost';


const MainPage = () => {
    const { data: session, status } = useSession()
    const Router = useRouter()
    
    if (status === "loading") {
      return <p>Loading...</p>
    }
  
    if (status === "unauthenticated") {
      return Router.push('/login')
    }  

  return (
    <section>
        <div>
            <p>Home</p>
            <div>
                <p>For You</p>
                <p>Following</p>
            </div>
        </div>
        <button onClick={() => signOut()}>logout</button>
        <CreatePost />
        <TimelinePost />
    </section>
  )
}

export default MainPage