"use client"
import React, { useState } from 'react'
import { type } from 'os';
import {z, ZodType} from "zod"; 
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';


type FormData = {
    firstName: string,
    lastName: string,
    dob: Date,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
  }


const page = () => {
 const Router = useRouter()
 const [submitting, setSubmitting] = useState(false)


 const schema:ZodType<FormData> = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    dob: z.date().min(new Date("1950-01-01"),{message:"Too old"}).max(new Date("2010-01-01"), { message: "Too young!" }),
    userName: z.string().min(2).max(15),
    email: z.string().email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
 }).refine((data) => data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

 const {register, handleSubmit, formState:{errors} } = useForm<FormData>({resolver: zodResolver(schema)})
 const submitData = async (data:FormData) => {
    
    try {
        setSubmitting(true)
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                userName: data.userName,
                email: data.email,
                password : data.password
            })
        })
        console.log(response)
        if(response.ok){
            Router.push('/login')
            toast.success("Registration successful")
        }
        if(response.status == 409) {
            toast.error("User already exists")
        }
    } catch (error) {
        console.log(error)
    } finally {
        setSubmitting(false)
    }

 }

  return (
    <section>
        <form onSubmit={handleSubmit(submitData)}>
            <p>firstname</p>
            <input {...register("firstName")} type='text' className='border' placeholder='firstname' />
            <p>lastname</p>
            <input {...register("lastName")} type='text' className='border' placeholder='lastname' />
            <p>dob</p>
            <input {...register("dob", {valueAsDate: true})} type='date' className='border' placeholder='date of birth' />
            {errors.dob && <span className="text-[red] text-xs">{errors.dob.message}</span>}
            <p>username</p>
            <input {...register("userName")} type='text' className='border' placeholder='username' />
            <p>email</p>
            <input {...register("email")} type='email' className='border' placeholder='email' />
            <p>password</p>
            <input {...register("password")} type='password' className='border' placeholder='password' />
            <p>confirm password</p>
            <input {...register("confirmPassword")} type='password' className='border' placeholder='confirm password' />
            <button disabled={submitting} type='submit' >{submitting ? 'submitting...' : "submit"}</button>
        </form>
    </section>
  )
}

export default page