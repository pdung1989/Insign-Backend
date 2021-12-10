'use strict';
const express = require('express');
const cors = require('cors');
const httpError = require('./utils/errors');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const categoryRoute = require('./routes/categoryRoute');
const styleRoute = require('./routes/styleRoute');
const homeRoute = require('./routes/homeRoute');


const app = express();
const port = 3000;

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for authentication
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', { session: false }), postRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/comment', passport.authenticate('jwt', { session: false }),commentRoute);
app.use('/home', homeRoute);
app.use('/category', categoryRoute);
app.use('/style', styleRoute);

// handling error
app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
})

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({message: err.message || 'internal error'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
