const { nanoid } = require("nanoid");
const { findByIdAndUpdate } = require("../models/post");
const Post = require("../models/post")

const getPostsService = async() => {
  try {
    const posts = await Post.find();
    const length = posts.length;
    const message = length === 0 ? "Not Found":"success";
    const error = length === 0 ? true:false;
    const statusCode = length === 0 ? 404 : 200;
    return {
      data:posts,
      error,
      message,
      statusCode
    }
  } catch (error) {
    return{
      data: [],
      error:true,
      message:"Sorry an error occurred",
      statusCode:500,
    }
  }
}

const createPostService = async(post) => {
  try {
    const post = await Post.create(post);
    return{
      data:[post],
      error:false,
      message: 'success',
      statusCode: 200
    }
  } catch (error) {
    return {
      data: [],
      error:true,
      message:"Sorry an error occurred",
      statusCode:500,
    }
  }
}

const updatePostReaction = async(postId,userId) => {
  try {
    const post = await findByIdAndUpdate(postId,{$push:{likers:userId}},{new:true});
    return {
      data: [post],
      error:false,
      message: 'success',
      statusCode: 200
    }
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500,
    }
  }
}

const createNotificationService = ({postId,authorId,userId}) => {
  return {
    id: nanoid(),
    userId: authorId,
    title: `Your post has been liked by user ${userId}`,
    type: 'post',
    meta: {
      id: postId,
    },
  }
}

module.exports = {
  getPostsService,
  createPostService,
  updatePostReaction,
  createNotificationService
}