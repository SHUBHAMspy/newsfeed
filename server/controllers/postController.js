const { getPostsService, createPostService, updatePostReaction, createNotificationService } = require("../services/post.services");
const sse = require("../sse");

const getPostsController = async (req,res) => {
  const result = await getPostsService();
  res.status(result.statusCode).json(result);
}

const createPostController = async(req,res) => {
  const body = req.body;
  const result = await createPostService(body);
  res.status(result.statusCode).json(result);
  if (!result.error) {
    sse.send(result.data[0],'post');
  }
}

const updateReactionController = async(req,res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  const result = await updatePostReaction(postId,userId);
  res.status(result.statusCode).json(result);
  if (!result.error) {
    const post = result.data[0];
    const data = {      // we are creating a data or profilling the liked user in association to a post
      liker: userId,    // and will be sending this data to all the user
      post
    }

    // now we will be emitting or broadcasting a post reaction event to all users
    sse.send(data,'post_reaction');

    // also send notification to post author
    if (post.userId !== userId) {
      const authorId = post.userId;
      const notification = createNotificationService({postId,userId,authorId});

      //now emit notifiy_{userId} to the post author
      sse.send(notification,`notifiy-${authorId}`);
    }
  }
}

module.exports = {
  getPostsController,
  createPostController,
  updateReactionController,
}