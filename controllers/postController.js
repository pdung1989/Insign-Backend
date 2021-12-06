'use strict';
/* postController*/

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
const { get } = require('../routes/postRoute');

const post_list_get = async (req, res) => {
  const posts = await getAllPosts();
  console.log('all posts', posts);
  res.json(posts); //can use: res.send(posts)
};

const post_get = async (req, res) => {
  const post = await getPost(req.params.postId);
  res.json(post);
};

const post_post = async (req, res) => {
  const newPost = await insertPost(req.body);
  console.log('add post data', req.body);
  res.json(newPost);
};

// delete post
const post_delete = async (req, res) => {
  const deletedPost = await deletePost(req.params.postId);

  res.json({ message: 'post deleted', deletePost });
};

// update post
const post_update = async (req, res) => {
  const updatedPost = await updatePost(req.params.postId, req.body);

  res.json({ message: `post is updated: ${updatedPost}` });
};

// get comments by postId
const post_get_comments = async (req, res) => {
  const postComments = await getAllCommentsOfPost(req.params.postId);
  res.json(postComments);
};

// search posts by query params
const post_search = async (req, res) => {
  const posts = await searchPosts(req);
  console.log('search posts', posts);
  res.json(posts);
};

// get random posts and limit with query params
const post_random = async (req, res) => {
  const posts = await getRandomPosts(req);
  res.json(posts);
};

// get number of likes of a post
const post_get_likes = async (req, res) => {
  const numberOfLikes = await getLikesOfPost(req.params.postId);
  res.json(numberOfLikes);
}

module.exports = {
  post_list_get,
  post_get,
  post_post,
  post_delete,
  post_update,
  post_get_comments,
  post_search,
  post_random,
  post_get_likes
};
