'use strict';

// access database
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// get all users
const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM insign_user');
    return rows;
  } catch (e) {
    console.error('model get all users', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get user by Id
const getUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM insign_user where user_id = ?',
      [userId]
    );
    return rows[0];
  } catch (e) {
    console.error('model get user by id', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// add new user
const insertUser = async (user, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO insign_user(username, email, password, profile_picture, bio, role_id) VALUES(?, ?, ?, ?, ?, ?)',
      [
        user.username,
        user.email,
        user.password,
        user.profile_picture,
        user.bio || null,
        user.role_id,
      ]
    );
    return rows;
  } catch (e) {
    console.error('model insert user', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// delete user
const deleteUser = async (userId, role_id, next) => {
  // only admin can delete user
  if (role_id === 0) {
    try {
      const [rows] = await promisePool.execute(
        'DELETE FROM insign_user WHERE user_id = ?',
        [userId]
      );
      return rows.affectedRows === 1;
    } catch (e) {
      console.error('model delete user', e.message);
      const err = httpError('Sql error', 500);
      next(err);
    }
  }
  return false;
};

// update user
const updateUser = async (userId, user, next) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE insign_user SET username = ?, email = ?, password = ?, profile_picture = ?, bio= ?, role_id = ? WHERE user_id = ?',
      [
        user.username,
        user.email,
        user.password,
        user.profile_picture,
        user.bio || null,
        user.role_id,
        userId,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

//get all Posts of a user with number of comments and likes
const getAllPostsOfUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post.post_id, post.title, post.image, ' +
        '(SELECT count(*) from likes WHERE likes.post_id = post.post_id) as num_likes, ' +
        '(SELECT count(*) from comment WHERE comment.post_id = post.post_id) as num_comments, ' +
        '(SELECT count(*) from likes where likes.post_id = post.post_id and likes.user_id = post.author) as self_like, ' +
        '(SELECT count(*) from add_to_favorite where add_to_favorite.post_id = post.post_id and add_to_favorite.user_id = post.author) as self_favorite ' +
        'FROM post WHERE post.author = ? ORDER BY post_id DESC',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error('model get posts of a user', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get all favotite posts
const getFavoritePosts = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post.post_id, post.title, post.image, ' +
        '(SELECT count(*) from likes WHERE likes.post_id = post.post_id) as num_likes, ' +
        '(SELECT count(*) from comment WHERE comment.post_id = post.post_id) as num_comments, ' +
        '(SELECT count(*) from likes where likes.post_id = post.post_id and likes.user_id = post.author) as self_like, ' +
        '(SELECT count(*) from add_to_favorite where add_to_favorite.post_id = post.post_id and add_to_favorite.user_id = post.author) as self_favorite ' +
        'FROM post INNER JOIN add_to_favorite as f ON f.post_id = post.post_id WHERE f.user_id = ? ORDER BY posted_date DESC',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error('model get favorite posts', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// user log in
const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM insign_user WHERE email = ?;',
      params
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

// get all following users of login user
const getAllFollowingUsers = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT u.user_id, u.username, u.profile_picture FROM following ' +
        'INNER JOIN insign_user as u ON u.user_id = following.following_id ' +
        'WHERE following.user_id = ?',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error('model get all following', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// add following user
const insertFollowingUser = async (following, next) => {
  console.log(following);
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO following(user_id, following_id) VALUES (?, ?)',
      [following.user_id, following.following_id]
    );
    return rows;
  } catch (e) {
    console.error('model add following user', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  getAllPostsOfUser,
  getFavoritePosts,
  getUserLogin,
  getAllFollowingUsers,
  insertFollowingUser,
};
