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
  post_get,
  post_post,
  post_update,
  post_delete,
  post_get_comments,
  post_search,
  professtional_list_get,
  post_random,
  post_get_likes,
  like_post,
  like_delete,
  favorite_add,
  favorite_delete,
} = require('../controllers/postController');

const router = express.Router();

// Group the routes to avoid duplicate route naming
router
  .route('/')
  .get(post_random)  // get all posts randomly with limit query number of posts
  .post(
    upload.single('image'),
    body('title').notEmpty(),
    body('category_id').isNumeric(),
    body('style_id').isNumeric(),
    post_post
  );

router.get('/search', post_search);
router.get('/professional', professtional_list_get);

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

router.route('/:postId/comment')
  .get(post_get_comments);

router.route('/:postId/likes')
  .get(post_get_likes)
  .post(like_post)
  .delete(like_delete);

  router.route('/:postId/favorites')
  .post(favorite_add)
  .delete(favorite_delete);

module.exports = router;
