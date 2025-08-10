import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 280,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    { timestamps: true }
)

// Check if model already exists to prevent OverwriteModelError
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export { Comment }
export default Comment