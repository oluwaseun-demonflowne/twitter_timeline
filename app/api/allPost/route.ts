import create_post from "@models/CreatePost";
import { connectToDB } from "@utils/database";


export const GET = async (request:Request) => {
    try {
        await connectToDB();
        const posts = await create_post.find({}).populate('creator');
        return new Response(JSON.stringify(posts), {status:200})
    } catch (error) {
        return new Response("Failed to fetch post", {status: 500})
    }
}

