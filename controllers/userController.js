'use strict'
const { getUser, getAllUsers, insertUser, updateUser, deleteUser, getAllPostsOfUser} = require('../models/userModel');
 
// get all users
const user_list_get = async (req, res) => {
  const users = await getAllUsers();
  users.map(user => delete user.password); // delete user's password before sending data
  console.log('all users', users);
  res.json(users);
}

// get user by userId
const user_get = async (req, res) => {
  const user = await getUser(req.params.userId);
  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.json({message: 'user not found'});
  }
}

// add new user
const user_post = async (req, res) => {
  const newUser = await insertUser(req.body);
  res.json(newUser);
};

// delete user
const user_delete = async (req, res) => {
  const deletedUser = await deleteUser(req.params.userId);
  res.json({message: 'user deleted'});
}

// update user
const user_update = async (req, res) => {
  const updatedUser = await updateUser(req.params.userId, req.body);

  res.json({message: 'user is updated'});
}

// get posts by userId
const user_get_posts = async (req, res) =>  {
  const userPosts = await getAllPostsOfUser(req.params.userId);
  res.json(userPosts);
}

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_delete,
  user_update,
  user_get_posts,
}