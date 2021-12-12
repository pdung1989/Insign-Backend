/* postModel TO HANDLE POST DATA */
'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// use async/await to handle fetching data
/* get all posts ---REMOVE? */
const getAllPosts = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post_id, u.username AS author, title, image, description, c.category_name as category, s.style_name as style, location ' +
        'FROM post INNER JOIN insign_user as u ON u.user_id = post.author ' +
        'INNER JOIN category as c ON c.category_id = post.category_id ' +
        'INNER JOIN style as s ON s.style_id = post.style_id ' +
        'ORDER BY RAND () LIMIT 9'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get post by Id, a post has author's name, numbers of likes and numbers of comments
// if self_like = 1 means user liked the post, self_like = 2, user has not like
const getPost = async (userId, postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post_id, author, title, image, description, location, posted_date, ' +
        '(SELECT count(*) from likes WHERE likes.post_id = post.post_id) as num_likes, ' +
        '(SELECT count(*) from comment WHERE comment.post_id = post.post_id) as num_comments, ' +
        '(SELECT count(*) from likes where likes.post_id = post.post_id and likes.user_id = ?) as self_like, ' +
        '(SELECT count(*) from add_to_favorite where add_to_favorite.post_id = post.post_id and add_to_favorite.user_id = ?) as self_favorite ' +
        'FROM post WHERE post_id = ?',
      [userId, userId, postId]
    );
    return rows[0];
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
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

// post's author and admin can delete their posts
const deletePost = async (postId, user_id, role_id, next) => {
  let sql = 'DELETE FROM post WHERE post_id = ? AND author = ?';
  let params = [postId, user_id];

  // admin can delete post
  if (role_id === 0) {
    sql = 'DELETE FROM post WHERE post_id = ?';
    params = [postId];
  }
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// edit post and get current date time of edited_date
const updatePost = async (post) => {
  let sql =
    'UPDATE post SET title = ?, description = ?, category_id = ?, style_id = ?, location = ?, edited_date = CURRENT_TIMESTAMP ' +
    'WHERE post_id = ? AND author = ?';
  let params = [
    post.title,
    post.description,
    post.category_id,
    post.style_id,
    post.location,
    post.post_id,
    post.author,
  ];
  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

// get all comments of a post
const getAllCommentsOfPost = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT c.user_id, c.comment_id, u.username, u.profile_picture, c.content, c.comment_date, c.comment_date, c.edited_date ' +
        'FROM comment as c ' +
        'INNER JOIN insign_user as u ON u.user_id = c.user_id ' +
        'WHERE post_id = ?',
      [postId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// search post by query title, location...
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

// get random posts with limit numbers of post
const getRandomPosts = async (req, next) => {
  try {
    let sqlQuery =
      'SELECT post_id, u.username AS author, title, image, description, c.category_name as category, s.style_name as style, location ' +
      'FROM post ' +
      'INNER JOIN insign_user as u ON u.user_id = post.author ' +
      'INNER JOIN category as c ON c.category_id = post.category_id ' +
      'INNER JOIN style as s ON s.style_id = post.style_id ' +
      'ORDER BY RAND ()';
    if (req.query.limit) {
      sqlQuery += ' LIMIT ' + req.query.limit;
    }
    const [rows] = await promisePool.execute(sqlQuery);
    return rows;
  } catch (error) {
    console.log(error.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get number of likes of a post
const getLikesOfPost = async (postId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT COUNT(*) as num_likes FROM likes WHERE post_id = ?',
      [postId]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

// add like to a post
const insertLike = async (postId, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
      [userId, postId]
    );
    return rows;
  } catch (e) {
    console.error('model add likes', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// delete like or unlike
const deleteLike = async (postId, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model delete like', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// add to favorites
const addToFavorite = async (userId, postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO add_to_favorite(user_id, post_id) VALUES(?, ?)',
      [userId, postId]
    );
    return rows;
  } catch (e) {
    console.error('model add to favorite', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// delete post from favorites
const deleteFromFavorite = async (postId, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM add_to_favorite WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model remove post from favorites', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get all posts from professional/designer (role_id=2)
const getProfessionalPosts = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post_id, u.username AS author, title, image, description, c.category_name as category, s.style_name as style, location ' +
        'FROM post ' +
        'INNER JOIN insign_user as u ON u.user_id = post.author ' +
        'INNER JOIN category as c ON c.category_id = post.category_id ' +
        'INNER JOIN style as s ON s.style_id = post.style_id ' +
        'WHERE u.role_id = 2 ' +
        'ORDER BY RAND () LIMIT 2'
    );
    return rows;
  } catch (e) {
    console.error('model get professional posts', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllPosts,
  getPost,
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
};
