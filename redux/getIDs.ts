import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface id {
    postId:String
    creatorId: String
    postIdToDisplayComments: String | null | undefined
    likes: number
    comment : number
}

const initialState:id= {
    postId:'',
    creatorId: '',
    postIdToDisplayComments: '',
    likes: 0,
    comment : 0
}

const getId = createSlice({
    name:"getID",
    initialState,
    reducers: {
        getPostId: (state, action: PayloadAction<string>) => {
             state.postId = action.payload
        },
        getCreatorId: (state,action: PayloadAction<string>) => {
            state.creatorId = action.payload
        },
        getPostIdToDisplayComments: (state,action: PayloadAction<string | null | undefined>) => {
            state.postIdToDisplayComments = action.payload
        },
        getLikes: (state,action: PayloadAction<number>) => {
            state.likes = action.payload
        },
        getComment: (state,action: PayloadAction<number>) => {
            state.comment = action.payload
        }
    }
})

export const { getPostId , getCreatorId, getPostIdToDisplayComments , getLikes , getComment} = getId.actions
export default getId.reducer;