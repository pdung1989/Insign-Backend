/* postModel TO HANDLE POST DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// get all posts
// use async/await to handle fetching data
const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM post');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
}
// get post by Id
const getPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM post WHERE post_id = ?', [postId]);
    return rows[0];
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllPosts,
  getPost,
};