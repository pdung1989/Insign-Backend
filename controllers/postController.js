'use strict';
/* postController*/

// object detructuring, import only posts from postModel
const {
  getPost,
  getAllPosts,
  insertPost,
  deletePost,
  updatePost,
} = require('../models/postModel');

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

  res.json({ message: `post is updated: ${updatedPost}`});
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
  post_delete,
  post_update,
};
