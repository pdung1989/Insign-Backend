'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const httpError = require('./utils/errors');

const app = express();
const port = 3000;

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/comment', commentRoute);

//handling error
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
