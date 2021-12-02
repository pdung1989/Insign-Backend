/* postModel TO HANDLE POST DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all posts
const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post_id, u.username AS author, title, image, description, c.category_name as category, s.style_name as style, location FROM post INNER JOIN insign_user as u ON u.user_id = post.author INNER JOIN category as c ON c.category_id = post.category_id INNER JOIN style as s ON s.style_id = post.style_id');
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
      'INSERT INTO post(author, title, image, description, category_id, style_id, location) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [post.author, post.title, post.image, post.description, post.category_id, post.style_id, post.location]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
}

const deletePost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM post WHERE post_id = ?',
      [postId]
    );
    console.log('model delete post', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updatePost = async (post) => {
  try {
    console.log('update post', post);
    const [rows] = await promisePool.execute(
      'UPDATE post SET author = ?, title = ?, image = ?, description = ?, category_id = ?, style_id = ?, location = ? WHERE post_id = ?',
      [post.author, post.title, post.image, post.description, post.category_id, post.style_id, post.location, post.post_id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  insertPost,
  deletePost,
  updatePost,
};