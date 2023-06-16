import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database"
import User from "@models/register"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],callbacks: {
    
    async session ({session}) {
        await connectToDB()
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUser._id.toString();
        return session;
    }}
})

export {handler as GET, handler as POST};