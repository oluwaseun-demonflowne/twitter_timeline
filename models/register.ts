import mongoose, {Schema, model, models} from "mongoose";

const RegisterSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    firstName: {
        type: String,
        required: [true, 'firstname is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'lastname is required!'],
    },
    userName: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    },
    dob: {
        type: Date,
        required : [true]
    },
    password: {
        type: String,
        required : [true]
    },
})

const User = models.User || model('User', RegisterSchema)

export default User;