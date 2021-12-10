'use strict';
/* postRoute */
const express = require('express');
const { body } = require('express-validator');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');

//validate file type with fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// create upload middleware
const upload = multer({ dest: './uploads/', fileFilter });

const {
  post_list_get,
  post_get,
  post_post,
  post_update,
  post_delete,
  post_get_comments,
  post_search,
  post_random,
  post_get_likes,
} = require('../controllers/postController');

const router = express.Router();

// Group the routes to avoid duplicate route naming
router
  .route('/')
  .get(post_random)
  .post(
    upload.single('image'),
    body('title').notEmpty(),
    body('category_id').isNumeric(),
    body('style_id').isNumeric(),
    post_post
  );

router.get('/search', post_search);

router
  .route('/:postId')
  .get(post_get)
  .put(
    body('title').notEmpty(),
    body('category_id').isNumeric(),
    body('style_id').isNumeric(),
    post_update
  )
  .delete(post_delete);

router.get('/:postId/comment', post_get_comments);

router.get('/:postId/likes', post_get_likes);

module.exports = router;
