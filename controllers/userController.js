'use strict'
const { users, getUser } = require('../models/userModel');
 
// get all users
const user_list_get = (req, res) => {
  users.map((user) => {
    delete user.password;
  });
  res.json(users);
}

// get user by userId
const user_get = (req, res) => {
  const user = getUser(req.params.userId);
  delete user.password;
  res.json(user);
}

const user_post = (req, res) => {
  console.log('add user data', req.body);
  res.send('from this endpoint you can add user');
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
}