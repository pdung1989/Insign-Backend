'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const httpError = require('../utils/errors');

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

module.exports = {
  login,
};