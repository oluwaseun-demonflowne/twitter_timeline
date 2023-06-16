import { connectToDB } from "@utils/database"
import User from "@models/register";
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export const POST = async (req:Request,res:Response) => {
    const {firstName,lastName,dob,userName,email,password} = await req.json(); 
    await connectToDB();
    const queryUsername = User.where({ userName: userName });
    const user = await queryUsername.findOne();
    const queryEmail = User.where({ email: email });
    const Email = await queryEmail.findOne();
    if(Email || user) {
        
            return new Response(JSON.stringify("Usern Already Exists"), {status: 409})
    }else {
        const saltRounds = 10;
         try {
        
        bcrypt.genSalt(saltRounds)
        .then((salt) => {
          console.log('Salt: ', salt);
          return bcrypt.hash(password, salt);
        })
        .then( async (hash) => {
            const newUser = new User({
                firstName,
                lastName,
                dob,
                userName,
                email,
                password : hash
            })
            await newUser.save();
        })
        
        
            return new Response(JSON.stringify("User successfully created"), {status:201})
        } catch(error) {
            return new Response("Failed to register User", {status: 500})
        }
        }

    
}
