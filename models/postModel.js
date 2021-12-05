/* postModel TO HANDLE POST DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all posts
const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post_id, u.username AS author, title, image, description, c.category_name as category, s.style_name as style, location FROM post INNER JOIN insign_user as u ON u.user_id = post.author INNER JOIN category as c ON c.category_id = post.category_id INNER JOIN style as s ON s.style_id = post.style_id'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

// get post by Id
const getPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM post WHERE post_id = ?',
      [postId]
    );
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
      [
        post.author,
        post.title,
        post.image,
        post.description,
        post.category_id,
        post.style_id,
        post.location,
      ]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

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

const updatePost = async (postId, post) => {
  try {
    console.log('update post', post);
    console.log('update post', postId);
    const [rows] = await promisePool.execute(
      'UPDATE post SET author = ?, title = ?, image = ?, description = ?, category_id = ?, style_id = ?, location = ? WHERE post_id = ?',
      [
        post.author,
        post.title,
        post.image,
        post.description,
        post.category_id,
        post.style_id,
        post.location,
        postId,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getAllCommentsOfPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT ', // TODO: sql
      [postId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

const searchPosts = async (req) => {
  try {
    let sqlQuery = 'SELECT * FROM post WHERE 1=1';

    sqlQuery = buildSearchPostQuery(req, sqlQuery);

    const [rows] = await promisePool.execute(sqlQuery);
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

const buildSearchPostQuery = (req, sqlQuery) => {
  if (req.query.userId) {
    sqlQuery += ' AND author = ' + req.query.userId;
  }

  if (req.query.styleId) {
    sqlQuery += ' AND style_id = ' + req.query.styleId;
  }

  if (req.query.categoryId) {
    sqlQuery += ' AND category_id = ' + req.query.categoryId;
  }

  if (req.query.title) {
    sqlQuery += " AND title like '%" + req.query.title + "%'";
  }

  if (req.query.location) {
    sqlQuery += " AND location = '" + req.query.location + "'";
  }

  console.log(sqlQuery);
  return sqlQuery;
};

module.exports = {
  getAllPosts,
  getPost,
  insertPost,
  deletePost,
  updatePost,
  getAllCommentsOfPost,
  searchPosts,
};
