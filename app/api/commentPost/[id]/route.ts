import comment_post from "@models/commentPost";
import { connectToDB } from "@utils/database";

export const GET = async (req:Request,{ params }: { params: ParamsType }) => {
    try {
        await connectToDB();
        const comments = await comment_post.find({
            commentedPost: params.id
        }).populate('personWhoCommented');
        console.log(comments)
        return new Response(JSON.stringify(comments), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch comments", {status: 500})
    }
}
