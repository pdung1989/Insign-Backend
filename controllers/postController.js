'use strict';
/* postController*/

const httpError = require('../utils/errors');
// object detructuring, import only posts from postModel
const {
  getPost,
  getAllPosts,
  insertPost,
  deletePost,
  updatePost,
  getAllCommentsOfPost,
  searchPosts,
  getRandomPosts,
  getLikesOfPost,
} = require('../models/postModel');

/* REMOVE ?*/
const post_list_get = async (req, res, next) => {
  const posts = await getAllPosts(next);
  if (posts.length === 0) {
    const err = httpError('Posts not found', 404);
    next(err);
    return;
  } 
  res.json(posts);
};

// get post by Id
const post_get = async (req, res, next) => {
  const post = await getPost(req.params.postId, next);
  if (!post) {
    const err = httpError('Post not found', 404);
    next(err);
    return;
  }
  res.json(post);
};

const post_post = async (req, res) => {
  const newPost = await insertPost(req.body);
  console.log('add post data', req.body);
  res.json(newPost);
};

// delete post
const post_delete = async (req, res) => {
  const deleted = await deletePost(req.params.postId, req.user.user_id, req.user.role_id);

  res.json({ message: 'post deleted', deleted});
};

// update post
const post_update = async (req, res) => {
  req.body.post_id = req.params.postId;
  req.body.author = req.body.author || req.user.user_id;
  const updatedPost = await updatePost(req.body);

  res.json({ message: `post is updated: ${updatedPost}` });
};

// get comments by postId
const post_get_comments = async (req, res, next) => {
  const postComments = await getAllCommentsOfPost(req.params.postId, next);
  console.log('num of comments', postComments.length);
  if (postComments.length === 0) {
    const err = httpError('Comments not found', 404);
    next(err);
    return;
  } 
  res.json(postComments);
};

// search posts by query params
const post_search = async (req, res) => {
  const posts = await searchPosts(req);
  console.log('search posts', posts);
  res.json(posts);
};

// get random posts and limit with query params
const post_random = async (req, res, next) => {
  const posts = await getRandomPosts(req, next);
  if (posts.length === 0) {
    const err = httpError('Posts not found', 404);
    next(err);
    return;
  } res.json(posts);
};

// get number of likes of a post
const post_get_likes = async (req, res) => {
  const numberOfLikes = await getLikesOfPost(req.params.postId);
  res.json(numberOfLikes);
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
  post_delete,
  post_update,
  post_get_comments,
  post_search,
  post_random,
  post_get_likes,
};
