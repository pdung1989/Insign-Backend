'use strict';
const { validationResult } = require('express-validator');
const {
  getUser,
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
  getAllPostsOfUser,
  getFavoritePosts,
  insertFavoritePost,
} = require('../models/userModel');
const { post } = require('../routes/authRoute');
const { httpError } = require('../utils/errors');

// get all users
const user_list_get = async (req, res, next) => {
  const users = await getAllUsers(next);
  if (users.length > 0) {
    users.map((user) => delete user.password); // delete user's password before sending data
    res.json(users);
    return;
  }
  const err = httpError('Users not found', 404);
  next(err);
};

// get user by userId
const user_get = async (req, res, next) => {
  const user = await getUser(req.params.userId, next);
  if (user) {
    delete user.password;
    res.json(user);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
};

// add new user
const user_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  const newUser = await insertUser(req.body);
  res.json(newUser);
};

// delete user
const user_delete = async (req, res, next) => {
  const deletedUser = await deleteUser(req.params.userId, req.user.role_id);
  if (deletedUser) {
    res.json({ message: 'user deleted' });
    return;
  }
  const err = httpError('delete user: unauthorized', 401);
  next(err);
};

// update user
const user_update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  const updatedUser = await updateUser(req.params.userId, req.body, next);
  res.json({ message: 'user is updated', updatedUser });
};

// get posts by userId
const user_get_posts = async (req, res, next) => {
  const userPosts = await getAllPostsOfUser(req.params.userId, next);
  if (userPosts.length < 1) {
    const err = httpError('Posts of a user not found', 404);
    next(err);
    return;
  }
  res.json(userPosts);
};

// get favorite posts
const user_get_favorites = async (req, res, next) => {
  const favoritePosts = await getFavoritePosts(req.params.userId, next);
  if (favoritePosts.length < 1) {
    const err = httpError('Favorite Posts not found', 404);
    next(err);
    return;
  }
  res.json(favoritePosts);
};

// check token
const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({ user: req.user });
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_delete,
  user_update,
  user_get_posts,
  user_get_favorites,
  checkToken,
};
