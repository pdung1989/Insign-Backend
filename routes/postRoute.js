'use strict';
/* postRoute */
const express = require('express');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');
// create upload middleware
const upload = multer({dest: './uploads/'});

const { post_list_get, post_get, post_post, post_update, post_delete } = require('../controllers/postController');
const router = express.Router();

// Group the routes to avoid duplicate route naming 
router.route('/')
  .get(post_list_get)
  .post(upload.single('post'), post_post)
  .put(post_update)


router.route('/:postId')
  .get(post_get)
  .delete(post_delete);

module.exports = router;