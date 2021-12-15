'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { insertUser } = require('../models/userModel');

// using passport for authentication
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('local params', err, user, info);
    if (err || !user) {
      next(httpError('username / password incorrect', 400));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('login error', 400));
        return;
      }
      const token = jwt.sign(user, process.env.JWT_SECRET); // JWT_SECRET to hash password
      return res.json({ user, token });
    });
  })(req, res, next);
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
  console.log('added new user data');
   // require types of image file when adding user
   if (!req.file) {
     const err = httpError('Invalid file', 400);
     next(err);
     return;
   }
  try {
    // check if the password and the retype password are matched
    if(req.body.password[0] !== req.body.password[1]) {
      const error = httpError('password not match', 400);
      next(error);
      return;
    }
    req.body.password = bcrypt.hashSync(req.body.password[0], 12); // password is hashed when user registers
    req.body.profile_picture = req.file.filename;
    const user = await insertUser(req.body);
    res.json({message: `user added with id: ${user.insertId}`, user: user });  
  } catch (e) {
    console.log('user post error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
  }
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout'});
};

module.exports = {
  login,
  user_post,
  logout,
};