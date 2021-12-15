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

// get user by Id, is_followed = 1 means the user is followed by the logged in user
// is_followed = 0 means the user is not followed by the logged in user
// get number of following, get number of follower of a user
const getUser = async (loginUserId, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT *, (SELECT count(following_id) from following WHERE following.user_id = ? and following.following_id = insign_user.user_id) as is_followed, ' +
        '(SELECT COUNT(following_id) FROM following WHERE following.user_id = insign_user.user_id) as num_following, ' +
        '(SELECT COUNT(user_id) FROM following WHERE following.following_id = insign_user.user_id) as num_follower ' +
        'FROM insign_user where insign_user.user_id = ?',
      [loginUserId, userId]
    );
    return rows[0];
  } catch (e) {
    console.error('model get user by id', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// add new user
const insertUser = async (user) => {
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

// update user information
const updateUser = async (userId, user, next) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE insign_user SET username = ?, bio = ?, role_id = ? WHERE user_id = ?',
      [
        user.username,
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

// update user's profile picture
const updateProfilePicture = async (user, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE insign_user SET profile_picture = ? WHERE user_id = ?',
      [
        user.profile_picture,
        userId,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user profile picture', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// update user's password
const updateUserPassword = async (user, userId, next) => {
  try {
    console.log(userId);
    const [rows] = await promisePool.execute(
        'UPDATE insign_user SET password = ? WHERE user_id = ?',
        [
          user.password,
          userId,
        ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user password', e.message);
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

// get all followers of login user, following_id is the login user_id
const getAllFollowers = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT u.user_id, u.username, u.profile_picture FROM following ' +
        'INNER JOIN insign_user as u ON u.user_id = following.user_id ' +
        'WHERE following.following_id = ?',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error('model get all followers', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// follow a user (add a user to following list)
const insertFollowingUser = async (userId, followingId, next) => {
  if (userId != followingId) {
    console.log(userId, followingId);
    try {
      const [rows] = await promisePool.execute(
        'INSERT INTO following(user_id, following_id) VALUES (?, ?)',
        [userId, followingId]
      );
      return rows;
    } catch (e) {
      console.error('model add following user', e.message);
      const err = httpError('Sql error', 500);
      next(err);
    }
  }
};

// unfollow a user (remove a user from following list)
const deleteFollowingUser = async (userId, followingId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM following WHERE user_id = ? and following_id = ?',
      [userId, followingId]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model delete following user', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// logged in user gets all posts of the following users in feed page
const getAllFeedPosts = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT post.post_id, post.author, u.username, u.role_id, u.profile_picture, post.title, post.image, post.description, ' +
        '(SELECT count(*) from likes WHERE likes.post_id = post.post_id) as num_likes, ' +
        '(SELECT count(*) from comment WHERE comment.post_id = post.post_id) as num_comments, ' +
        '(SELECT count(*) from likes where likes.post_id = post.post_id and likes.user_id = f.user_id) as self_like ' +
        'FROM following as f, post, insign_user as u ' +
        'WHERE f.user_id = ? ' +
        'AND f.following_id = post.author ' +
        'AND post.author = u.user_id ' +
        'ORDER BY post.post_id DESC ',
      [userId]
    );
    return rows;
  } catch (e) {
    console.error('model get all posts of following users', e.message);
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

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  updateProfilePicture,
  updateUserPassword,
  getAllPostsOfUser,
  getFavoritePosts,
  getUserLogin,
  getAllFollowingUsers,
  getAllFollowers,
  insertFollowingUser,
  deleteFollowingUser,
  getAllFeedPosts,
};
