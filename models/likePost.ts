import mongoose, {Schema, model, models} from "mongoose";

const LikePost = new Schema({
    creatorOfThePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    personWhoLiked : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Create_Post',
    }
},{ timestamps: true }
)

const like_post = models.Like_Post || model('Like_Post', LikePost)

export default like_post;