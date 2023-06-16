import { connectToDB } from "@utils/database"
import create_post from "@models/CreatePost";

export const POST = async (req:Request,res:Response) => {
    const {userId,image1,image2,image3,image4,post,allowComment,likes,comment} = await req.json(); 
    
        try {
            await connectToDB();
            const createPost = new create_post({
                creator: userId, 
                image1 : image1,
                image2 : image2,
                image3 : image3,
                image4 : image4,
                post:post,
                allowComment: allowComment,
                likes:likes,
                comment:comment
            })
            await createPost.save();
            return new Response(JSON.stringify("Post Successfully Created"), {status:201})
        } catch (error) {
            return new Response("Failed to create a new post", {status: 500})
        }
}
