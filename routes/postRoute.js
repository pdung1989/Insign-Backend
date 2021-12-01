'use strict';
// postRoute
const express = require('express');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');
// create upload middleware
const upload = multer({dest: './uploads/'});

const { post_list_get, post_get, post_post } = require('../controllers/postController');
const router = express.Router();

router.get('/', post_list_get);

router.get('/:postId', post_get);

router.post('/',  upload.single('post'), post_post);

router.put('/:postId', (req, res) => {
  res.send('From this endpoint you can update post.');
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete posts.');
});

module.exports = router;