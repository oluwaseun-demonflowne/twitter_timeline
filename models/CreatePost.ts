import mongoose, {Schema, model, models} from "mongoose";

const CreatePost = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likes : {
        type: Number,
        required: [true]
    },
    comment : {
        type: Number,
        required: [true]
    },
    image1: {
        type: String,
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    post: {
        type:String,
        required: [true]
    },
    allowComment: {
        type: Boolean,
        required: [true]
    }
},{ timestamps: true }
)

const create_post = models.Create_Post || model('Create_Post', CreatePost)

export default create_post;