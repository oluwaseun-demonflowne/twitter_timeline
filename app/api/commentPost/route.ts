import { connectToDB } from "@utils/database"
import comment_post from "@models/commentPost";

export const POST = async (req:Request,res:Response) => {
    const {creatorOfThePost,personWhoCommented,commentedPost,theComment} = await req.json(); 
    
        try {
            await connectToDB();
            console.log("you seeing this amigo?")
            const commentPost = new comment_post({
                    creatorOfThePost,
                    personWhoCommented,
                    commentedPost,
                    theComment,
            })
            await commentPost.save();
            return new Response(JSON.stringify("Comment Successfully"), {status:201})
        } catch (error) {
            return new Response("Failed to comment post", {status: 500})
        }
}


