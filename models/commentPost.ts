import mongoose, {Schema, model, models} from "mongoose";

const CommentPost = new Schema({
    creatorOfThePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    personWhoCommented : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    commentedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Create_Post',
    },
    theComment: {
        type: String,
        required: [true]
    }
},{ timestamps: true }
)

const comment_post = models.Comment_Post || model('Comment_Post', CommentPost)

export default comment_post;