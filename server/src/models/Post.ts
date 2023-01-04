import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    title: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema)

export default Post
