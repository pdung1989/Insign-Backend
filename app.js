'use strict';
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

const app = express();
const port = 3000;

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/post', postRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
