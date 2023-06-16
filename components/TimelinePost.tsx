"use client"
import { QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import {store} from "@/redux/index";
import { getPostId,getCreatorId, getPostIdToDisplayComments, getComment, getLikes } from "@redux/getIDs";
import CommentDisplay from "./CommentDisplay";
import {AiTwotoneHeart} from "react-icons/ai"
import { useSession } from "next-auth/react";

const queryClient = new QueryClient();

interface OwnProps {
    post_id: string;
    creator_id: string;
} 

interface PostData {
    _id: string;
    creator: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        userName: string;
        dob: Date;
        password: string;
        __v: number;
      };
    likes: number;
    comment: number;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    post: string;
    allowComment: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }

  interface LikedPost {
    _id: string;
    creatorOfThePost: string;
    personWhoLiked: string;
    likedPost: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
    


interface CommentData {
    _id: string;
    creatorOfThePost: string;
    personWhoCommented: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      userName: string;
      dob: Date;
      password: string;
      __v: number;
    };
    commentedPost: string;
    theComment: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  


const TimelinePost = () => {
  return (
    // <div></div>
    <QueryClientProvider client={queryClient}>
      <FetchAllPost />
    </QueryClientProvider>

  )
}

function FetchAllPost() {
        const [showCommentBox, setShowCommentBox] = useState(false)
        const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
        const [getId,setGetId] = useState<string | null>(null)
        const [getCreatorIdMap , setGetCreatorIdMap] = useState<string>("")
        const [getLikedPost, setGetLikedPost] = useState([])
        store.dispatch(getCreatorId(getCreatorIdMap))
        const {data:session} = useSession();
        console.log(session)
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["allPost"],
            queryFn: () =>
              axios
                .get("api/allPost")
                .then((res) => res.data),
        });
        
        useEffect(() => {
          const getLikes = async () => {
            const response = await fetch('/api/likedPost')
            const data = await response.json();
            setGetLikedPost(data)
            console.log(data)
          }
          getLikes()
        },[])



        store.dispatch(getPostIdToDisplayComments(getId))
        
        const like_post = async (i:PostData) => {
          try {
            const response = await fetch('/api/likedPost', {
                method: 'POST',
                body: JSON.stringify({
                  creatorOfThePost : i.creator._id , 
                  personWhoLiked: session?.user?.id, 
                  likedPost: i._id
                })
            })
            console.log(response)
          } catch (error) {
              console.log(error)
          } finally {
              try{
                const response = await fetch(`/api/allPost/${i._id}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                      likes:store.getState().getId.likes + 1,
                      comment:store.getState().getId.comment 
                  })
                })
                console.log(response)
              } catch (error) {
                console.log(error)
              }
          }
        }

        const handleOnClick = (i:PostData) => {
            setSelectedItemId(i._id)
            setShowCommentBox(true)
            store.dispatch(getPostId(i._id))
            store.dispatch(getCreatorId(i.creator._id))
            store.dispatch(getLikes(i.likes))
            store.dispatch(getComment(i.comment))

        }

    return(
        <section>
            {data?.map((i:PostData) => 
                (
                <div  key={i._id}>
                    <p>username: {i.creator.userName}</p>
                    <p className="cursor-pointer" onClick={() => {setGetCreatorIdMap(i.creator._id);setGetId(i._id)}}>post: {i.post}</p>
                    <button onClick={() => like_post(i)} className={` text-zinc-400
                      ${getLikedPost.map((j:LikedPost) => {
                        if(j.likedPost == i._id && session?.user.id == j.personWhoLiked){
                          return 'text-green-600'
                        }
                      })}
                    `}>{i.likes} <AiTwotoneHeart /></button> {" "}
                    <button className={`${i.allowComment ? '' : 'opacity-50 pointer-events-none'} `} onClick={() => handleOnClick(i)}>{i.comment} comments</button>
                    <div className={`${selectedItemId === i._id  ? 'block' : 'hidden'}`}>
                        {i.allowComment && <PostComment  />}
                    </div>
                    {i._id == getId && <CommentDisplay /> }
                </div>
            ))} 
        </section>
    )
}



export default TimelinePost;