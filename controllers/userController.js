'use strict';
const { validationResult } = require('express-validator');
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllPostsOfUser,
  getFavoritePosts,
  getAllFollowingUsers,
  getAllFollowers,
  insertFollowingUser,
  deleteFollowingUser,
  getAllFeedPosts,
  updateProfilePicture,
  updateUserPassword,
} = require('../models/userModel');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

// get all users
const user_list_get = async (req, res, next) => {
  const users = await getAllUsers(next);
  if (users) {
    users.map((user) => delete user.password); // delete user's password before sending data
    res.json(users);
    return;
  }
  const err = httpError('Users not found', 404);
  next(err);
};

// get user by userId
const user_get = async (req, res, next) => {
  const user = await getUser(req.user.user_id, req.params.userId, next);
  if (user) {
    delete user.password;
    res.json(user);
    return;
  }
  const err = httpError('User not found', 404);
  next(err);
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

// update user information
const user_update = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  try {
    const updatedUser = await updateUser(req.user.user_id, req.body);
    res.json({ message: 'user is updated', updatedUser });
  } catch (e) {
    console.log('user update error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
  }
};

// user update profile_picture
const user_update_picture = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  // require types of image file when updating user
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  try {
    req.body.profile_picture = req.file.filename;
    const profilePicture = await updateProfilePicture(
      req.body,
      req.user.user_id
    );
    res.json({ message: 'user profile picture is updated', profilePicture });
  } catch (e) {
    console.log('user update profile picture error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
  }
};

// update user password
const user_update_password = async (req, res, next) => {
  const errors = validationResult(req);
  if (req.body.password !== req.body.password2 || !errors.isEmpty()) {
    const error = httpError("Password doesn't match", 400);
    next(error);
    return;
  }
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 12); // has password
    const updatedUserPassword = await updateUserPassword(
      req.body,
      req.user.user_id
    );
    res.json({ message: 'user password is updated', updatedUserPassword });
  } catch (e) {
    console.log('user password update error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
  }
};

// get posts by userId
const user_get_posts = async (req, res, next) => {
  const userPosts = await getAllPostsOfUser(req.params.userId, next);
  if (!userPosts) {
    const err = httpError('Posts of a user not found', 404);
    next(err);
    return;
  }
  res.json(userPosts);
};

// get favorite posts
const user_get_favorites = async (req, res, next) => {
  const favoritePosts = await getFavoritePosts(req.params.userId, next);
  if (!favoritePosts) {
    const err = httpError('Favorite Posts not found', 404);
    next(err);
    return;
  }
  res.json(favoritePosts);
};

// get list of following users
const user_get_list_following = async (req, res, next) => {
  const followingUsers = await getAllFollowingUsers(req.user.user_id, next);
  if (followingUsers) {
    res.json(followingUsers);
    return;
  }
  const err = httpError('following users not found', 404);
  next(err);
};

// get list of followers
const user_get_list_follower = async (req, res, next) => {
  const followers = await getAllFollowers(req.user.user_id, next);
  if (followers) {
    res.json(followers);
    return;
  }
  const err = httpError(' followers not found', 404);
  next(err);
};

// follow a user
const user_add_following = async (req, res, next) => {
  const followingUser = await insertFollowingUser(
    req.user.user_id,
    req.params.followingId,
    next
  );
  if (followingUser) {
    res.json(followingUser);
    return;
  }
  const err = httpError('data not valid', 400);
  next(err);
};

// unfollow a user
const user_delete_following = async (req, res, next) => {
  const unfollowUser = await deleteFollowingUser(
    req.user.user_id,
    req.params.followingId,
    next
  );
  if (unfollowUser) {
    res.json(unfollowUser);
    return;
  }
  const err = httpError('data not valid', 400);
  next(err);
};

// get all posts of following users on feed page
const user_get_feed_post = async (req, res, next) => {
  const allFeedPosts = await getAllFeedPosts(req.user.user_id, next);
  if (allFeedPosts) {
    res.json(allFeedPosts);
    return;
  }
  const err = httpError('posts not found', 404);
  next(err);
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
  user_delete,
  user_update,
  user_update_picture,
  user_update_password,
  user_get_posts,
  user_get_favorites,
  user_get_list_following,
  user_get_list_follower,
  user_add_following,
  user_delete_following,
  user_get_feed_post,
  checkToken,
};
