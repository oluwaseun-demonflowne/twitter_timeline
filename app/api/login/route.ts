import { connectToDB } from "@utils/database"
import User from "@models/register";
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { connect } from "http2";


export const POST = async (req:Request,res:Response) => {
    const {text,password} = await req.json(); 
    connectToDB()
    const query = User.where({ email: text });
    const user = await query.findOne();
    if(user) {
        console.log(user.password)
        // return new Response(JSON.stringify("User Found"), {status: 230})
        const isPasswordMatch =  await bcrypt.compare(password,user.password)
        
        if(isPasswordMatch) {
            return new Response(JSON.stringify("Login successful"), {status: 200})
        }
        else{
            return new Response(JSON.stringify("Password does not match"), {status: 403})
        }
          
    } else {
        return new Response(JSON.stringify("User not found"), {status: 404})
    }
    console.log(user)
}
