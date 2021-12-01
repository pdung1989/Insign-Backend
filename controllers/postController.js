'use strict';
/* postController*/

// object detructuring, import only posts from postModel
const { posts, getPost } = require('../models/postModel');

const post_list_get = (req, res) => {
  res.json(posts); //can use: res.send(posts)
};

const post_get = (req, res) => {
  const post = getPost(req.params.postId);
  res.json(post);
}

const post_post = (req, res) => {
  console.log('add post data', req.body);
  res.send('From this endpoint you can add post.');
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
};