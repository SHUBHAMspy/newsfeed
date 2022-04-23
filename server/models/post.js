const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
    likers: { type: [String], default: [] },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", postSchema);

module.exports = Post;