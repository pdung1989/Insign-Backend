'use strict';
/* postController*/

// object detructuring, import only posts from postModel
const { posts, getPost, getAllPosts, insertPost } = require('../models/postModel');

const post_list_get = async (req, res) => {
  const posts = await getAllPosts();
  console.log('all posts', posts);
  res.json(posts); //can use: res.send(posts)
};

const post_get = async (req, res) => {
  const post = await getPost(req.params.postId);
  res.json(post);
}

const post_post = async (req, res) => {
  const newPost = await insertPost(req.body);
  console.log('add post data', req.body);
  res.json(newPost);
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
};