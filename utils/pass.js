'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const JWTStrategy =  require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { getUserLogin } = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (!user) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        // use bcrypt to check of unmatched passwords 
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, { message: 'Incorrect  email/password.' });
        }
        delete user.password;
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, done) => {
      console.log("jwtpayload", jwtPayload);
      return done(null, jwtPayload);
  }
  )
);

module.exports = passport;