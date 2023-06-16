"use client"
import { DefaultSession } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import { store } from '@redux'
import getId from '../redux/getIDs';

type FormData = {
    comment : string
}

declare module "next-auth" {
    interface Session {
      user: {
        id: string
      } & DefaultSession["user"]
    }
}


const PostComment = () => {
  const {data:session} = useSession();
  const schema: ZodType<FormData> = z.object({
      comment: z.string().min(1).max(280),
  })

  const {register, handleSubmit,watch, reset,formState:{errors} } = useForm<FormData>({resolver: zodResolver(schema)})

  const submitData = async (data:FormData) => {
    try {
        const response = await fetch('/api/commentPost', {
            method: 'POST',
            body: JSON.stringify({
                creatorOfThePost: store.getState().getId.creatorId,
                personWhoCommented: session?.user?.id,
                commentedPost: store.getState().getId.postId,
                theComment : data.comment  
            })
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    } finally {
        reset()
        const response = await fetch(`/api/allPost/${store.getState().getId.postId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                likes:store.getState().getId.likes,
                comment:store.getState().getId.comment + 1
            })
        })
        console.log(response)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitData)}>
        <textarea {...register("comment", {required:true})}  placeholder='Write your comment' className='border'/>
        <button  disabled={watch("comment")?.length === 0}  type='submit' className={`${watch("comment")?.length === 0 ? 'opacity-50' : 'opacity-100'}  border`}>Comment</button>
    </form> 

  )
}

export default PostComment