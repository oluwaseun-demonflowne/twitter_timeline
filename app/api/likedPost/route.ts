import { connectToDB } from "@utils/database"
import like_post from "@models/likePost";

export const POST = async (req:Request,res:Response) => {
    const {creatorOfThePost,personWhoLiked,likedPost} = await req.json(); 
    
        try {
            await connectToDB();
            console.log("you seeing this amigo?")
            const likePost = new like_post({
                    creatorOfThePost,
                    personWhoLiked,
                    likedPost
            })
            await likePost.save();
            return new Response(JSON.stringify("Liked Successfully"), {status:201})
        } catch (error) {
            return new Response("Failed to comment post", {status: 500})
        }
}


export const GET = async (req:Request,res:Response) => {    
        try {
            await connectToDB();
            const posts = await like_post.find({})
            return new Response(JSON.stringify(posts), {status:201})
            console.log(posts)
        } catch (error) {
            return new Response("Failed to comment post", {status: 500})
        }
}