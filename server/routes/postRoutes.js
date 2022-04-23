const express = require("express");
const { getPostsController, createPostController, updateReactionController } = require("../controllers/postController");

const router = express.Router();

router.get('/posts',getPostsController);
router.post('/posts',createPostController);
router.patch('/posts/:id',updateReactionController);

module.exports = router;