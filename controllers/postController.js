'use strict';
/* postController*/
const { validationResult } = require('express-validator');
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
  insertLike,
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
  const post = await getPost(req.user.user_id, req.params.postId, next);
  if (!post) {
    const err = httpError('Post not found', 404);
    next(err);
    return;
  }
  res.json(post);
};

const post_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('post_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  // require types of image file when adding post
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  const post = req.body;
  post.image = req.file.filename;
  post.author = req.user.user_id;
  const newPost = await insertPost(post);
  console.log('add post data', post);
  res.json(newPost);
};

// delete post
const post_delete = async (req, res, next) => {
  const deleted = await deletePost(
    req.params.postId,
    req.user.user_id,
    req.user.role_id
  );
  if (deleted) {
    res.json({ message: 'post deleted', deleted });
    return;
  }
  const err = httpError('delete post: unauthorized', 401);
  next(err);
};

// update post
const post_update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('post_put validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
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
  }
  res.json(posts);
};

// get number of likes of a post
const post_get_likes = async (req, res) => {
  const numberOfLikes = await getLikesOfPost(req.params.postId);
  res.json(numberOfLikes);
};

const like_post = async (req, res) => {
  const like = await insertLike(req.params.postId, req.user.user_id);
  res.json({ message: 'like added', like });
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
  like_post,
};
