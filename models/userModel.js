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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    console.error('model insert user', e.message);
    const err = httpError('Sql error', 500);
    next(err);  
  }
};

// delete user
const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM insign_user WHERE user_id = ?',
      [userId]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.log(error.message);
  }
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
      'SELECT post.post_id, post.title, post.image, (SELECT count(*) from likes WHERE likes.post_id = post.post_id) as num_likes, (SELECT count(*) from comment WHERE comment.post_id = post.post_id) as num_comments FROM post WHERE post.author = ?',
      [userId]
    );
    return rows;
  } catch (error) {
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
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  getAllPostsOfUser,
  getUserLogin,
};
