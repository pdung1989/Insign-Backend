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
  getAllFollowingUsers,
  getAllFollowers,
  insertFollowingUser,
  deleteFollowingUser,
  getAllFeedPosts,
 //getFollowInfo,
} = require('../models/userModel');
const { httpError } = require('../utils/errors');

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

// check token
const checkToken = (req, res, next) => {
  if (!req.user) {
    next(new Error('token not valid'));
  } else {
    res.json({ user: req.user });
  }
};

// get list of following users
const user_get_list_following = async (req, res, next) => {
  const followingUsers = await getAllFollowingUsers(req.user.user_id, next);
  if (followingUsers) {
    res.json(followingUsers);
    return;
  }
  const err = httpError(' following users not found', 404);
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
  const followingUser = await insertFollowingUser(req.user.user_id, req.params.followingId, next);
  if (followingUser) {
    res.json(followingUser);
    return;
  }
  const err = httpError('data not valid', 400);
  next(err);
};

// unfollow a user
const user_delete_following = async (req, res, next) => {
  const unfollowUser = await deleteFollowingUser(req.user.user_id, req.params.followingId, next);
  if (unfollowUser) {
    res.json(unfollowUser);
    return;
  }
  const err = httpError('data not valid', 400);
  next(err);
}

// // get number of follower and following
// const user_get_follow_info = async (req, res, next) => {
//   const followInfo = await getFollowInfo(req.params.userId, req.params.userId, next);
//   if (followInfo) {
//     res.json(followInfo);
//     return;
//   }
//   const err = httpError(' not found', 404);
//   next(err);
// };

// get all posts of following users on feed page
const user_get_feed_post = async (req, res, next) => {
  const allFeedPosts = await getAllFeedPosts(req.user.user_id, next);
  if(allFeedPosts) {
    res.json(allFeedPosts);
    return;
  }
  const err = httpError('posts not found', 404);
  next(err);
}

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_delete,
  user_update,
  user_get_posts,
  user_get_favorites,
  user_get_list_following,
  user_get_list_follower,
  user_add_following,
  user_delete_following,
  user_get_feed_post,
  //user_get_follow_info,
  checkToken,
};
