"use client"

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
const queryClient = new QueryClient();
import { store } from '@redux'
import { getPostIdToDisplayComments } from "@redux/getIDs";
import { useEffect, useState } from "react";

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


  const CommentDisplay = () => {
    return (
      // <div></div>
      <QueryClientProvider client={queryClient}>
        <FetchAllComments />
      </QueryClientProvider>
  
    )
  }





const FetchAllComments = () => {
    const [fetchComments, setFetchComments] = useState(false);
    useEffect(()=> {
        if(store.getState().getId.postIdToDisplayComments !== ""){
            setFetchComments(true)
        }else if(store.getState().getId.postIdToDisplayComments === "") {
            setFetchComments(false)
        } else if(store.getState().getId.postIdToDisplayComments === " ")
        {
            setFetchComments(false)
        }
        else if(store.getState().getId.postIdToDisplayComments === null)
        {
            setFetchComments(false)
        }
        
    },[store.getState().getId.postIdToDisplayComments])

    const { isLoading, error, data, isFetching } = useQuery({
        
        queryKey: [`comment ${store.getState().getId.postIdToDisplayComments}`],
        queryFn: () =>
          axios
            .get(`/api/commentPost/${store.getState().getId.postIdToDisplayComments}`)
            .then((res) => res.data),
        enabled: fetchComments
    });
    
    if(isLoading && fetchComments) return <p>Loading</p>
    if(data) {
        store.dispatch(getPostIdToDisplayComments(""))
        
    }
  return (
    <div>
      <div>
        {data?.map((i:CommentData) => (
            <div className="p-4 ml" key={i._id}>
                <div>
                    <p><span>Comment by: {i.personWhoCommented.userName}</span>{i.personWhoCommented._id === store.getState().getId.creatorId &&<span>{" "}OP</span>}</p>
                    <p>{i.theComment}</p>
                </div>
            </div>
        ))
        }
        </div>
    </div>
  )
}

export default CommentDisplay