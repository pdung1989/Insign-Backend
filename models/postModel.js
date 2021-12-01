/* postModel TO HANDLE POST DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all posts
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

// add post
const insertPost = async (post) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO post(author, title, image, description, category_id, style_id, location, posted_date, edited_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?), 
      []'
    );
  } catch (e) {
    console.log('error', e.message);
  }
}

module.exports = {
  getAllPosts,
  getPost,
};