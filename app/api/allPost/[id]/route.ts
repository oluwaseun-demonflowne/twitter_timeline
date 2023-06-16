import create_post from "@models/CreatePost";
import { connectToDB } from "@utils/database";

export const PATCH = async (req:Request, {params}) => {
    const { likes , comment } = await req.json();
    try {
        await connectToDB();
        const existingPost = await create_post.findById(params.id);
        if(!existingPost) return new Response("Post not founf" , {status: 404})
        existingPost.comment = comment;
        existingPost.likes = likes;
        await existingPost.save();
        return new Response(JSON.stringify(existingPost), {status:200})
    } catch (error) {
        return new Response("Failed", {status:500})
    }
}