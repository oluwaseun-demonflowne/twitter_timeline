"use client"
import React, { useState } from 'react'
import {LuImageMinus} from 'react-icons/lu'
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {BsFillEmojiHeartEyesFill} from 'react-icons/bs'
import { type } from 'os';
import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { DefaultSession } from 'next-auth'

interface Emoji {
    [key: string] : string | number
}


declare module "next-auth" {
    interface Session {
      user: {
        id: string
      } & DefaultSession["user"]
    }
}

type FormData = {
    image1? : string | boolean
    image2? : string | boolean
    image3? : string | boolean
    image4? : string | boolean
    post: string
}

const CreatePost = () => {
    const {data:session} = useSession();
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");
    const [textArea, setTextArea] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [image1, setImage1] = useState("false")
    const [image2, setImage2] = useState("false")
    const [image3, setImage3] = useState("false")
    const [image4, setImage4] = useState("false")
    const [doAllowComment, setDoAllowComment] = useState(true)
    const [post, setPost] = useState("")
    const [text,setGetText] = useState("")

    function setText<T>(v: T) {
        setTextArea(v)  
        setGetText(v)
    }
      
      

    const selectEmoji = (e:Emoji) => {
      setTextArea(prevCount => prevCount + e.native)
      const emojiCode = e.native.codePointAt(0).toString(16);
    //   const emojiCode = (e: any) => e.codePointAt(0)?.toString(16);
    //   const getText = `${textArea}${String.fromCodePoint(parseInt(emojiCode, 16))} `;
      setGetText(prevCount => `${prevCount}${String.fromCodePoint(parseInt(emojiCode, 16))}`)
      console.log(text);
      setPost(text);
      console.log(post);
    }

    const onUpload =() => {
    }

    const schema:ZodType<FormData> = z.object({
        image1: z.string().min(2).max(1000),
        image2: z.string().min(2).max(1000),
        image3: z.string().min(2).max(1000),
        image4: z.string().min(2).max(1000),
        post: z.string().min(1).max(280)
     })
     

     const {register, handleSubmit, formState:{errors} } = useForm<FormData>({resolver: zodResolver(schema)})
 const submitData = async (data:FormData) => {
    try {
        const response = await fetch('/api/createPost', {
            method: 'POST',
            body: JSON.stringify({
                userId: session?.user?.id,
                image1 : data.image1,
                image2 : data.image2,
                image3 : data.image3,
                image4 : data.image4,          
                post: text,
                allowComment : doAllowComment,
                likes : 0,
                comment:0,
            })
            
        })
        console.log(response)
        
    } catch (error) {
        console.log(error)
    }
 }


  return (
    <form className='border' onSubmit={handleSubmit(submitData)}>
        <div>
            <p>Profile Image</p>
            <div>
                <textarea {...register("post")} onChange={(e) => setText(e.target.value)} value={textArea} placeholder='What is happening?!'/>
                
                <div>
                    <input className='cursor-pointer' readOnly value={doAllowComment ? 'Everyone can reply' : "No one can reply"}/>
                    <div>
                        <button type='button' onClick={() => setDoAllowComment(true)} className='cursor-pointer border-2'>Everyone can reply</button>
                        <button type='button' onClick={() => setDoAllowComment(false)} className='cursor-pointer border-2'>No one can reply</button>
                    </div>
                    <input {...register("image1",{required:false})} type='text' readOnly value={image1} />
                    <input {...register("image2",{required:false})} type='text' readOnly value={image2} />
                    <input {...register("image3",{required:false})} type='text' readOnly value={image3} />
                    <input {...register("image4",{required:false})} type='text' readOnly value={image4} />
                </div>
                <div>
                    <div>
                        <div>
                            <label htmlFor="profile">
                                <LuImageMinus className='cursor-pointer'/>
                            </label>
                            <input onChange={onUpload}  type='file' className='hidden' id='profile' name='profile'/>
                        </div>    
                        <p>Location</p>
                        <div className='relative'>
                            <BsFillEmojiHeartEyesFill className='cursor-pointer' onClick={() => setShowEmoji(!showEmoji)}/>
                            <div className={` ${showEmoji ? 'block' : 'hidden'} absolute left-0`}>
                                <Picker data={data} onEmojiSelect={(data:Emoji) => selectEmoji(data)} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button  type='submit' className={`border ${textArea.length ? 'opacity-100' : 'opacity-50'}`} disabled={textArea.length ? false : true} >Tweet</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default CreatePost