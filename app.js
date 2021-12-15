'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const httpError = require('./utils/errors');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const categoryRoute = require('./routes/categoryRoute');
const styleRoute = require('./routes/styleRoute');
const homeRoute = require('./routes/homeRoute');
const roleRoute = require('./routes/roleRoute.js');

const app = express();
//const port = 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.PORT || 3000);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, process.env.PORT || 3000);
}

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for authentication
app.use(passport.initialize());

// main routes
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', { session: false }), postRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  commentRoute
);
app.use('/home', homeRoute);
app.use('/category', categoryRoute);
app.use('/style', styleRoute);
app.use('/role', roleRoute);

// hash password
app.get('/', async (req, res) => {
  if(req.secure) {
    res.send(await bcrypt.hash('admin', 10));
  } else {
    res.send('not secured?');
  } 
});

// handling error
app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal error' });
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
