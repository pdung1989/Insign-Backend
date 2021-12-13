'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');

// passport authenticate
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
      const token = jwt.sign(user, 'ewrweokfwdfvljj'); //this password is the same in pass.js
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
   // require types of image file when adding user
   if (!req.file) {
     const err = httpError('Invalid file', 400);
     next(err);
     return;
   }
  try {
    req.body.passwd = bcrypt.hashSync(req.body.passwd, 12); // password is hashed when user registers
    req.body.profile_picture = req.file.filename;
    const newUser = await insertUser(req.body);
    res.json({message: `user added with id: ${id}`, newUser });  
  } catch (e) {
    console.log('user post error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
  }
};


module.exports = {
  login,
  user_post,
};