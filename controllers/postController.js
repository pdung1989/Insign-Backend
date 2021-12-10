'use strict';
/* postController*/
const { validationResult } = require('express-validator');
const { httpError } = require('../utils/errors');
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
  deleteLike,
  addToFavorite,
  deleteFromFavorite,
  getProfessionalPosts,
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
    res.json({ message: 'post deleted' });
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

// add new like
const like_post = async (req, res, next) => {
  const like = await insertLike(req.params.postId, req.user.user_id, next);
  if (like) {
    res.json({ message: 'is liked' });
    return;
  }
  const err = httpError('like error', 400);
  next(err);
};

// handle unlike
const like_delete = async (req, res, next) => {
  const deleted = deleteLike(req.params.postId, req.user.user_id, next);
  if (deleted) {
    res.json({ message: 'unlike' });
    return;
  }
  const err = httpError('unlike: unauthorized', 401);
  next(err);
};

// add post to favorites
const favorite_add = async (req, res, next) => {
  const favoritePost = await addToFavorite(
    req.user.user_id,
    req.params.postId,
    next
  );
  if (favoritePost) {
    res.json({ message: 'post is added to favorite' });
    return;
  }
  const err = httpError('add to favorite: error', 400);
  next(err);
};

// handle remove post from favorites
const favorite_delete = async (req, res, next) => {
  const deleted = deleteFromFavorite(req.params.postId, req.user.user_id, next);
  if (deleted) {
    res.json({ message: 'unfavorite' });
    return;
  }
  const err = httpError('unfavorite: unauthorized', 401);
  next(err);
};

// get professional posts
const professtional_list_get = async (req, res, next) => {
  const professionalPosts = await getProfessionalPosts(next);
  if (professionalPosts.length < 1) {
    const err = httpError(' Professional posts not found', 404);
    next(err);
    return;
  }
  res.json(professionalPosts);
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
  like_delete,
  favorite_add,
  favorite_delete,
  professtional_list_get,
};
