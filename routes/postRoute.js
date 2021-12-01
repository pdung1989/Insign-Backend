'use strict';
/* postRoute */
const express = require('express');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');
// create upload middleware
const upload = multer({dest: './uploads/'});

const { post_list_get, post_get, post_post, post_update, post_delete } = require('../controllers/postController');
const router = express.Router();

router.get('/', post_list_get);

router.get('/:postId', post_get);

router.post('/',  upload.single('post'), post_post);

router.put('/', post_update);

router.delete('/:postId', post_delete);

module.exports = router;