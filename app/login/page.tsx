"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ZodType, z } from 'zod';
import {signIn, signOut,useSession,getProviders} from 'next-auth/react'

type FormData = {
    text: string
    password: string,
}


const page = () => {
    const Router = useRouter()
    const {data} = useSession();
    const schema:ZodType<FormData> = z.object({
        text: z.string().min(2).max(30),
        password: z.string().min(5).max(20)
     })
     useEffect(()=>{
        if(data?.user) {
            Router.push('/')
        }
     },[data])
     const {register, handleSubmit, formState:{errors} } = useForm<FormData>({resolver: zodResolver(schema)})
     const submitData = async (data:FormData) => {
        console.log("Hi")
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    text: data.text,
                    password : data.password
                })
            })
            if(response.status == 200){
                Router.push('/')
            } else if (response.status == 404) {
                toast.error("User not found")
            } else if (response.status == 403){
                toast.error("Wrong username or password")
            }
        } catch (error) {
            console.log(error)
        }
     }
  return (
    <section>
        <form onSubmit={handleSubmit(submitData)}>
            <p>username | email</p>
            <input {...register("text")}  type='text' placeholder='enter either email or username' className='border'/>
            <p>password</p>
            <input {...register("password")} type='password' className='border' placeholder='password'/>
            <button className='mx-10' type='submit'>Submit</button>

            <Link href='/register'>don't have an account? register?</Link>
        </form>
        <button onClick={(e) => {signIn()}} className='border'>Log in Google</button>
    </section> 
  )
}

export default page